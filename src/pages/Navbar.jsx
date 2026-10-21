import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "../css/navbar.module.css";
import { Link } from "react-router-dom";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import { useAuth } from "./AuthContext.jsx";

const Navbar = () => {
  const { user, loading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Create user initials
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "U";

  // Prevent page scrolling when mobile menu is open
  useLayoutEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.nav} ref={navRef}>
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <h1>Raftel Fashion</h1>
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        {/* Categories */}
        <ul
          className={`${styles.categories} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <li className={styles.rightBr}>
            <Link to="/men" onClick={closeMenu}>
              Men
            </Link>
          </li>

          <li className={styles.rightBr}>
            <Link to="/women" onClick={closeMenu}>
              Women
            </Link>
          </li>

          <li className={styles.rightBr}>
            <Link to="/kids" onClick={closeMenu}>
              Kids
            </Link>
          </li>

          <li className={styles.rightBr}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
        </ul>

        {/* User actions */}
        <ul className={styles.userActions}>
          <li title="Profile">
            {loading ? (
              <div className={styles.avatarIcon}>
                <div className={styles.initials}>...</div>
              </div>
            ) : user ? (
              <Link
                to="/profile"
                className={styles.avatarIcon}
                onClick={closeMenu}
                aria-label="My profile"
              >
                <div className={styles.initials}>
                  {initials}
                </div>
              </Link>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <img src={icon1} alt="Profile" />
              </Link>
            )}
          </li>

          {/* <li title="Wishlist">
            <Link to="/wishlist" onClick={closeMenu}>
              <img src={icon2} alt="Wishlist" />
            </Link>
          </li> */}

          <li title="My cart">
            <Link to="/mycart" onClick={closeMenu}>
              <img src={icon3} alt="Cart" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className={styles.menuOverlay}
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Navbar;
