import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { makeSession, sessionCookieName, stateCookieName, secureCookie } from "../../../lib/session";

export const runtime = "nodejs";

function equal(a, b) {
  if (!a || !b) return false;
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}

function fail(request, code) {
  const response = NextResponse.redirect(new URL("/?error=" + code, new URL(request.url).origin));
  response.cookies.set(stateCookieName, "", {
    httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 0
  });
  return response;
}

export async function GET(request) {
  const current = new URL(request.url);
  const discordError = current.searchParams.get("error");
  if (discordError) return NextResponse.redirect(new URL("/?error=discord_denied", current.origin));

  const code = current.searchParams.get("code");
  const state = current.searchParams.get("state");
  const cookieState = request.cookies.get(stateCookieName)?.value;
  if (!code || !equal(state, cookieState)) {
    return NextResponse.redirect(new URL("/?error=oauth_state", current.origin));
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    console.error("Discord OAuth config missing:", {
      clientId: Boolean(clientId),
      clientSecret: Boolean(clientSecret),
      redirectUri: Boolean(redirectUri)
    });
    return fail(request, "oauth_config");
  }

  let tokenData;
  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri
      }),
      cache: "no-store"
    });
    if (!tokenResponse.ok) {
      const details = await tokenResponse.text();
      console.error("Discord OAuth token exchange failed:", tokenResponse.status, details.slice(0, 500));
      return fail(request, "oauth_token");
    }
    tokenData = await tokenResponse.json();
  } catch (err) {
    console.error("Discord OAuth token request errored:", err instanceof Error ? err.message : "Unknown error");
    return fail(request, "oauth_network");
  }

  let profile;
  try {
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store"
    });
    if (!userResponse.ok) {
      console.error("Discord user lookup failed:", userResponse.status, (await userResponse.text()).slice(0, 300));
      return fail(request, "oauth_user");
    }
    profile = await userResponse.json();
  } catch (err) {
    console.error("Discord user lookup request errored:", err instanceof Error ? err.message : "Unknown error");
    return fail(request, "oauth_network");
  }

  try {
    const user = {
      id: String(profile.id),
      username: String(profile.username || "Discord user"),
      globalName: String(profile.global_name || profile.username || "Discord user"),
      avatar: profile.avatar
        ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`
        : null
    };
    const session = makeSession(user);
    const response = NextResponse.redirect(new URL("/dashboard", current.origin));
    response.cookies.set(sessionCookieName, session, {
      httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60
    });
    response.cookies.set(stateCookieName, "", {
      httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 0
    });
    return response;
  } catch (err) {
    console.error("Discord session creation failed:", err instanceof Error ? err.message : "Unknown error");
    return fail(request, "oauth_session");
  }
}
