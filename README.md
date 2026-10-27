# Clipy Tools

Minimal Next.js website with Discord OAuth2 login and a protected dashboard.

## Vercel environment variables

Set these in **Vercel → Project → Settings → Environment Variables**:

- `DISCORD_CLIENT_ID` — Discord application Client ID
- `DISCORD_CLIENT_SECRET` — Discord application OAuth2 Client Secret (server-side only)
- `DISCORD_REDIRECT_URI` — exact callback URL, e.g. `https://clipy-tools.vercel.app/api/auth/callback`
- `SESSION_SECRET` — random secret, at least 32 characters
- `BGREMOVER_URL` — existing Render BGremover URL, e.g. `https://YOUR-SERVICE.onrender.com`

Do not add real secrets to this repository or expose them in client-side code.

## Discord Developer Portal

Under **OAuth2 → Redirects**, add the exact same value used for `DISCORD_REDIRECT_URI`. The domain must be assigned to this Vercel project.

## Deploy

Import this repository into Vercel with the Next.js framework preset. Every push to `main` should trigger a deployment if Git integration is enabled.

## Important security boundary

The dashboard route and its session are protected, but the existing BGremover Render service remains a separate public service. A link hidden behind login does not secure that service or its APIs. Before treating the tools as private, add server-side authorization to the Render backend (or a secure server-to-server gateway) and validate every protected backend request. Do not trust a browser-supplied user ID or secret.

## Local development

Use Node.js 20 or newer:

```bash
npm install
npm run dev
```

Create a local `.env.local` with the same variable names before testing OAuth.
