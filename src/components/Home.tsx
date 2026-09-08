import { Button, Card, Col, Divider, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import AnimationOne from "../Function/AnimationOne";
import Cards from "./Cards";
import HeroIllustration from "../Images/HeroIllustration.svg";
import "../styles/home.css";

const { Title, Paragraph } = Typography;

/* ── Data ── */
const features = [
  { icon: "✍️", title: "Handcrafted with Love",    desc: "Every card is individually made by our artisans, ensuring a unique personal touch that mass-produced cards can never replicate." },
  { icon: "🎨", title: "Custom Designs",            desc: "Choose your colors, message, and style. We bring your vision to life — every card is perfectly yours." },
  { icon: "⚡", title: "Fast Delivery",             desc: "Need a last-minute gift? Our streamlined process ensures your beautiful handmade card arrives right on time." },
  { icon: "💎", title: "Premium Materials",         desc: "Thick cardstock, vibrant inks, premium ribbons — your cards feel as special as they look." },
  { icon: "🌿", title: "Eco-Friendly",              desc: "We source sustainable, recycled materials and use eco-conscious packaging on every order." },
  { icon: "💖", title: "Made to Remember",          desc: "Treasured keepsakes for birthdays, anniversaries, weddings, and every celebration in between." },
];

const categories = [
  { emoji: "🎂", name: "Birthday",           count: "24 cards", category: "Birthday" },
  { emoji: "💍", name: "Wedding",            count: "18 cards", category: "Wedding" },
  { emoji: "💝", name: "Love & Anniversary", count: "15 cards", category: "Love & Anniversary" },
  { emoji: "✨", name: "Pop-up 3D",          count: "12 cards", category: "Pop-up 3D" },
  { emoji: "🌷", name: "Thank You",          count: "16 cards", category: "Thank You" },
  { emoji: "🌟", name: "All Occasions",      count: "95+ cards", category: "All" },
];

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">

        {/* ══════════════════════════════════════════
            HERO
            ══════════════════════════════════════════ */}
        <section className="hero-section" id="hero" aria-label="Hero">
          <AnimationOne>
            <div className="hero-row">

              {/* Left: copy */}
              <div className="hero-left">
                {/* High-contrast badge */}
                <div className="hero-badge">
                  <span className="hero-badge-dot" />
                  ✨ Handmade Gift Cards · Sri Lanka
                </div>

                {/* Title */}
                <div className="hero-title-wrap">
                  <Title level={1} className="hero-title">
                    Give the Gift of{" "}
                    <span className="hero-title-gradient">
                      Handcrafted<br />Memories
                    </span>
                  </Title>
                </div>

                <Paragraph className="hero-desc">
                  At CuteCard, every gift card is a tiny work of art — made
                  by hand, filled with love, and designed to make every
                  celebration unforgettable. Customize yours today!
                </Paragraph>

                {/* CTAs */}
                <div className="hero-actions">
                  <Link to="/cards">
                    <Button type="primary" size="large" className="hero-btn-primary">
                      Shop Cards →
                    </Button>
                  </Link>
                  <Link to="/corder">
                    <Button size="large" className="hero-btn-secondary">
                      Custom Order
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-value">500+</span>
                    <span className="hero-stat-label">Happy Customers</span>
                  </div>
                  <div className="hero-stat-sep" />
                  <div className="hero-stat">
                    <span className="hero-stat-value">95+</span>
                    <span className="hero-stat-label">Card Designs</span>
                  </div>
                  <div className="hero-stat-sep" />
                  <div className="hero-stat">
                    <span className="hero-stat-value">100%</span>
                    <span className="hero-stat-label">Handmade</span>
                  </div>
                </div>
              </div>

              {/* Right: SVG illustration */}
              <div className="hero-right">
                <div className="hero-svg-wrapper">
                  <div className="hero-svg-blob" />
                  <div className="hero-svg-card">
                    <img
                      src={HeroIllustration}
                      alt="Handmade gift cards illustration"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  {/* Floating tags */}
                  <div className="hero-float-tag hero-float-tag-1">
                    <span className="hero-float-tag-icon">🏅</span>
                    Best Seller
                  </div>
                  <div className="hero-float-tag hero-float-tag-2">
                    <span className="hero-float-tag-icon">⭐</span>
                    4.9 / 5 Rating
                  </div>
                </div>
              </div>

            </div>
          </AnimationOne>
        </section>

        <Divider className="home-divider" />

        {/* ══════════════════════════════════════════
            FEATURED CARDS  ← right after hero
            ══════════════════════════════════════════ */}
        <section className="shop-section" id="shop" aria-label="Featured cards">
          <div className="shop-section-head">
            <div>
              <span className="cc-eyebrow">Our Collection</span>
              <Title level={2} style={{ marginTop: 10, marginBottom: 0, color: "var(--cc-text-dark)" }}>
                Featured Cards
              </Title>
            </div>
            <Link to="/cards">
              <Button className="shop-view-all">View All →</Button>
            </Link>
          </div>
          <Cards />
        </section>

        <Divider className="home-divider" />

        {/* ══════════════════════════════════════════
            CATEGORIES QUICK-FILTER
            ══════════════════════════════════════════ */}
        <section className="categories-section" id="categories" aria-label="Browse by occasion">
          <div className="cc-section-head">
            <span className="cc-eyebrow">Browse by Occasion</span>
            <Title level={2} style={{ marginTop: 12, marginBottom: 10, color: "var(--cc-text-dark)" }}>
              Find the Perfect Card
            </Title>
            <Paragraph style={{ color: "var(--cc-text-light)", fontSize: 16, marginBottom: 0 }}>
              From birthdays to weddings, we have a handcrafted card for every special moment.
            </Paragraph>
          </div>

          <div className="categories-scroll">
            {categories.map((cat) => (
              <Link
                to={cat.category === "All" ? "/cards" : `/cards?category=${encodeURIComponent(cat.category)}`}
                className="category-pill"
                key={cat.name}
              >
                <span className="category-emoji">{cat.emoji}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </Link>
            ))}
          </div>
        </section>

        <Divider className="home-divider" />

        {/* ══════════════════════════════════════════
            WHY CUTECARD
            ══════════════════════════════════════════ */}
        <section className="features-section" id="features" aria-label="Why CuteCard">
          <div className="cc-section-head">
            <span className="cc-eyebrow">Why Choose Us</span>
            <Title level={2} style={{ marginTop: 12, marginBottom: 10, color: "var(--cc-text-dark)" }}>
              Crafted for Every Moment
            </Title>
            <Paragraph style={{ color: "var(--cc-text-light)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
              We pour heart and soul into every card, because we believe the best gifts
              come from the heart.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {features.map((f, i) => (
              <Col key={i} xs={24} sm={12} lg={8}>
                <Card className="feature-antd-card" style={{ height: "100%" }}>
                  <div className="feature-icon-wrap">{f.icon}</div>
                  <Title level={4} className="feature-title">{f.title}</Title>
                  <Paragraph className="feature-desc">{f.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* ══════════════════════════════════════════
            CTA BANNER
            ══════════════════════════════════════════ */}
        <section className="cta-section" id="cta" aria-label="Call to action">
          <div className="cta-card">
            <span className="cta-eyebrow">✉️ Start Creating</span>

            <Title level={2} className="cta-title">
              Your Perfect Card is<br />One Click Away
            </Title>

            <Paragraph className="cta-desc">
              Create a one-of-a-kind, handmade card your loved ones will cherish
              forever. Let's make it together.
            </Paragraph>

            <Row justify="center" gutter={[16, 12]}>
              <Col>
                <Link to="/corder">
                  <Button type="primary" size="large" className="cta-btn-primary">
                    ✨ Custom Order
                  </Button>
                </Link>
              </Col>
              <Col>
                <Link to="/cards">
                  <Button size="large" className="cta-btn-ghost">
                    Browse Collection
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </section>

      </div>
    </div>
  );
}
