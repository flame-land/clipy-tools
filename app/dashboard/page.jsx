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
        <a className="brand" href="/">clipy<span>.</span>tools</a>
        <nav className="menulinks"><a href="/dashboard">Workspace</a><a href="/dashboard#tools">Tools</a></nav>
        <div className="appbar-right"><span><i className="status-dot" />Signed in</span><div className="user">{user.avatar && <img className="avatar" src={user.avatar} alt="" />}<span className="user-name">{user.globalName}</span><form action="/api/auth/logout" method="post"><button className="button secondary" type="submit">Log out</button></form></div></div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div><div className="side-heading">Workspace</div><a className="side-link active" href="/dashboard"><span className="side-icon">▦</span>Overview</a><a className="side-link" href="#tools"><span className="side-icon">⌘</span>All tools</a></div>
          <div><div className="side-heading">Applications</div>{bgremoverUrl ? <a className="side-link" href={bgremoverUrl} target="_blank" rel="noreferrer"><span className="side-icon">◈</span>BGremover ↗</a> : <span className="side-link"><span className="side-icon">◈</span>BGremover</span>}<a className="side-link" href="https://discord.com/developers/applications" target="_blank" rel="noreferrer"><span className="side-icon">⌁</span>Clipy Bot ↗</a></div>
          <div className="sidebar-bottom">CLIPY TOOLS<br/>Creator utilities<br/><span style={{color:"#6e6e77"}}>Workspace v1.0</span></div>
        </aside>
        <section className="main-area">
          <div className="contextbar"><span>Workspace</span><span className="crumb">/</span><strong>Overview</strong></div>
          <div className="content">
            <div className="page-heading"><div><div className="kicker">Workspace / Overview</div><h1>Good to have you back.</h1><p className="subtitle">Your creator tools, ready when you are.</p></div><span className="small">Signed in as @{user.username}</span></div>
            <div className="stats"><div className="stat"><div className="stat-label">WORKSPACE</div><div className="stat-value">Active</div><div className="stat-foot">Discord authenticated</div></div><div className="stat"><div className="stat-label">TOOLS</div><div className="stat-value">02</div><div className="stat-foot">Creator utilities</div></div><div className="stat"><div className="stat-label">SESSION</div><div className="stat-value">Secure</div><div className="stat-foot">Signed-in session</div></div></div>
            <div className="dashboard-grid" id="tools">
              <section className="panel"><div className="panel-head"><span>Available tools</span><span className="subtle">2 APPLICATIONS</span></div><div className="tool-list">
                <article className="tool-row"><div className="tool-icon">◈</div><div className="tool-info"><h2>BGremover</h2><p>Remove backgrounds from video clips and images.</p></div><div className="tool-action">{bgremoverUrl ? <a className="button" href={bgremoverUrl} target="_blank" rel="noreferrer">Launch ↗</a> : <span className="small">Not configured</span>}</div></article>
                <article className="tool-row"><div className="tool-icon">⌁</div><div className="tool-info"><h2>Clipy Bot</h2><p>Manage your Discord bot and creator utilities.</p></div><div className="tool-action"><a className="button secondary" href="https://discord.com/developers/applications" target="_blank" rel="noreferrer">Open portal ↗</a></div></article>
              </div></section>
              <section className="panel"><div className="panel-head"><span>Workspace activity</span><span className="subtle">STATUS</span></div><div className="activity-list"><div className="activity-item"><i className="activity-mark" /><div className="activity-copy">Discord authentication<span>Account connected successfully</span></div></div><div className="activity-item"><i className="activity-mark" /><div className="activity-copy">Creator workspace<span>Dashboard is ready to use</span></div></div><div className="activity-item"><i className="activity-mark" /><div className="activity-copy">BGremover<span>{bgremoverUrl ? "Service link configured" : "Add BGREMOVER_URL in Vercel settings to enable launch"}</span></div></div></div></section>
            </div>
            <section className="workbench"><div className="panel-head"><span>Composition preview</span><span className="subtle">UI PREVIEW · NOT AN EDITOR</span></div><div className="workbench-body"><div className="preview-pane"><div><div className="preview-frame" /><div className="preview-caption">Preview canvas</div></div></div><div className="timeline"><div className="timeline-title">TIMELINE / SAMPLE_SEQUENCE</div><div className="ruler"><span>00:00</span><span>00:02</span><span>00:04</span><span>00:06</span><span>00:08</span></div><div className="track"><span /></div><div className="track"><span style={{width:"58%",background:"#514b76"}} /></div><div className="track audio"><span /></div></div></div></section>
          </div>
        </section>
      </div>
      <footer className="footerbar"><span>Clipy Tools · Workspace</span><span><i className="status-dot" />All systems ready</span></footer>
    </main>
  );
}
