import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "clipy_session";
const STATE_COOKIE = "clipy_oauth_state";

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must be set to a random secret of at least 32 characters.");
  return value;
}
function sign(value) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}
export function makeSession(user) {
  const payload = Buffer.from(JSON.stringify({ user, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64url");
  return payload + "." + sign(payload);
}
export function readSession(value) {
  if (!value || typeof value !== "string") return null;
  const [payload, signature, extra] = value.split(".");
  if (!payload || !signature || extra) return null;
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || data.exp < Date.now() || !data.user?.id) return null;
    return data.user;
  } catch { return null; }
}
export const sessionCookieName = COOKIE;
export const stateCookieName = STATE_COOKIE;
export const secureCookie = process.env.NODE_ENV === "production";
