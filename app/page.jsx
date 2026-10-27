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
        <span className="pill">CREATOR TOOLS</span>
      </header>
      <section className="hero">
        <div className="eyebrow">One place. Useful tools.</div>
        <h1>Make your next edit easier.</h1>
        <p>Sign in with Discord to open your Clipy Tools dashboard.</p>
        {message && <div className="notice" role="alert">{message}</div>}
        <div className="actions">
          <a className="button" href="/api/auth/login">◈ Continue with Discord</a>
        </div>
      </section>
      <footer className="footer">Clipy Tools <span>·</span> Simple tools for creators</footer>
    </main>
  );
}
