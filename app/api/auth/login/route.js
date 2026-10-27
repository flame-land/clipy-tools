import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { stateCookieName, secureCookie } from "../../../lib/session";

export const runtime = "nodejs";

export async function GET(request) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: "Discord OAuth environment variables are missing." }, { status: 500 });
  }
  const state = randomBytes(32).toString("base64url");
  const url = new URL("https://discord.com/oauth2/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "identify");
  url.searchParams.set("state", state);
  const response = NextResponse.redirect(url);
  response.cookies.set(stateCookieName, state, {
    httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 600
  });
  return response;
}
