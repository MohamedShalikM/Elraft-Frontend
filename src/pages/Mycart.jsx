import { useCart } from "./CartContext.jsx";
import { Link } from 'react-router-dom';
import styles from '../css/mycart.module.css';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Checkout from "./Chekout.jsx";
function Mycart() {
  const { cart, updateQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className={styles.cartContainer}>
          <div className={styles.breadCrumbs}>
            <Link to="/" className={styles.link}>
              Home
            </Link>{" "}
            &gt; <span>Cart</span>
          </div>
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart!</p>
        </div>
        <Footer/>
      </>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );

  return (
    <>
      <Navbar />
      <div className={styles.cartContainer}>
        <div className={styles.breadCrumbs}>
          <Link to="/" className={styles.link}>
            Home
          </Link>{" "}
          &gt; <span>Cart</span>
        </div>

        <div className={styles.cartHeader}>
          <h1>My Cart ({cart.length} items)</h1>
          <p style={{ color: "#b71c43" }}>
            Total: ₹{total.toLocaleString("en-IN")}
          </p>
        </div>

        {cart.map((item) => (
          <div className={styles.cartItem} key={item.id}>
            <div className={styles.cartItem1}> 
            <img src={item.img} alt={item.name} />
            <div className={styles.itemDetails}>             
              <h3>{item.name}</h3>
              <p className={styles.price}>
                Price: ₹{item.price.toLocaleString("en-IN")}
              </p>
            </div>
            </div>
            

            <div className={styles.quantityControls}>
              <button
                className={styles.qtyBtn}
                onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
              >
                -
              </button>
              <span>{item.qty || 1}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
              >
                +
              </button>{" "}
              <p className={styles.totalPrice}>
                Total: ₹{(item.price * (item.qty || 1)).toLocaleString("en-IN")}
              </p>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        <div className={styles.breadCrumbscartFooter}>
          <Link to="/Checkout"> <button className={styles.checkoutBtn}>Proceed to Checkout</button></Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mycart;
