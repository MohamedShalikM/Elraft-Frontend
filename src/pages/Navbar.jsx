import React, { useState,useEffect, useLayoutEffect, useRef } from "react";
import styles from "../css/navbar.module.css";
import { Link } from "react-router-dom";
import icon1 from "../assets/icon1.svg";
import icon3 from "../assets/icon3.svg";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);


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
        <Link to="/" onClick={closeMenu}>
          <h1>ELRAFT</h1>
        </Link>

        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>

        <ul
          className={`${styles.categories} ${isMenuOpen ? styles.active : ""}`}
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

        <ul className={styles.userActions}>
          <li title="profile">
            {currentUser ? (
              <Link to="/profile" className={styles.avatarIcon}>
                <div className={styles.initials}>
                  {currentUser.name
                    ? currentUser.name.charAt(0).toUpperCase() +
                      (currentUser.name.includes(" ")
                        ? currentUser.name.split(" ")[1].charAt(0).toUpperCase()
                        : "")
                    : "U"}
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <img src={icon1} alt="profile" />
              </Link>
            )}
          </li>
          <li title="my-cart">
            <Link to="/mycart">
              <img src={icon3} alt="cart" />
            </Link>
          </li>
        </ul>
      </nav>

      {isMenuOpen && <div className={styles.menuOverlay} onClick={closeMenu} />}
    </>
  );
};

export default Navbar;
