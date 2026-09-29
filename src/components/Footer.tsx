export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a className="logo" href="#home">
              SAVORÉ
            </a>
            <p className="footer-tag">Simple food. Beautiful moments.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="#contact">Contact</a>
            <a href="#menu">Menu</a>
          </nav>
        </div>
        <p className="footer-copy">© 2026 SAVORÉ. All rights reserved.</p>
      </div>
    </footer>
  )
}
