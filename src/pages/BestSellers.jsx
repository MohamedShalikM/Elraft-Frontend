import React, { useState } from 'react'
import styles from "../css/BestSellers.module.css";
import Carousal1 from "../assets/Carousal1.webp";
import bs1yellow from "../assets/BestSeller1yellow.webp";
import bs1blue from "../assets/BestSeller1blue.webp";
import bs1red from "../assets/BestSeller1red.webp";
import bs2black from "../assets/BestSeller2black.webp";
import bs2blue from "../assets/BestSeller2blue.webp";
import bs2gray from "../assets/BestSeller2gray.webp";
import bs3blue from "../assets/BestSeller3blue.webp";
import bs3red from "../assets/BestSeller3red.webp";
import bs3green from "../assets/BestSeller3green.webp";
import ColorSelector from './ColorSelector';
import promoBanner from "../assets/PromoBanner1.webp";
import promoBanner2 from "../assets/PromoBanner2.webp";

// replace names, prices, ratings and images with your real data
const products = [
  {
    id: 1,
    name: "JACK&JONES - Icon Logo Crew-Neck Tee",
    rating: 4.8,
    reviews: "1.2k",
    price: 250,
    originalPrice:  999 ,
    colors: [
      { name: "Yellow", hex: "#FFFF00", image: bs1yellow },
      { name: "Blue", hex: "#0000FF", image: bs1blue },
      { name: "Red", hex: "#FF0000", image: bs1red },
    ],
  },
  {
    id: 2,
    name: "Denim Works - Light Wash Oversized Denim Shirt",
    rating: 4.7,
    reviews: "980",
    price: 1499,
    originalPrice: 2499,
    colors: [
      { name: "Black", hex: "#111111", image: bs2black },
      { name: "Gray", hex: "#808080", image: bs2gray },
      { name: "Blue", hex: "#0000FF", image: bs2blue },
    ],
  },
  {
    id: 3,
    name: "The Noir - Men's Double-Breasted Pinstripe Blazer",
    rating: 4.6,
    reviews: "760",
    price: 1999,
    originalPrice: 3499,
    colors: [
      { name: "Blue", hex: "#0000FF", image: bs3blue },
      { name: "Green", hex: "#008000", image: bs3green },
      { name: "Red", hex: "#FF0000", image: bs3red },
    ],
  },
];

const ProductCard = ({ product, rank }) => {
  const [selected, setSelected] = useState(product.colors[0]);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <span className={styles.rank}>#{rank} BESTSELLER</span>
        {/* <span className={styles.badge}>{discount}% OFF</span> */}
        <img
          key={selected.name}
          className={styles.fade}
          src={selected.image}
          alt={`${product.name} in ${selected.name}`}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.rating}>
          <span className={styles.stars}>★</span>
          <strong>{product.rating}</strong>
          <span className={styles.reviews}>({product.reviews} reviews)</span>
        </div>
        <p className={styles.price}>
          <span className={styles.now}>₹{product.price}</span>
          <span className={styles.dashed}>₹{product.originalPrice}</span>
        </p>
        <ColorSelector
          colors={product.colors}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </article>
  );
};

const BestSellers = () => {
  return (
    <section className={styles.BestSellers}>
      <p className={styles.eyebrow}>/ TOP RATED THIS WEEK</p>
      <h2 className={styles.title}>
        BEST<span>SELLERS</span>
      </h2>
      <p className={styles.desc}>
        Most-wanted fits. Rated, re-stocked, and running out fast.
      </p>

      <div className={styles.grid}>
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} rank={i + 1} />
        ))}
      </div>

      <div className={styles.promoBanner}>
        <img className={styles.promo1} src={promoBanner} alt="promoBanner" />
        <img className={styles.promo2} src={promoBanner2} alt="promoBanner2" />
      </div>
    </section>
  )
}

export default BestSellers;