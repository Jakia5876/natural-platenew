import styles from '../policies.module.css';

export default function PrivacyPolicy() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last updated: October 2023</p>

            <div className={styles.content}>
                <h2>Information We Collect</h2>
                <p>We collect information you provide directly to us when you create an account, place an order, or communicate with us. This may include your name, email address, phone number, and delivery address.</p>

                <h2>How We Use Your Information</h2>
                <ul>
                    <li>To process and deliver your orders.</li>
                    <li>To communicate with you about your account or orders.</li>
                    <li>To improve our products and services.</li>
                    <li>To comply with legal obligations.</li>
                </ul>

                <h2>Data Security</h2>
                <p>We take reasonable measures to protect your personal information from loss, theft, and unauthorized access.</p>

                <h2>Cookies</h2>
                <p>Our website uses cookies to enhance your browsing experience and remember items in your shopping cart.</p>
            </div>
        </div>
    );
}
