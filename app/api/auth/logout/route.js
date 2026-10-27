import { NextResponse } from "next/server";
import { sessionCookieName, secureCookie } from "../../../lib/session";

export async function POST(request) {
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set(sessionCookieName, "", { httpOnly: true, secure: secureCookie, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
