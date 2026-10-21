import React from 'react'
import styles from "../css/Category.module.css";
import category1 from "../assets/Category1.webp";
import category2 from "../assets/Category2.webp";
import category3 from "../assets/Category3.webp";
import { Link } from 'react-router-dom';
const Category = () => {
  return (
    <div id="category">
        <section className={styles.categorySection}>
        <h2 className={styles.sectionTitle}>Shop By Category</h2>
        <div className={styles.categoryGrid}>
        <Link to="/women" className={styles.categoryCard}>
            <div className={styles.cardImageWrapper}>
                <img src={category1} alt="Women's Fashion"/>
            </div>
        <div className={styles.cardOverlay}>
            <h3>Women</h3>
            <p>Dresses, Co-ords & More</p>
            <span className={styles.shopBtn}>Explore Now</span>
        </div>
        </Link>
        <Link to="/men" className={styles.categoryCard}>
            <div className={styles.cardImageWrapper}>
                <img src={category2} alt="Men's Fashion"/>
            </div>
            <div className={styles.cardOverlay}>
                <h3>Men</h3>
                <p>Jackets, Tees & Denim</p>
                <span className={styles.shopBtn}>Explore Now</span>
            </div>
            </Link>


            <Link to="/kids" className={styles.categoryCard}>
                <div className={styles.cardImageWrapper}>
                    <img src={category3} alt="Kids' Fashion"/>
                </div>
                <div className={styles.cardOverlay}>
                <h3>Kids</h3>
                <p>Bright & Comfy Essentials</p>
                <span className={styles.shopBtn}>Explore Now</span>
                </div>
            </Link>
        </div>
        </section>
    </div>
  )
}

export default Category