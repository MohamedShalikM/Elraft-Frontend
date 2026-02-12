import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import styles from "../css/products.module.css";
import { Link } from 'react-router-dom';

import men1 from "../assets/men1.webp";
import men2 from "../assets/men2.webp";
import men3 from "../assets/men3.webp";
import men4 from "../assets/men4.webp";
import men6 from "../assets/men6.avif";
import men7 from "../assets/men7.avif";
import men8 from "../assets/men8.avif";
import men9 from "../assets/men9.avif";
import men10 from "../assets/men10.avif";
import men11 from "../assets/men11.avif";
import men12 from "../assets/men12.avif";
import men13 from "../assets/men13.avif";
import arr1 from "../assets/arr1.avif";
import arr2 from "../assets/arr2.avif";
import arr4 from "../assets/arr4.avif";
import Navbar from "./Navbar";
import Footer from "./Footer";


const mensTopwear = [
  { id: 1, name: "Slim Fit Shirt", price: 1299, img: men1 },
  { id: 2, name: "Polo T-Shirt", price: 899, img: men2 },
  { id: 3, name: "Crew Neck T-Shirt", price: 749, img: men3 },
  { id: 4, name: "Denim Shirt", price: 1599, img: men4 },
  { id: 5, name: "Solid Shirt", price: 380, img: arr1 },
  { id: 6, name: "Blazer", price: 2000, img: arr2 },
  { id: 7, name: "Oversized Hoodie", price: 800, img: arr4}
];

const mensBottomwear = [
  { id: 8, name: "Slim Jeans", price: 1999, img: men6 },
  { id: 9, name: "Cargo Pants", price: 1599, img: men7 },
  { id: 10, name: "Chinos", price: 1399, img: men8 },
  { id: 11, name: "Joggers", price: 1099, img: men9 }
];

const mensFootwear = [
  { id: 12, name: "Sports Running Shoes", price: 1299, img: men11 },
  { id: 13, name: "Casual Sneakers", price: 999, img: men12 },
  { id: 14, name: "Leather Loafers", price: 1899, img: men10 },
  { id: 15, name: "Mesh Walking Shoes", price: 799, img: men13 }
];

const productMap = {
  topwear: mensTopwear,
  bottomwear: mensBottomwear,
  footwear: mensFootwear
};

export default function Men() {
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
      <Navbar/>

        <div className={styles.pageHeader}>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> &gt; <span>Men</span>
        </div>

        <div className={styles.filters}>
          <select className={styles.select} onChange={(e) => setSort(e.target.value)}>
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
              <button onClick={() => {addToCart(product);
              alert(`${product.name} is added to cart!`);}}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>

      <Footer/>
    </>
  );
}
 