import styles from "../css/home.module.css";

import { Link,useNavigate } from "react-router-dom";
import {useState,useEffect,useRef, useLayoutEffect} from 'react';
import CTAButton from "./CTAbutton.jsx";
import Navbar from "./Navbar";
import Footer from "./Footer";

import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";

import Heroimg1 from "../assets/Heroimage1.webp";
import Heroimg2 from "../assets/Heroimage2.webp";
import pattern from "../assets/pattern.svg";

import men4 from "../assets/men4.webp";
import women4 from "../assets/women4.avif";
import kids4 from "../assets/kids4.avif";
import kids8 from "../assets/kids8.avif";

import arr1 from "../assets/arr1.avif";
import arr2 from "../assets/arr2.avif";
import arr3 from "../assets/arr3.avif";
import arr4 from "../assets/arr4.avif";

// import { Link } from "react-router-dom";

// import icon1 from "../assets/icon1.svg";
// import icon3 from "../assets/icon3.svg";

import { useAuth } from "./AuthContext.jsx";

import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import Arrivals from "./Arrivals.jsx";
import Category from "./Category.jsx";
import BestSellers from "./BestSellers.jsx";
import CustomerReviews from "./CustomerReviews.jsx";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {loading, user} = useAuth();
    const navRef = useRef(null);
  
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
  
    // Create user initials
    // const initials = user?.name
    //   ? user.name
    //       .split(" ")
    //       .map((word) => word.charAt(0).toUpperCase())
    //       .slice(0, 2)
    //       .join("")
    //   : "U";
    const [welcomeMsg, setWelcomeMsg] = useState("");
    const handleCloseToast = () => {
      setWelcomeMsg(""); 
    };

    useEffect(() => {
      if (loading) return;
      const hasVisited = localStorage.getItem("hasVisitedHomepage");
      if (!hasVisited) {
        // First time visitor
        setWelcomeMsg("Welcome to Elraft Fashion! 👋");
        localStorage.setItem("hasVisitedHomepage", "true");
      } else if (sessionStorage.getItem("showLoginToast") === "true") {
        if (user?.name) setWelcomeMsg(`Welcome Back! ${user.name}`);
        sessionStorage.removeItem("showLoginToast");
      }
    }, [loading, user]);


  

  return (
    <>
      {welcomeMsg && (
      <div className={styles.welcomeToast}>
      <p>{welcomeMsg}</p>
      <button onClick={handleCloseToast}>&times;</button>
      </div>
    )}

    <div className={styles.home}>
      <Navbar />

      <main>
        <section className={styles.heroContainer}>
          <section className={styles.hero}>
            <h1>Elevate Your Style</h1>
            <p>Discover pieces designed for your everyday expression.</p>
            <div style={{display: "flex",justifyContent: "center",width: "100%",}}>
              <CTAButton href="#category">
                Explore Collections
              </CTAButton>
            </div>
          </section>
        </section>
        <Arrivals />
        <Category />
        <BestSellers />
        <CustomerReviews />
      </main>
      <Footer />
      </div>
    </>
  );
}
