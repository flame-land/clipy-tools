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
      <header className="appbar">
        
        <nav className="menulinks"><a href="/dashboard">Workspace</a><a href="#tools">Tools</a></nav>
        <div className="appbar-right"><div className="user">{user.avatar && <img className="avatar" src={user.avatar} alt="" />}<span className="user-name">{user.globalName}</span><form action="/api/auth/logout" method="post"><button className="button secondary" type="submit">Log out</button></form></div></div>
      </header>
      <div className="workspace">
        <section className="main-area">
          <div className="contextbar"><strong>Workspace</strong></div>
          <div className="content">
            <div className="page-heading">
              <div><h1>Tools</h1></div>
              <span className="small">Signed in as @{user.username}</span>
            </div>
            <div className="dashboard-grid" id="tools">
              <section>
                <h2 className="section-title">Your tools</h2>
                <div className="tool-list">
                  <article className="tool-row"><div className="tool-icon">◈</div><div className="tool-info"><h2>BGremover</h2><p>Remove backgrounds from videos and images.</p></div><div className="tool-action">{bgremoverUrl ? <a className="button" href={bgremoverUrl} target="_blank" rel="noreferrer">Open ↗</a> : <span className="small">Unavailable</span>}</div></article>
                  <article className="tool-row"><div className="tool-icon">⌁</div><div className="tool-info"><h2>Clipy Bot</h2><p>Manage your Discord bot application.</p></div><div className="tool-action"><a className="button secondary" href="https://discord.com/developers/applications" target="_blank" rel="noreferrer">Open ↗</a></div></article>
                </div>
              </section>
              <section>
                <h2 className="section-title">Workspace</h2>
                <div className="activity-list">
                  <div className="activity-item">Discord account<span>Connected as @{user.username}</span></div>
                  <div className="activity-item">BGremover<span>{bgremoverUrl ? "Available" : "Currently unavailable"}</span></div>
                  <div className="activity-item">Clipy Bot<span>Discord bot tools</span></div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <footer className="footerbar"><span>Workspace</span></footer>
    </main>
  );
}
