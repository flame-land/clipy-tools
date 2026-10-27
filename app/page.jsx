const errors = {
  discord_denied: "Discord login was cancelled.",
  oauth_state: "Login could not be verified. Try again.",
  oauth_failed: "Discord login failed. Check Vercel function logs.",
  oauth_config: "Discord OAuth environment variables are missing.",
  oauth_token: "Discord rejected the login exchange. Check Client Secret and Redirect URI.",
  oauth_user: "Could not load your Discord profile.",
  oauth_network: "Could not reach Discord. Try again.",
  oauth_session: "Could not create login session. Check SESSION_SECRET."
};

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const message = errors[params?.error];
  return (
    <main className="shell">
      <header className="appbar">
        <nav className="menulinks"><a href="#tools">Tools</a><a href="https://discord.com" target="_blank" rel="noreferrer">Discord ↗</a></nav>
        <div className="appbar-right"><a href="/api/auth/login">Sign in</a></div>
      </header>
      <div className="workspace">
        <aside className="sidebar" aria-label="Main navigation">
          <a className="side-link active" href="/" aria-label="Home" title="Home">⌂</a>
          <a className="side-link" href="#tools" aria-label="Tools" title="Tools">▦</a>
        </aside>
        <section className="main-area">
          <div className="contextbar"><strong>Home</strong></div>
          <div className="content">
            <div className="login-layout">
              <section className="login-copy">
                <h1>Tools</h1>
                {message && <div className="notice" role="alert">{message}</div>}
                <div className="login-actions"><a className="button" href="/api/auth/login">Sign in with Discord</a></div>
              </section>
              <section className="login-preview" id="tools" aria-label="Tools">
                <div className="preview-tools">
                  <a className="preview-tool" href="/api/auth/login"><div className="preview-tool-icon">◈</div><div className="preview-tool-copy"><strong>BGremover</strong><span>Video / Image</span></div><span className="preview-arrow">↗</span></a>
                  <a className="preview-tool" href="/api/auth/login"><div className="preview-tool-icon">⌁</div><div className="preview-tool-copy"><strong>Clipy Bot</strong><span>Discord</span></div><span className="preview-arrow">↗</span></a>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <footer className="footerbar"><span>Tools</span></footer>
    </main>
  );
}
