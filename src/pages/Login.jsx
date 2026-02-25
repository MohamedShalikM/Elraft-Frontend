import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import styles from "../css/login.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
 import.meta.env;
export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
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
        setServerError(data.message || "Invalid credentials");
        return;
      }
      // navigate("/");     

      // Success: Store token/user (use localStorage or Context/Redux)
      localStorage.setItem("token", data.token); // Assuming backend sends JWT token
      localStorage.setItem("user", JSON.stringify(data.user));
      // console.log("Logged in user:", data.user);

      // Redirect to dashboard/home
      sessionStorage.setItem("showLoginToast", "true");
      navigate("/"); 
      // Or wherever your protected route is
    } catch (error) {
      setServerError("Network error. Check backend connection.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.loginPage}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <h1 className={styles.title}>Welcome</h1>
            <p className={styles.subtitle}>
              Sign in to your Raftel Fashion account
            </p>
            {serverError && (
              <div className={styles.serverError}>{serverError}</div>
            )}
            <form
              onSubmit={handleSubmit}
              className={styles.form}
              autoComplete="on"
            >
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={formData.email} // Added value
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={formData.password} // Added value
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.errorInput : ""}`}
                />
                {errors.password && (
                  <span className={styles.error}>{errors.password}</span>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitBtn}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <div className={styles.signupLink}>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.link}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
