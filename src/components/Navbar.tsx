import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav
          className="navbar-content"
          aria-label="main navigation"
        >
          <Link
            to="/"
            className="navbar-brand"
            aria-label="CuteCard home"
          >
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="150"
                cy="150"
                r="150"
                fill="#3B1E54"
              />
            </svg>

            <span>Brand</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setIsToggleOpen(!isToggleOpen)
            }
            aria-expanded={isToggleOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <ul
            className={`navbar-links ${
              isToggleOpen ? "navbar-links-open" : ""
            }`}
          >
            <li>
              <Link to="/" onClick={() => setIsToggleOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/cards"
                onClick={() => setIsToggleOpen(false)}
              >
                Cards
              </Link>
            </li>

            <li>
              <Link
                to="/order"
                onClick={() => setIsToggleOpen(false)}
              >
                Order
              </Link>
            </li>

            <li>
              <Link
                to="/corder"
                onClick={() => setIsToggleOpen(false)}
              >
                Coustom Order
              </Link>
            </li>
          </ul>

          <div className="navbar-action">
            <Button
              type="primary"
              className="navbar-contact-button"
            >
              Contact Us
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}