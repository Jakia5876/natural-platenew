import styles from '../policies.module.css';

export default function ShippingPolicy() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shipping Policy</h1>
            <p className={styles.lastUpdated}>Last updated: October 2023</p>

            <div className={styles.content}>
                <h2>Delivery Areas</h2>
                <p>We currently deliver to all major areas within Dhaka, Bangladesh. We are working on expanding our delivery network to other cities soon.</p>

                <h2>Shipping Times</h2>
                <ul>
                    <li><strong>Standard Delivery:</strong> 2-3 business days.</li>
                    <li><strong>Express Delivery:</strong> Same-day delivery for orders placed before 12:00 PM (Dhaka only).</li>
                </ul>

                <h2>Shipping Costs</h2>
                <p>Shipping costs are calculated at checkout based on your location and the total weight of your order.</p>

                <h2>Cash on Delivery (COD)</h2>
                <p>As per our primary payment method, we offer Cash on Delivery for all orders. Please ensure someone is available at the delivery address to receive the package and make the payment.</p>

                <h2>Order Tracking</h2>
                <p>Once your order is dispatched, you can track its status using your Order ID on our website's <a href="/order-tracking" style={{ color: 'var(--primary-green)' }}>Tracking Page</a>.</p>
            </div>
        </div>
    );
}
