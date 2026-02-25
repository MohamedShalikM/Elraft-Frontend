import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../css/profile.module.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import Mail from "../assets/Mail.svg";
import Phone from "../assets/phone.svg";
import Address from "../assets/address.svg";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Profile</h2>
          <p className={styles.message}>Please log in to view your profile.</p>
          <Link to="/login" className={styles.loginBtn}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const initials = user.name
    ? user.name.charAt(0).toUpperCase() +
      (user.name.split(" ")[1]
        ? user.name.split(" ")[1].charAt(0).toUpperCase()
        : "")
    : "U";

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.avatar} style={{ backgroundColor: "#b24f68" }}>
            {initials}
          </div>
          <div className={styles.contactInfo}>
            <p className={styles.email}>
              <img src={Mail} alt="email" />
              <span>{user.email}</span>
            </p>
            <p className={styles.phone}>
              <img src={Phone} alt="phone" />
              <span>{user.phone}</span>
            </p>
            <p className={styles.address}>
              <img src={Address} alt="address" />
              <span>{user.address}</span>
            </p>
          </div>

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
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
