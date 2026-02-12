import { useState } from "react";
import styles from "../css/checkout.module.css";
import Navbar from './Navbar';
import Footer from './Footer';

const Checkout = () => {
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

  const subtotal = 98.0;
  const shipping = 8.0;
  const discount = giftApplied ? 10.0 : 0;
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
    if (giftCardCode.trim()) {
      setGiftApplied(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Checkout submitted:", formData);
      alert("Order placed successfully!");
    }
  };

  return (
    <>
    <Navbar/>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutHeader}>
          <div className={styles.logo}>Elraft - Fashion</div>
        </div>

        <div className={styles.checkoutMain}>
          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <div className={styles.productItem}>
              <div className={styles.productImage}>📱</div>
              <div className={styles.productDetails}>
                <div className={styles.productTitle}>iPhone 14 & case</div>
                <div className={styles.productPrice}>
                  ${subtotal.toFixed(2)}
                </div>
              </div>
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              {giftApplied && (
                <div className={`${styles.priceRow} ${styles.discountRow}`}>
                  <span>Gift Card</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.giftCardSection}>
              <div className={styles.giftCardInputWrapper}>
                <input
                  type="text"
                  placeholder="Gift card code"
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
            <button className={styles.shopButton}>Phone Pay</button>
            <button className={styles.paypalButton}>PayPal</button>
            <button className={styles.payButton}>G Pay</button>
          </div>

          {/* Contact & Shipping Form */}
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <div className={styles.formSection}>
              <h3>Contact Information</h3>
              <p className={styles.helpText}>How should we contact you?</p>

              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.email ? styles.error : ""}`}
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.half}`}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.firstName ? styles.error : ""}`}
                  />
                  {errors.firstName && (
                    <span className={styles.errorText}>{errors.firstName}</span>
                  )}
                </div>
                <div className={`${styles.formGroup} ${styles.half}`}>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.lastName ? styles.error : ""}`}
                  />
                  {errors.lastName && (
                    <span className={styles.errorText}>{errors.lastName}</span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>Shipping Address</h3>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.address ? styles.error : ""}`}
                />
                {errors.address && (
                  <span className={styles.errorText}>{errors.address}</span>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.half}`}>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.city ? styles.error : ""}`}
                  />
                  {errors.city && (
                    <span className={styles.errorText}>{errors.city}</span>
                  )}
                </div>
                <div className={`${styles.formGroup} ${styles.quarter}`}>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.quarter}`}>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.zipCode ? styles.error : ""}`}
                  />
                  {errors.zipCode && (
                    <span className={styles.errorText}>{errors.zipCode}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Continue to shipping
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Checkout;
