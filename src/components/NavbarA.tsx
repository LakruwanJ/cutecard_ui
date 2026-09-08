import { useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Function/AuthContext";

export default function NavbarA() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              <span className="navbar-brand-name">CuteCard</span>
              <span className="navbar-brand-sub">Admin Panel</span>
            </div>
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
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}