import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>About Natural Plate</h1>
                <p className={styles.subtitle}>Eco-Friendly & Biodegradable Plate Provider</p>
            </section>

            <section className={styles.content}>
                <p style={{ marginBottom: '1.5rem' }}>
                    We create and deliver sustainable, eco-friendly plates that replace harmful plastics with natural alternatives.
                    Designed for cafés, events, homes, and restaurants, our plates are durable, safe, and biodegradable —
                    helping you enjoy every meal while protecting the planet.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    Whether it’s a small gathering or a large celebration, Nature Plates offers eco-conscious solutions that
                    combine strength, style, and sustainability. Every product is crafted to ensure quality, hygiene, and environmental safety.
                </p>
                <p style={{ fontWeight: '600', color: 'var(--primary-green)', fontSize: '1.2rem' }}>
                    Eco-friendly plates delivered fresh to your doorstep — anytime, anywhere.
                </p>
            </section>

            <section className={styles.grid}>
                <div className={styles.card}>
                    <span className={styles.icon}>🌿</span>
                    <h3 className={styles.cardTitle}>100% Natural</h3>
                    <p>Made from naturally fallen Areca palm leaves. No chemicals or additives.</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.icon}>♻️</span>
                    <h3 className={styles.cardTitle}>Biodegradable</h3>
                    <p>Composts naturally within weeks, returning nutrients to the soil.</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.icon}>🍽️</span>
                    <h3 className={styles.cardTitle}>Durable & Safe</h3>
                    <p>Microwave and refrigerator safe. Sturdy enough for any meal.</p>
                </div>
            </section>
        </div>
    );
}
