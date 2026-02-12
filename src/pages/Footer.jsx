import React from 'react'
import {Link} from 'react-router-dom';
import styles from '../css/footer.module.css';
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
const Footer = () => {
  return (
    <>
    <footer className={styles.elraftFooter}>
              <div className={styles.footerInner}>
                <div className={styles.footerBrand}>
                  <h2>ElRaft</h2>
                  <p>Fashion that fits your everyday story.</p>
                </div>
    
                <div className={styles.footerLinks}>
                  <div className={styles.col}>
                    <h4>Shop</h4>
                    <Link to="/women">Women</Link>
                    <Link to="/men">Men</Link>
                    <Link to="/kids">Kids</Link>
                  </div>
    
                  <div className={styles.col}>
                    <h4>Help</h4>
                    <Link to="#">Contact</Link>
                    <Link to="#">Returns</Link>
                    <Link to="#">Shipping</Link>
                    <Link to="#">FAQ</Link>
                  </div>
    
                  <div className={styles.col}>
                    <h4>Follow</h4>
                    <div className={styles.socialRow}>
                      <Link  to="#">
                        <img src={instagram} alt="instagram" />
                      </Link>
                      <Link  to="#">
                        <img src={facebook} alt="facebook" />
                      </Link>                
                      <Link  to="#">
                        <img src={twitter} alt="twitter" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className={styles.footerBottom}>
                <p>© 2025 ElRaft. All rights reserved.</p>
              </div>
            </footer>
    </>
  )
}

export default Footer