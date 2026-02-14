import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3>Natural Plate</h3>
                        <p>
                            Eco-Friendly & Biodegradable Plate Provider.
                            <br /><br />
                            We create and deliver sustainable, eco-friendly plates that replace harmful plastics with natural alternatives. Designed for cafés, events, homes, and restaurants, our plates are durable, safe, and biodegradable.
                        </p>
                    </div>
                    <div className={styles.column}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Products</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/order-tracking">Track Order</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3>Policies</h3>
                        <ul>
                            <li><Link href="/policies/shipping">Shipping Policy</Link></li>
                            <li><Link href="/policies/returns">Returns & Refunds</Link></li>
                            <li><Link href="/policies/privacy">Privacy Policy</Link></li>
                            <li><Link href="/policies/terms">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3>Contact</h3>
                        <ul>
                            <li>📞 +880 1716779220</li>
                            <li>✉️ support@naturalplate.com</li>
                            <li>📍 Dhaka, Bangladesh</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Natural Plate. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
