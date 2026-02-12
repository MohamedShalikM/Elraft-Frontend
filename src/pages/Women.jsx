import React, { useEffect, useState } from "react";
import styles from "../css/products.module.css";
import {Link} from 'react-router-dom';
import { useCart } from "./CartContext";
/* icons */
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";

/* topwear */
import women1 from "../assets/women1.avif";
import women2 from "../assets/women2.avif";
import women3 from "../assets/women3.avif";
import women4 from "../assets/women4.avif";
import arr3 from "../assets/arr3.avif";

/* bottomwear */
import women5 from "../assets/women5.avif";
import women6 from "../assets/women6.avif";
import women7 from "../assets/women7.avif";
import women8 from "../assets/women8.avif";

/* footwear */
import women9 from "../assets/women9.avif";
import women10 from "../assets/women10.avif";
import women11 from "../assets/women11.avif";
import women12 from "../assets/women12.avif";
import Footer from "./Footer";
import Navbar from "./Navbar";

 

const womenTopwear = [
  { id: 12, name: "Floral Blouse", price: 1199, img: women1 },
  { id: 13, name: "Satin Crop Top", price: 899, img: women2 },
  { id: 14, name: "Off-Shoulder Top", price: 999, img: women3 },
  { id: 15, name: "Silk Shirt", price: 1599, img: women4 },
  { id: 16, name: "Floral Shrug", price: 1800, img: arr3 },
];

const womenBottomwear = [
  { id: 17, name: "High Waist Jeans", price: 1799, img: women5 },
  { id: 18, name: "Palazzo Pants", price: 1399, img: women6 },
  { id: 19, name: "Midi Skirt", price: 1299, img: women7 },
  { id: 20, name: "Leggings", price: 799, img: women8 },
];

const womenFootwear = [
  { id: 25, name: "Heeled Sandals", price: 1399, img: women9 },
  { id: 26, name: "Block Heel Pumps", price: 1699, img: women10 },
  { id: 27, name: "Wedge Espadrilles", price: 1199, img: women11 },
  { id: 28, name: "Flat Ballet Shoes", price: 899, img: women12 },
];

const productMap = {
  topwear: womenTopwear,
  bottomwear: womenBottomwear,
  footwear: womenFootwear,
};

export default function Women() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("topwear");
  const [products, setProducts] = useState(productMap.topwear);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let list = [...productMap[category]];

    if (sort === "low-high") list.sort((a, b) => a.price - b.price);
    if (sort === "high-low") list.sort((a, b) => b.price - a.price);
    if (sort === "new") list.sort((a, b) => b.id - a.id);

    setProducts(list);
  }, [category, sort]);

  return (
    <>
      <Navbar />

      <div className={styles.pageHeader}>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> &gt; <span>Women</span>
        </div>

        <div className={styles.filters}>
          <select
            className={styles.select}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort by: Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="new">New Arrivals</option>
          </select>

          <div className={styles.categoryTabs}>
            {["topwear", "bottomwear", "footwear"].map((cat) => (
              <button
                key={cat}
                className={`tab ${category === cat ? styles.active : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <span className={styles.results}>{products.length} Results</span>
        </div>
      </div>

      <main>
        <h1 className={styles.mainh1}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>

        <div className={styles.productContainer}>
          {products.map((product) => (
            <div className={styles.productCard} key={product.id}>
              <img src={product.img} alt={product.name} loading="lazy" />
              <h1>{product.name}</h1>
              <span>₹{product.price.toLocaleString("en-IN")}</span>
              <button
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} is added to cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
