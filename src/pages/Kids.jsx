import React, { useEffect, useState } from "react";
import styles from "../css/products.module.css";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";


/* icons */
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";

/* girls dresses */
import kids1 from "../assets/kids1.avif";
import kids2 from "../assets/kids2.avif";
import kids3 from "../assets/kids3.avif";
import kids4 from "../assets/kids4.avif";

/* boys dresses */
import kids5 from "../assets/kids5.avif";
import kids6 from "../assets/kids6.avif";
import kids7 from "../assets/kids7.avif";
import kids8 from "../assets/kids8.avif";

/* footwear */
import kids9 from "../assets/kids9.avif";
import kids10 from "../assets/kids10.avif";
import kids11 from "../assets/kids11.avif";
import kids12 from "../assets/kids12.avif";
import Footer from "./Footer";
import Navbar from "./Navbar";

const girlsDresses = [
  { id: 45, name: "Party Frocks", price: 999, img: kids1 },
  { id: 46, name: "Floral Dress", price: 799, img: kids2 },
  { id: 47, name: "Birthday Gown", price: 1299, img: kids3 },
  { id: 48, name: "Printed Frock", price: 699, img: kids4 },
];

const boysDresses = [
  { id: 49, name: "Kurta Set", price: 899, img: kids5 },
  { id: 50, name: "Sherwani", price: 1299, img: kids6 },
  { id: 51, name: "Ethnic Shirt", price: 699, img: kids7 },
  { id: 52, name: "Formal Suit", price: 1499, img: kids8 },
];

const kidsFootwear = [
  { id: 53, name: "Sparkly Sandals", price: 599, img: kids9 },
  { id: 54, name: "Ballet Flats", price: 699, img: kids10 },
  { id: 57, name: "Sports Sneakers", price: 699, img: kids11 },
  { id: 58, name: "School Shoes", price: 799, img: kids12 },
];

const productMap = {
  topwear: girlsDresses,
  bottomwear: boysDresses,
  footwear: kidsFootwear,
};

const categoryTitles = {
  topwear: "Girls Dresses",
  bottomwear: "Boys Dresses",
  footwear: "Footwear",
};

export default function Kids() {
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
          <Link to="/">Home</Link> &gt; <span>Kids</span>
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
            {Object.keys(productMap).map((key) => (
              <button
                key={key}
                className={`tab ${category === key ? styles.active : ""}`}
                onClick={() => setCategory(key)}
              >
                {categoryTitles[key]}
              </button>
            ))}
          </div>

          <span className={styles.results}>{products.length} Results</span>
        </div>
      </div>

      <main>
        <h1 className={styles.mainh1}>{categoryTitles[category]}</h1>

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
