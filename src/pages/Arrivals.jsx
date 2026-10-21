import styles from "../css/Arrivals.module.css";
import carousal1 from "../assets/Carousal1.webp";
import carousal2 from "../assets/Carousal2.webp";
import carousal3 from "../assets/Carousal3.webp";
import carousal4 from "../assets/Carousal4.webp";
import carousal5 from "../assets/Carousal5.webp";
import carousal6 from "../assets/Carousal6.webp";
import carousal7 from "../assets/Carousal7.webp";
import carousal8 from "../assets/Carousal8.webp";
import arrowBackward from "../assets/arrowBackward.svg";
import arrowForward from "../assets/arrowForward.svg";
import { useState, useEffect, useRef, useCallback } from "react";

const products = [
  { id: 1, image: carousal1, title: "Noir Luxe - Women's Faux Leather Moto Jacket", price: "₹2,499", mrp: "₹4,499" },
  { id: 2, image: carousal2, title: "Aspen Longline Wool-Blend Overcoat For Women", price: "₹2,999", mrp: "₹5,999" },
  { id: 3, image: carousal3, title: "Jurassic Park Vintage Washed Graphic Oversized Tee", price: "₹799", mrp: "₹1,299" },
  { id: 4, image: carousal4, title: "Cloud Grey Essential Oversized Hoodie - Unisex", price: "₹1,299", mrp: "₹2,199" },
  { id: 5, image: carousal5, title: "Midnight Colorblock - Dual-Tone Hoodie", price: "₹1,399", mrp: "₹2,399" },
  { id: 6, image: carousal6, title: "Onyx Black Satin Party Shirt For Men - Slim Fit", price: "₹1,199", mrp: "₹1,999" },
  { id: 7, image: carousal7, title: "Indigo Wash Straight-Fit Denim Jeans For Men", price: "₹1,499", mrp: "₹2,699" },
  { id: 8, image: carousal8, title: "Raven - Men's Faux Leather Racer Jacket", price: "₹2,799", mrp: "₹4,999" },
];

const Arrivals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState(290);   // card width + gap (measured)
  const [visible, setVisible] = useState(3); // cards visible at once (measured)

  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const maxIndex = Math.max(products.length - visible, 0);

  // Measure card width + gap, and how many cards fit in the viewport
  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    // CSS Modules hash class names, so '.products' won't match.
    // firstElementChild always works.
    const card = track.firstElementChild;
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const newStep = card.offsetWidth + gap;

    setStep(newStep);
    setVisible(Math.max(1, Math.floor((viewport.offsetWidth + gap) / newStep)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  // Clamp so a resize never leaves the track past the last card
  const safeIndex = Math.min(currentIndex, maxIndex);

  return (
    <div className={styles.arrivalsDiv}>
      <section className={styles.title}>
        <h2>NEW ARRIVALS</h2>
        <p className={styles.desc}>Style That Moves With You.</p>
        <p>Just landed and already trending. Be the first to wear it.</p>
        <a href="">
          <button className={styles.linkBtn}>
            <h3>Shop Now </h3>
            <img src={arrowForward} alt="arrowForward" />
          </button>
        </a>
      </section>

      <section className={styles.carousalViewport} ref={viewportRef}>
        <div
          className={styles.carousalTrack}
          ref={trackRef}
          style={{ transform: `translateX(-${safeIndex * step}px)` }}
        >
          {products.map((product) => (
            <div className={styles.products} key={product.id}>
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>
                {product.price}
                <span>{product.mrp}</span>
              </p>
            </div>
          ))}
        </div>

        <div className={styles.handlerBtns}>
          <button className={styles.arrowBtn} onClick={prevSlide} aria-label="Previous">
            <img src={arrowBackward} alt="" />
          </button>
          <button className={styles.arrowBtn} onClick={nextSlide} aria-label="Next">
            <img src={arrowForward} alt="" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Arrivals;