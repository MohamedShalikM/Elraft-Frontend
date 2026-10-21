import React from 'react'
import styles from "../css/ColorSelector.module.css";

const ColorSelector = ({ colors, selected, onSelect }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dots}>
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            aria-label={color.name}
            title={color.name}
            className={`${styles.dot} ${selected.name === color.name ? styles.active : ""}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
      <span className={styles.label}>{selected.name}</span>
    </div>
  )
}

export default ColorSelector;