import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../css/profile.module.css";

import Navbar from "./Navbar";
import Footer from "./Footer";

import Mail from "../assets/mail.svg";

import { useAuth } from "./AuthContext.jsx";

export default function Profile() {
  const { user, loading, logout } = useAuth();

  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  // Loading
  if (loading) {
    return (
      <div className={styles.loading}>
        Loading profile...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <>
        <Navbar />

        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.title}>
              Profile
            </h2>

            <p className={styles.message}>
              Please log in to view your profile.
            </p>

            <Link
              to="/login"
              className={styles.loginBtn}
            >
              Go to Login
            </Link>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // Create initials
  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) =>
          word.charAt(0).toUpperCase()
        )
        .slice(0, 2)
        .join("")
    : "U";

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.profileCard}>

          {/* Profile Avatar */}
          <div
            className={styles.avatar}
            style={{
              backgroundColor: "#b24f68",
            }}
          >
            {initials}
          </div>

          {/* User Name */}
          <h2 className={styles.name}>
            {user.name}
          </h2>

          {/* User Email */}
          <div className={styles.contactInfo}>
            <p className={styles.email}>
              <img
                src={Mail}
                alt="email"
              />

              <span>
                {user.email}
              </span>
            </p>
          </div>

          {/* Account Information */}
          <div className={styles.info}>

            <div className={styles.infoItem}>
              <span>Orders</span>
              <strong>0</strong>
            </div>

            <div className={styles.infoItem}>
              <span>Wishlist</span>
              <strong>0</strong>
            </div>

            <div className={styles.infoItem}>
              <span>Points</span>
              <strong>0</strong>
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={styles.logoutBtn}
          >
            Logout
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}