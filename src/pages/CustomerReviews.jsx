import styles from "../css/CustomerReviews.module.css";

const breakdown = [
  { star: 5, count: 2000 },
  { star: 4, count: 1000 },
  { star: 3, count: 500 },
  { star: 2, count: 200 },
  { star: 1, count: 0 },
];

const reviews = [
  {
    id: 1,
    name: "Shalik",
    image: "", 
    spend: 200,
    totalReviews: 14,
    rating: 5,
    date: "03-08-2026",
    text: "I ordered a size M and it fits like it was tailored for me. The stitching is clean, no loose threads, and the color hasn't faded after 2 washes. Got so many compliments already. Highly recommended!",
  },
    {
    id: 2,
    name: "Peter",
    image: "", 
    spend: 400,
    totalReviews: 4,
    rating: 4,
    date: "05-08-2026",
    text: "Product quality and fitting is really good. Fabric is soft and comfortable. Only reason for 4 stars is the delivery took 2 days extra. Otherwise perfect!",
  },
    {
    id: 3,
    name: "Jack",
    image: "", 
    spend: 350,
    totalReviews: 17,
    rating: 4,
    date: "06-08-2026",
    text: "Material is good, I liked it. But size chart is confusing. I ordered L but it feels like XL. Please improve size guide. Will exchange for smaller size.",
  },

];

const formatCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n);

const Stars = ({ rating }) => (
  <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={n <= rating ? styles.filled : styles.empty}>
        ★
      </span>
    ))}
  </span>
);

const CustomerReviews = () => {
  const maxCount = Math.max(...breakdown.map((b) => b.count));

  return (
    <section className={styles.CustomerReviews}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>Reviews</h2>
          <span className={styles.dateRange}>March 2026 - October 2026</span>
        </header>

        <div className={styles.details}>
          <div className={styles.stat}>
            <h3 className={styles.statLabel}>Total Reviews</h3>
            <div className={styles.statRow}>
              <span className={styles.statValue}>10.0k</span>
              <span className={styles.growth}>35% ↗</span>
            </div>
            <p className={styles.statNote}>Growth in reviews this year</p>
          </div>

          <div className={styles.stat}>
            <h3 className={styles.statLabel}>Average Rating</h3>
            <div className={styles.statRow}>
              <span className={styles.statValue}>4.0</span>
              <Stars rating={4} />
            </div>
            <p className={styles.statNote}>Average rating this year</p>
          </div>

          <ul className={styles.bars}>
            {breakdown.map((b) => (
              <li key={b.star} className={styles.barRow}>
                <span className={styles.barStar}>★ {b.star}</span>
                <span className={styles.track}>
                  <span
                    className={styles.fill}
                    style={{ width: `${(b.count / maxCount) * 100}%` }}
                  />
                </span>
                <span className={styles.barCount}>{formatCount(b.count)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.reviewList}>
          {reviews.map((r) => (
            <article key={r.id} className={styles.review}>
              <div className={styles.person}>
                {r.image ? (
                  <img className={styles.avatar} src={r.image} alt={r.name} />
                ) : (
                  <div className={styles.avatar}>
                    {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div>
                  <h4 className={styles.name}>{r.name}</h4>
                  <p className={styles.meta}>
                    Total Spend: <strong>₹{r.spend}</strong>
                  </p>
                  <p className={styles.meta}>
                    Total Reviews: <strong>{r.totalReviews}</strong>
                  </p>
                </div>
              </div>

              <div className={styles.reviewContent}>
                <div className={styles.reviewTop}>
                  <Stars rating={r.rating} />
                  <span className={styles.date}>{r.date}</span>
                </div>
                <p className={styles.text}>{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;