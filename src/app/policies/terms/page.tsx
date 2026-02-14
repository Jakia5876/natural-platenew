import styles from '../policies.module.css';

export default function TermsAndConditions() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Terms & Conditions</h1>
            <p className={styles.lastUpdated}>Last updated: October 2023</p>

            <div className={styles.content}>
                <h2>Agreement to Terms</h2>
                <p>By accessing or using the Natural Plate website, you agree to be bound by these Terms and Conditions.</p>

                <h2>Order Acceptance</h2>
                <p>We reserve the right to refuse or cancel any order for any reason, including product availability or errors in pricing.</p>

                <h2>Payment</h2>
                <p>Payment is due at the time of delivery (Cash on Delivery) unless otherwise agreed upon. All prices are in BDT.</p>

                <h2>Product Information</h2>
                <p>While we strive to be as accurate as possible, product images are for illustrative purposes and actual products (especially natural areca plates) may have slight variations in texture and color.</p>

                <h2>Limitation of Liability</h2>
                <p>Natural Plate shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our products or website.</p>
            </div>
        </div>
    );
}
