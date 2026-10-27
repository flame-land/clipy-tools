import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readSession, sessionCookieName } from "../lib/session";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const jar = await cookies();
  const user = readSession(jar.get(sessionCookieName)?.value);
  if (!user) redirect("/");
  const bgremoverUrl = process.env.BGREMOVER_URL;
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/">clipy<span>.</span>tools</a>
        <div className="user">
          {user.avatar && <img className="avatar" src={user.avatar} alt="" />}
          <span className="small">{user.globalName}</span>
          <form action="/api/auth/logout" method="post"><button className="button secondary" type="submit">Log out</button></form>
        </div>
      </header>
      <section className="hero">
        <div className="eyebrow">Dashboard</div>
        <h1>Welcome back.</h1>
        <p>Choose a tool to get started.</p>
      </section>
      <section className="grid">
        <article className="card">
          <div className="card-icon">✦</div>
          <h2>BGremover</h2>
          <p>Remove backgrounds from clips and images.</p>
          {bgremoverUrl
            ? <a className="button" href={bgremoverUrl} target="_blank" rel="noreferrer">Open BGremover ↗</a>
            : <span className="small">Set BGREMOVER_URL in Vercel to enable this tool.</span>}
        </article>
        <article className="card">
          <div className="card-icon">↗</div>
          <h2>Clipy Bot</h2>
          <p>Use Clipy directly in your Discord server.</p>
          <a className="button secondary" href="https://discord.com/developers/applications" target="_blank" rel="noreferrer">Open Discord Developer Portal ↗</a>
        </article>
      </section>
      <footer className="footer">Signed in as @{user.username}. Your dashboard session is protected.</footer>
    </main>
  );
}
