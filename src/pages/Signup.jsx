import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import styles from "../css/signup.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Signup() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [errors, setErrors] = useState({}); // Uncommented and fixed
  const [isLoading, setIsLoading] = useState(false); // Uncommented
  const [serverError, setServerError] = useState(""); // New: server errors
  const navigate = useNavigate(); // Uncommented for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear field error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setServerError(""); // Clear server error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Valid 10-digit phone required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateForm()) return;

    setIsLoading(true);
    try {
       const res = await fetch(`${API_URL}/api/auth/login`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
       });

      const data = await res.json();

      if (!res.ok) {
        // Handle server errors (e.g., duplicate email)
        setServerError(data.message || "Signup failed. Try again.");
        return;
      }

      alert(data.message || "Signup successful!");
      // Reset form or navigate
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",
      });
      navigate("/login"); // Redirect to login after success
    } catch (error) {
      setServerError("Network error. Check if backend is running.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.signupPage}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <h1 className={styles.title}>Join Raftel Fashion</h1>
            <p className={styles.subtitle}>
              Create your account for exclusive styles
            </p>
            {serverError && (
              <div className={styles.serverError}>{serverError}</div>
            )}{" "}
            {/* New: server error display */}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name} // Added value prop
                  onChange={handleChange}
                  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} // Dynamic class
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (8+ chars)"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.errorInput : ""}`}
                />
                {errors.password && (
                  <span className={styles.error}>{errors.password}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.confirmPassword ? styles.errorInput : ""}`}
                />
                {errors.confirmPassword && (
                  <span className={styles.error}>{errors.confirmPassword}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.address ? styles.errorInput : ""}`}
                />
                {errors.address && (
                  <span className={styles.error}>{errors.address}</span>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitBtn}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>
            <div className={styles.loginLink}>
              Already have an account?{" "}
              <Link to="/login" className={styles.link}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
