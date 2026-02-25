import styles from "../css/home.module.css";

import { Link,useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';

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

import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";

export default function Home() {
    const [welcomeMsg, setWelcomeMsg] = useState("");
    const handleCloseToast = () => {
      setWelcomeMsg(""); 
    };

    useEffect(() => {
      const hasVisited = localStorage.getItem("hasVisitedHomepage");
       const user = localStorage.getItem("user");
      if (!hasVisited) {
        // First time visitor
        setWelcomeMsg("Welcome to Elraft Fashion! 👋");
        localStorage.setItem("hasVisitedHomepage", "true");
      } else if (sessionStorage.getItem("showLoginToast") === "true") {
        // After login
        const userData = JSON.parse(user);
        setWelcomeMsg(`Welcome Back! ${userData.name}` );
        sessionStorage.removeItem("showLoginToast");
      }
    }, []);
  return (
    <>
      {welcomeMsg && (
        <div className={styles.welcomeToast}>
          {welcomeMsg}
          <button onClick={handleCloseToast}>&times;</button>
        </div>
      )}

      <div className={styles.home}>
        <Navbar />
        <main>
          <div className={styles.heroContainer}>
            <div className={styles.hero}>
              <div className={styles.dots}>
                <h2>. . . .</h2>
                <h2>. . . .</h2>
              </div>

              <h1 className={styles.heroTitle}>
                FASHION
                <span style={{ color: "#b24f68", paddingLeft: "10px" }}>
                  SALE
                </span>
              </h1>

              <p className={styles.heroDesc}>
                UP TO <span style={{ fontWeight: "bold" }}>50%</span> OFF
              </p>

              <a href="#trnd" className={styles.trnd}>
                <button className={styles.buyBtn}>Buy Now</button>
              </a>
            </div>

            <div className={styles.roundedShapes}>
              <div></div>
              <div></div>
            </div>
            <div className={styles.heroImgs}>
              <img src={Heroimg1} alt="hero" />
              <img className={styles.Heroimg2} src={Heroimg2} alt="hero" />
            </div>
            <div className={styles.rectangledShapes}>
              <div></div>
              <div></div>
            </div>
            <div className={styles.decorations}>
              <img src={pattern} alt="pattern" className={styles.pattern1} />
              <img src={pattern} alt="pattern" className={styles.pattern2} />
            </div>
          </div>

          <div className={styles.trending} id="trnd">
            <h1>Trending Now</h1>
            <div className={styles.imageContainer}>
              {[
                {
                  title: "Sports T-shirts",
                  cat: "Mens Topwear",
                  img: men4,
                  off: "50%",
                  link: "/men",
                },
                {
                  title: "Silk Shirt",
                  cat: "Womens Topwear",
                  img: women4,
                  off: "60%",
                  link: "/women",
                },
                {
                  title: "Printed Frocks",
                  cat: "Girls Dresses",
                  img: kids4,
                  off: "70%",
                  link: "/kids",
                },
                {
                  title: "Boys Formal Suit",
                  cat: "Boys Dresses",
                  img: kids8,
                  off: "50%",
                  link: "/kids",
                },
              ].map((item, i) => (
                <div className={styles.image} key={i}>
                  <h1>{item.title}</h1>
                  <p>{item.cat}</p>
                  <img src={item.img} alt={item.title} />
                  <span>{item.off} off</span>

                  <Link to={item.link}>
                    <button>Shop now</button>
                  </Link>

                  {/* <li>
                    <img
                      className={styles.wishlist}
                      src={icon4}
                      alt="wishlist"
                    />
                  </li> */}
                </div>
              ))}
            </div>
          </div>

          <section className={styles.newArrivals}>
            <h2>New Arrivals</h2>
            <div className={styles.arrivalsGrid}>
              {[
                { name: "Shirt", price: "380rs", img: arr1, link: "/men" },
                { name: "Blazer", price: "2000rs", img: arr2, link: "/men" },
                {
                  name: "Floral Shrug",
                  price: "1800rs",
                  img: arr3,
                  link: "/women",
                },
                {
                  name: "Oversized Hoodie",
                  price: "800rs",
                  img: arr4,
                  link: "/men",
                },
              ].map((p, i) => (
                <div className={styles.productCard} key={i}>
                  <div className={styles.productImage}>
                    <img src={p.img} alt={p.name} />
                  </div>
                  <div className={styles.productInfo}>
                    <h3>{p.name}</h3>
                    <p>{p.price}</p>
                    <Link to={p.link}>View Product</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
