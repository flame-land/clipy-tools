import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { makeSession, sessionCookieName, stateCookieName, secureCookie } from "../../../lib/session";

export const runtime = "nodejs";

function equal(a, b) {
  if (!a || !b) return false;
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
export async function GET(request) {
  const current = new URL(request.url);
  const error = current.searchParams.get("error");
  if (error) return NextResponse.redirect(new URL("/?error=discord_denied", current.origin));
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
    return NextResponse.json({ error: "Discord OAuth environment variables are missing." }, { status: 500 });
  }
  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId, client_secret: clientSecret, grant_type: "authorization_code",
        code, redirect_uri: redirectUri
      }),
      cache: "no-store"
    });
    if (!tokenResponse.ok) throw new Error("Token exchange failed");
    const tokenData = await tokenResponse.json();
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store"
    });
    if (!userResponse.ok) throw new Error("Discord user lookup failed");
    const profile = await userResponse.json();
    const user = {
      id: String(profile.id),
      username: String(profile.username || "Discord user"),
      globalName: String(profile.global_name || profile.username || "Discord user"),
      avatar: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128` : null
    };
    const response = NextResponse.redirect(new URL("/dashboard", current.origin));
    response.cookies.set(sessionCookieName, makeSession(user), {
      httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60
    });
    response.cookies.set(stateCookieName, "", { httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 0 });
    return response;
  } catch {
    const response = NextResponse.redirect(new URL("/?error=oauth_failed", current.origin));
    response.cookies.set(stateCookieName, "", { httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 0 });
    return response;
  }
}
