import styles from '../policies.module.css';

export default function ReturnsPolicy() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Returns & Refunds</h1>
            <p className={styles.lastUpdated}>Last updated: October 2023</p>

            <div className={styles.content}>
                <h2>Our Guarantee</h2>
                <p>At Natural Plate, we take pride in the quality of our eco-friendly products. If you receive a damaged or incorrect item, we are here to help.</p>

                <h2>Eligibility for Returns</h2>
                <ul>
                    <li>Requests for returns must be made within 24 hours of receiving your order.</li>
                    <li>Items must be unused and in the same condition that you received them.</li>
                    <li>Items must be in their original packaging.</li>
                </ul>

                <h2>Process for Returns</h2>
                <p>To initiate a return, please contact our support team via phone at <strong>+880 1716779220</strong> or email us at <strong>support@naturalplate.com</strong> with your Order ID and a photo of the item.</p>

                <h2>Refunds</h2>
                <p>Since we primarily operate with Cash on Delivery, refunds for returned items will be processed via mobile banking (Bkash/Nagad) or as store credit for your next purchase, once the returned item is inspected.</p>

                <h2>Non-Returnable Items</h2>
                <p>Fresh organic produce (vegetables and fruits) cannot be returned once the delivery is accepted, due to their perishable nature.</p>
            </div>
        </div>
    );
}
