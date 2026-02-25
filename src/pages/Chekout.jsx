import { useCart } from "./CartContext.jsx"; // Add cart context
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/checkout.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PhonePay from '../assets/phonepay.webp';
import Gpay from '../assets/gpay.webp';
import AmazonPay from '../assets/amazon-pay-icon.webp'
import PayTM from '../assets/paytm-icon.webp';

const Checkout = () => {
  const { cart } = useCart(); // Get real cart data
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [giftCardCode, setGiftCardCode] = useState("");
  const [errors, setErrors] = useState({});
  const [giftApplied, setGiftApplied] = useState(false);

  // DYNAMIC CALCULATIONS from real cart
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );
  const shipping = subtotal > 500 ? 0 : 80; // Free shipping over ₹500
  const discount = giftApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGiftCardApply = () => {
    if (giftCardCode.trim() === "SAVE10") {
      // Demo code
      setGiftApplied(true);
    } else {
      alert("Invalid gift card code. Try 'SAVE10'");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && cart.length > 0) {
      // Simulate order success
      console.log("Order submitted:", { formData, cart, total });
      alert(
        `Order placed successfully! Total: ₹${total.toLocaleString("en-IN")}`,
      );
      navigate("/"); // Redirect to home
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Cart is empty</h2>
          <p>
            Go back to <a href="/">shopping</a>
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutHeader}>
          <div className={styles.logo}>Elraft - Fashion</div>
        </div>

        <div className={styles.checkoutMain}>
          {/* Order Summary - REAL CART DATA */}
          <div className={styles.orderSummary}>
            {cart.map((item) => (
              <div className={styles.productItem} key={item.id}>
                <div className={styles.productImage}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productTitle}>{item.name}</div>
                  <div className={styles.productPrice}>
                    ₹{(item.price * (item.qty || 1)).toLocaleString("en-IN")} x{" "}
                    {item.qty || 1}
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>
              {giftApplied && (
                <div className={`${styles.priceRow} ${styles.discountRow}`}>
                  <span>Gift Card (SAVE10)</span>
                  <span>-₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className={styles.totalRow}>
                <span>
                  <strong>Total</strong>
                </span>
                <span>
                  <strong>₹{total.toLocaleString("en-IN")}</strong>
                </span>
              </div>
            </div>

            <div className={styles.giftCardSection}>
              <div className={styles.giftCardInputWrapper}>
                <input
                  type="text"
                  placeholder="Enter gift card code (SAVE10)"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  className={styles.giftCardInput}
                />
                <button
                  onClick={handleGiftCardApply}
                  className={styles.applyButton}
                  disabled={!giftCardCode.trim()}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className={styles.paymentButtons}>
            <button
              className={`${styles.payButton} ${styles.phonepe}`}
              onClick={() => handlePayment("phonepe")}
            >
              <img src={PhonePay} alt="PhonePe" /> PhonePe
            </button>
            <button
              className={`${styles.payButton} ${styles.gpay}`}
              onClick={() => handlePayment("gpay")}
            >
              <img src={Gpay} alt="GPay" /> GPay
            </button>
            <button
              className={`${styles.payButton} ${styles.amazonpay}`}
              onClick={() => handlePayment("amazonpay")}
            >
              <img src={AmazonPay} alt="Amazon Pay" /> Amazon Pay
            </button>
            <button
              className={`${styles.payButton} ${styles.paytm}`}
              onClick={() => handlePayment("paytm")}
            >
              <img src={PayTM} alt="Paytm" /> Paytm
            </button>
          </div>

          {/* Contact & Shipping Form */}
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            {/* Your existing form code stays the same */}
            <div className={styles.formSection}>
              <h3>Contact Information</h3>
              <p className={styles.helpText}>How should we contact you?</p>
              {/* ... rest of your form code ... */}
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.phone ? styles.error : ""}`}
                />
                {errors.phone && (
                  <span className={styles.errorText}>{errors.phone}</span>
                )}
              </div>
              {/* Continue with your existing form fields... */}
            </div>
            <button type="submit" className={styles.submitButton}>
              Place Order (₹{total.toLocaleString("en-IN")})
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
