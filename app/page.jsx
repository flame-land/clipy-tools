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
      <header className="topbar">
        <a className="brand" href="/">clipy<span>.</span>tools</a>
        <span className="pill">CREATOR WORKSPACE</span>
      </header>
      <section className="hero">
        <div className="eyebrow">A workspace for your edits</div>
        <h1>Tools for the work behind the edit.</h1>
        <p>One place for Clipy creator tools. Sign in with Discord to open your workspace.</p>
        {message && <div className="notice" role="alert">{message}</div>}
        <div className="actions">
          <a className="button" href="/api/auth/login">◈ &nbsp; Continue with Discord</a>
        </div>
      </section>
      <section className="workbench" aria-label="Editing workspace preview">
        <div className="workbench-bar">
          <div className="traffic"><i /><i /><i /></div>
          <span>CLIPY TOOLS / WORKSPACE</span>
          <span>01 — 02</span>
        </div>
        <div className="workbench-main">
          <div className="preview-pane">
            <div>
              <div className="preview-art" />
              <div className="preview-label">COMPOSITION PREVIEW</div>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-title">TIMELINE · EDIT_SEQUENCE_01</div>
            <div className="ruler"><span>00:00</span><span>00:02</span><span>00:04</span><span>00:06</span><span>00:08</span></div>
            <div className="track"><span /></div>
            <div className="track"><span /></div>
            <div className="track audio"><span /></div>
            <p className="small">Keep your tools close. Keep your workflow moving.</p>
          </div>
        </div>
      </section>
      <footer className="footer">Clipy Tools <span>·</span> Creator workspace</footer>
    </main>
  );
}
