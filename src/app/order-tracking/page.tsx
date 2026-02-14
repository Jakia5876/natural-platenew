'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import styles from './page.module.css';

const MOCK_ORDERS: Record<string, any> = {
    'NP-1001': {
        status: 'Delivered',
        step: 4,
        date: 'Oct 12, 2023',
        history: [
            { label: 'Order Placed', date: 'Oct 10, 2023', completed: true },
            { label: 'Processing', date: 'Oct 10, 2023', completed: true },
            { label: 'Shipped', date: 'Oct 11, 2023', completed: true },
            { label: 'Out for Delivery', date: 'Oct 12, 2023', completed: true },
            { label: 'Delivered', date: 'Oct 12, 2023', completed: true },
        ]
    },
    'NP-1002': {
        status: 'Shipped',
        step: 2,
        date: 'Arriving by Oct 15',
        history: [
            { label: 'Order Placed', date: 'Oct 12, 2023', completed: true },
            { label: 'Processing', date: 'Oct 13, 2023', completed: true },
            { label: 'Shipped', date: 'Oct 14, 2023', completed: true },
            { label: 'Out for Delivery', date: 'Pending', completed: false },
            { label: 'Delivered', date: 'Pending', completed: false },
        ]
    },
    'NP-1003': {
        status: 'Processing',
        step: 1,
        date: 'Expected Oct 18',
        history: [
            { label: 'Order Placed', date: 'Oct 14, 2023', completed: true },
            { label: 'Processing', date: 'Oct 14, 2023', completed: true },
            { label: 'Shipped', date: 'Pending', completed: false },
            { label: 'Out for Delivery', date: 'Pending', completed: false },
            { label: 'Delivered', date: 'Pending', completed: false },
        ]
    }
};

export default function OrderTracking() {
    const [orderId, setOrderId] = useState('');
    const [foundOrder, setFoundOrder] = useState<any>(null);
    const [error, setError] = useState('');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        const order = MOCK_ORDERS[orderId.toUpperCase()];
        if (order) {
            setFoundOrder(order);
            setError('');
        } else {
            setFoundOrder(null);
            setError('Order ID not found. Please check and try again.');
        }
    };

    return (
        <div className={styles.container}>
            <section className={styles.searchSection}>
                <h1 className={styles.title}>Track Your Order</h1>
                <p>Enter your Order ID (e.g., NP-1002) to see where your package is.</p>
                <form onSubmit={handleTrack} className={styles.searchBox}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter Order ID (NP-XXXX)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                    <Button type="submit">Track</Button>
                </form>
                {error && <p style={{ color: '#e74c3c', marginTop: '1rem' }}>{error}</p>}
            </section>

            {foundOrder && (
                <section className={styles.trackingSection}>
                    <div className={styles.orderHeader}>
                        <div>
                            <span className={styles.orderId}>{orderId.toUpperCase()}</span>
                            <p style={{ marginTop: '0.5rem', color: '#666' }}>{foundOrder.date}</p>
                        </div>
                        <div className={styles.statusBadge}>{foundOrder.status}</div>
                    </div>

                    <div className={styles.timeline}>
                        <div
                            className={styles.progressLine}
                            style={{ width: `${(foundOrder.step / 4) * 100}%` }}
                        ></div>
                        {foundOrder.history.map((h: any, index: number) => (
                            <div
                                key={index}
                                className={`${styles.step} ${index <= foundOrder.step ? styles.completed : ''} ${index === foundOrder.step ? styles.active : ''}`}
                            >
                                <div className={styles.dot}>
                                    {index < foundOrder.step ? '✓' : index + 1}
                                </div>
                                <div className={styles.stepLabel}>{h.label}</div>
                                <div className={styles.stepDate}>{h.date}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {!foundOrder && !error && (
                <div style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
                    <p>Sample Order IDs for testing: <strong>NP-1001</strong>, <strong>NP-1002</strong>, <strong>NP-1003</strong></p>
                </div>
            )}
        </div>
    );
}
