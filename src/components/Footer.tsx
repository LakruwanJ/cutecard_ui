import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const { Title, Paragraph } = Typography;

const quickLinks = [
  { href: "/",        label: "Home" },
  { href: "/cards",   label: "Shop Cards" },
  { href: "/corder",  label: "Custom Order" },
  { href: "/order",   label: "My Orders" },
  { href: "/contact", label: "Contact & FAQs" },
];

const socialLinks = [
  { href: "https://facebook.com",  label: "Fb",  title: "Facebook"  },
  { href: "https://instagram.com", label: "Ig",  title: "Instagram" },
  { href: "https://linkedin.com",  label: "In",  title: "LinkedIn"  },
  { href: "https://youtube.com",   label: "Yt",  title: "YouTube"   },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Row gutter={[32, 40]}>

          {/* Brand */}
          <Col xs={24} sm={24} md={8} lg={7}>
            <div className="footer-brand-logo">
              <div className="footer-brand-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.314 3.87 1
                       6.498 1 8.533 1 10.515 2.395 12 4c1.485-1.605 3.467-3
                       5.502-3C20.13 1 23 3.314 23 7.19c0 4.105-5.37 8.863-11 14.402z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="footer-brand-name">CuteCard</span>
            </div>
            <Paragraph className="footer-brand-desc">
              Handcrafted gift cards made with love in Sri Lanka. Every card
              tells a story — let us help you tell yours.
            </Paragraph>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={8} md={5} lg={5}>
            <Title level={5} className="footer-section-title">Quick Links</Title>
            <nav className="footer-links" aria-label="Footer navigation">
              {quickLinks.map(({ href, label }) => (
                <Link key={href} to={href}>{label}</Link>
              ))}
            </nav>
          </Col>

          {/* Contact */}
          <Col xs={12} sm={8} md={6} lg={6}>
            <Title level={5} className="footer-section-title">Contact Us</Title>
            <div className="footer-contact-line">
              <span className="footer-contact-icon">📍</span>
              <span>Uva Wellassa, Sri Lanka</span>
            </div>
            <div className="footer-contact-line">
              <span className="footer-contact-icon">✉️</span>
              <span>support@cutecard.lk</span>
            </div>
            <div className="footer-contact-line">
              <span className="footer-contact-icon">📞</span>
              <span>+94 71 234 5678</span>
            </div>
            <div className="footer-contact-line" style={{ marginTop: 8 }}>
              <span className="footer-contact-icon">🕐</span>
              <span>Mon–Sat: 9 AM – 6 PM</span>
            </div>
          </Col>

          {/* Social */}
          <Col xs={24} sm={8} md={5} lg={6}>
            <Title level={5} className="footer-section-title">Follow Us</Title>
            <div className="footer-social">
              {socialLinks.map(({ href, label, title }) => (
                <a
                  key={href}
                  href={href}
                  className="footer-social-link"
                  target="_blank"
                  rel="noreferrer"
                  title={title}
                  aria-label={title}
                >
                  {label}
                </a>
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.32)" }}>
              Tag us with{" "}
              <strong style={{ color: "rgba(239,182,200,0.7)" }}>#CuteCard</strong>{" "}
              to be featured!
            </p>
          </Col>

        </Row>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <Paragraph className="footer-copyright">
          © 2024 CuteCard. All rights reserved. Made with 💜 in Sri Lanka.
        </Paragraph>
        <nav className="footer-policy-links" aria-label="Legal links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/refund">Refund Policy</a>
        </nav>
      </div>
    </footer>
  );
}