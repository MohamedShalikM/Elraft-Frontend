import { Link } from 'react-router-dom';
import styles from "../css/CTA.module.css";

export default function CTAButton({ children, to, href, variant = 'primary', ...props }) {
  // combine base + variant from module
  const className = `${styles.ctaBtn} ${styles[variant] || ''}`;

  if (href) {
    return <a href={href} className={className} {...props}>{children}</a>;
  }

  if (to) {
    return <Link to={to} className={className} {...props}>{children}</Link>;
  }

  return <button className={className} {...props}>{children}</button>;
}