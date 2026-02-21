import Link from "next/link";
import Button from "@/components/Button";
import DailyFeed from "@/components/DailyFeed";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Fresh. Natural. Organic.</h1>
          <p className={styles.heroText}>
            Experience the true taste of nature with our 100% organic products delivered straight to your doorstep.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/products">
              <Button style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>View Products</Button>
            </Link>
            <Link href="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
          <div className={styles.features}>
            <span className={styles.feature}>🍃 100% Organic</span>
            <span className={styles.feature}>🚚 Fast Delivery</span>
            <span className={styles.feature}>💵 Cash on Delivery</span>
          </div>
        </div>
      </section>

      {/* Daily Feed Section */}
      <DailyFeed />

      {/* Categories Section */}
      <section className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className={styles.grid}>
          <Link href="/products?category=vegetables" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>🥦</span>
            <h3 className={styles.categoryTitle}>Fresh Vegetables</h3>
          </Link>
          <Link href="/products?category=fruits" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>🍎</span>
            <h3 className={styles.categoryTitle}>Organic Fruits</h3>
          </Link>
          <Link href="/products?category=grains" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>🌾</span>
            <h3 className={styles.categoryTitle}>Grains & Pulses</h3>
          </Link>
          <Link href="/products?category=tableware" className={styles.categoryCard}>
            <img src="/images/categories/areca-leaf-plate.png" alt="Areca Leaf Plate" className={styles.categoryImage} />
            <h3 className={styles.categoryTitle}>Areca Leaf Plate</h3>
          </Link>
          <Link href="/products?category=oil" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>💧</span>
            <h3 className={styles.categoryTitle}>Natural Oils</h3>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`container ${styles.cta}`}>
        <h2 className={styles.ctaTitle}>Ready to Eat Healthy?</h2>
        <p className={styles.ctaText}>
          Join thousands of happy customers who trust Natural Plate for their daily organic needs.
        </p>
        <Link href="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </section>
    </>
  );
}
