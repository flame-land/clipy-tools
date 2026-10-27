const errors = {
  discord_denied: "Discord login was cancelled.",
  oauth_state: "Login could not be verified. Please try again.",
  oauth_failed: "Discord login failed. Please try again."
};

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const message = errors[params?.error];
  return (
    <main className="shell">
      <header className="appbar">
        <a className="brand" href="/">clipy<span>.</span>tools</a>
        <nav className="menulinks"><a href="#tools">Tools</a><a href="#workspace">Workspace</a><a href="https://discord.com" target="_blank" rel="noreferrer">Discord ↗</a></nav>
        <div className="appbar-right"><span><i className="status-dot" />All systems</span><span>v1.0</span></div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div><div className="side-heading">Workspace</div><a className="side-link active" href="#workspace"><span className="side-icon">▦</span>Overview</a><a className="side-link" href="#tools"><span className="side-icon">⌘</span>Tools</a></div>
          <div><div className="side-heading">Applications</div><a className="side-link" href="#bgremover"><span className="side-icon">◈</span>BGremover</a><a className="side-link" href="#clipy"><span className="side-icon">⌁</span>Clipy Bot</a></div>
          <div className="sidebar-bottom">CLIPY TOOLS<br/>Creator utilities<br/><span style={{color:"#6e6e77"}}>Workspace preview</span></div>
        </aside>
        <section className="main-area">
          <div className="contextbar"><span>Workspace</span><span className="crumb">/</span><strong>Overview</strong></div>
          <div className="content">
            <div className="login-layout" id="workspace">
              <section className="login-copy">
                <div className="kicker">Creator workspace</div>
                <h1>Your editing workflow, in one place.</h1>
                <p className="subtitle">Open your tools, manage your creator setup, and get back to the timeline. Sign in with Discord to continue.</p>
                {message && <div className="notice" role="alert">{message}</div>}
                <div className="login-actions"><a className="button" href="/api/auth/login">◈ &nbsp; Sign in with Discord</a></div>
              </section>
              <section className="panel login-preview" aria-label="Workspace preview">
                <div className="panel-head"><span>Workspace overview</span><span className="subtle">LOCAL VIEW</span></div>
                <div className="preview-tools" id="tools">
                  <article className="preview-tool" id="bgremover"><div className="preview-tool-icon">◈</div><strong>BGremover</strong><span>Video & image tools</span></article>
                  <article className="preview-tool" id="clipy"><div className="preview-tool-icon">⌁</div><strong>Clipy Bot</strong><span>Discord utilities</span></article>
                </div>
                <div className="workbench home-workbench" id="timeline">
                  <div className="panel-head"><span>Composition · edit_01</span><span className="subtle">00:00:08:12</span></div>
                  <div className="workbench-body">
                    <div className="preview-pane"><div><div className="preview-frame" /><div className="preview-caption">Composition preview</div></div></div>
                    <div className="timeline"><div className="timeline-title">TIMELINE / LAYERS</div><div className="ruler"><span>00:00</span><span>00:02</span><span>00:04</span><span>00:06</span><span>00:08</span></div><div className="track"><span /></div><div className="track"><span style={{width:"58%",background:"#514b76"}} /></div><div className="track audio"><span /></div></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <footer className="footerbar"><span>Clipy Tools · Creator workspace</span><span>Ready</span></footer>
    </main>
  );
}
