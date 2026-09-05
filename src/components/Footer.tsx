export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Our Story</h4>
          <p>
            At CuteCard, we specialize in creating unique,
            heartfelt gift cards for every occasion. Your
            memories, our creativity.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>

          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/faq">FAQs</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>

          <p>CuteCard, Uva Wellassa, Sri Lanka</p>
          <p>support@cutecard.com</p>
          <p>+94 71 234 5678</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>

          <ul className="footer-social">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>

            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 CuteCard. All rights reserved.</p>
      </div>
    </footer>
  );
}