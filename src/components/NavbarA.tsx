import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function NavbarA() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav
          className="navbar-content"
          aria-label="admin navigation"
        >
          <Link
            to="/admin"
            className="navbar-brand"
            aria-label="CuteCard admin dashboard"
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
              <Link
                to="/admin"
                onClick={() => setIsToggleOpen(false)}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/admin/cards"
                onClick={() => setIsToggleOpen(false)}
              >
                Cards
              </Link>
            </li>

            <li>
              <Link
                to="/admin/vieworders"
                onClick={() => setIsToggleOpen(false)}
              >
                Orders
              </Link>
            </li>

            <li>
              <Link
                to="/admin/addcard"
                onClick={() => setIsToggleOpen(false)}
              >
                Add Card
              </Link>
            </li>
          </ul>

          <div className="navbar-action">
            <Button
              type="primary"
              className="navbar-contact-button"
            >
              Log Out
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}