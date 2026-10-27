const errors = {
  discord_denied: "Discord login was cancelled.",
  oauth_state: "Login could not be verified. Please try again.",
  oauth_failed: "Discord login failed. Check the Vercel function logs for the cause.",
  oauth_config: "Discord login is not configured. Check the Vercel environment variables.",
  oauth_token: "Discord rejected the login exchange. Check the Client Secret and Redirect URI.",
  oauth_user: "Discord approved login, but the profile could not be loaded.",
  oauth_network: "Could not reach Discord. Try again in a moment.",
  oauth_session: "Login succeeded, but the session could not be created. Check SESSION_SECRET."
};

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const message = errors[params?.error];
  return (
    <main className="shell">
      <header className="appbar">
        <a className="brand" href="/">clipy<span>.</span>tools</a>
        <nav className="menulinks"><a href="#tools">Tools</a><a href="https://discord.com" target="_blank" rel="noreferrer">Discord ↗</a></nav>
        <div className="appbar-right">Creator tools</div>
      </header>
      <div className="workspace">
        <section className="main-area">
          <div className="contextbar"><span>Clipy Tools</span><span className="crumb">/</span><strong>Home</strong></div>
          <div className="content">
            <div className="login-layout">
              <section className="login-copy">
                <div className="kicker">Made for creators</div>
                <h1>Tools for the work you make.</h1>
                <p className="subtitle">Your creator utilities, in one place. Sign in with Discord to open your workspace.</p>
                {message && <div className="notice" role="alert">{message}</div>}
                <div className="login-actions"><a className="button" href="/api/auth/login">Continue with Discord <span aria-hidden="true">&nbsp;↗</span></a></div>
              </section>
              <section className="login-preview" id="tools" aria-label="Available tools">
                <p className="preview-heading">Available tools</p>
                <div className="preview-tools">
                  <a className="preview-tool" href="/api/auth/login"><div className="preview-tool-icon">◈</div><div className="preview-tool-copy"><strong>BGremover</strong><span>Video and image background removal</span></div><span className="preview-arrow">↗</span></a>
                  <a className="preview-tool" href="/api/auth/login"><div className="preview-tool-icon">⌁</div><div className="preview-tool-copy"><strong>Clipy Bot</strong><span>Discord creator utilities</span></div><span className="preview-arrow">↗</span></a>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <footer className="footerbar"><span>Clipy Tools</span><span>Built for creators</span></footer>
    </main>
  );
}
