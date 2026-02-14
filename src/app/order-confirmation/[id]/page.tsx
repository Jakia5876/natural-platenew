import Link from 'next/link';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
    return (
        <div className={styles.container}>
            <div className={styles.successIcon}>
                ✓
            </div>

            <h1 className={styles.title}>Order Placed Successfully!</h1>
            <p className={styles.message}>
                Thank you for shopping with Natural Plate. Your order <strong style={{ color: 'var(--text-gray)' }}>#{params.id}</strong> has been received.
            </p>

            <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>What's Next?</h3>
                <ul className={styles.infoList}>
                    <li className={styles.infoItem}>
                        <span>📞</span> We will call you shortly to confirm your order.
                    </li>
                    <li className={styles.infoItem}>
                        <span>📦</span> Once confirmed, we will pack your natural goodies.
                    </li>
                    <li className={styles.infoItem}>
                        <span>🚚</span> You will pay <strong>Cash on Delivery</strong> when the rider arrives.
                    </li>
                </ul>
            </div>

            <div className={styles.actions}>
                <Link href="/products">
                    <Button>Browse More</Button>
                </Link>
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
        </div>
    );
}
