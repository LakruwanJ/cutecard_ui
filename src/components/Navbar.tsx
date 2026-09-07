import { useState } from "react";
import { Badge, Button, Tooltip, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../Function/ShopContext";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { cartCount, wishlistCount } = useShop();

  const isActive = (path: string) => (pathname === path ? "active" : "");
  const close = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav className="navbar-content" aria-label="Main navigation">

          {/* ── Brand ── */}
          <Link to="/" className="navbar-brand" aria-label="CuteCard home" onClick={close}>
            <div className="navbar-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.314 3.87 1
                     6.498 1 8.533 1 10.515 2.395 12 4c1.485-1.605 3.467-3
                     5.502-3C20.13 1 23 3.314 23 7.19c0 4.105-5.37 8.863-11 14.402z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="navbar-brand-text">
              <Typography.Text className="navbar-brand-name">CuteCard</Typography.Text>
              <Typography.Text className="navbar-brand-sub">Handmade with love</Typography.Text>
            </div>
          </Link>

          {/* ── Mobile toggle ── */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          {/* ── Nav links ── */}
          <ul className={`navbar-links${isOpen ? " navbar-links-open" : ""}`}>
            {[
              { to: "/",       label: "Home" },
              { to: "/cards",  label: "Cards" },
              { to: "/order",  label: "Order" },
              { to: "/corder", label: "Custom Order" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={isActive(to)} onClick={close}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Action icons ── */}
          <div className="navbar-action">

            {/* Wishlist */}
            <Tooltip title="Wishlist">
              <Link to="/wishlist" className="navbar-icon-btn" aria-label="View wishlist" onClick={close}>
                <Badge
                  count={wishlistCount}
                  size="small"
                  color="var(--cc-accent)"
                  style={{ color: "var(--cc-primary)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "var(--cc-accent)" : "none"}
                    stroke="var(--cc-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.314 3.87 1
                             6.498 1 8.533 1 10.515 2.395 12 4c1.485-1.605 3.467-3
                             5.502-3C20.13 1 23 3.314 23 7.19c0 4.105-5.37 8.863-11 14.402z"/>
                  </svg>
                </Badge>
              </Link>
            </Tooltip>

            {/* Cart */}
            <Tooltip title="Cart">
              <Link to="/cart" className="navbar-icon-btn" aria-label="View cart" onClick={close}>
                <Badge count={cartCount} size="small" color="var(--cc-primary)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="var(--cc-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </Badge>
              </Link>
            </Tooltip>

            {/* Contact Us */}
            <Link to="/contact" onClick={close}>
              <Button type="primary" className="navbar-contact-btn">
                Contact Us
              </Button>
            </Link>

          </div>
        </nav>
      </div>
    </header>
  );
}