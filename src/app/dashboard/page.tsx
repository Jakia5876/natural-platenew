'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from './page.module.css';

const MOCK_USER = {
    name: 'Alim Uddin',
    email: 'alim@example.com',
    memberSince: 'October 2023',
    orders: [
        { id: 'NP-1001', date: 'Oct 12, 2023', total: 1250, items: 3, status: 'Delivered' },
        { id: 'NP-1002', date: 'Oct 14, 2023', total: 650, items: 1, status: 'Shipped' },
        { id: 'NP-1003', date: 'Oct 15, 2023', total: 2100, items: 4, status: 'Processing' },
    ]
};

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('orders');

    return (
        <div className={styles.container}>
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <div className={styles.userSummary}>
                    <div className={styles.avatar}>AU</div>
                    <h3 className={styles.userName}>{MOCK_USER.name}</h3>
                    <p className={styles.userEmail}>{MOCK_USER.email}</p>
                </div>
                <nav className={styles.nav}>
                    <div
                        className={`${styles.navItem} ${activeTab === 'orders' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        📦 My Orders
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === 'profile' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Profile Settings
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === 'address' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('address')}
                    >
                        📍 Shipping Address
                    </div>
                    <Link href="/" className={styles.navItem} style={{ borderTop: '1px solid #eee', marginTop: '1rem' }}>
                        🚪 Logout
                    </Link>
                </nav>
            </aside>

            {/* Main Dynamic Content */}
            <main className={styles.content}>
                {activeTab === 'orders' && (
                    <section>
                        <h2 className={styles.sectionTitle}>Recent Orders</h2>
                        {MOCK_USER.orders.map(order => (
                            <div key={order.id} className={styles.orderCard}>
                                <div className={styles.orderInfo}>
                                    <h4>Order #{order.id}</h4>
                                    <div className={styles.orderMeta}>
                                        <span>📅 {order.date}</span>
                                        <span>🛍️ {order.items} Items</span>
                                        <span style={{ fontWeight: 'bold', color: 'var(--dark-green)' }}>৳{order.total}</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className={`${styles.status} ${order.status === 'Delivered' ? styles.statusDelivered : ''}`}>
                                        {order.status}
                                    </span>
                                    <div style={{ marginTop: '0.8rem' }}>
                                        <Link href={`/order-tracking?id=${order.id}`}>
                                            <Button variant="outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                                                Track
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {activeTab === 'profile' && (
                    <section>
                        <h2 className={styles.sectionTitle}>Profile Settings</h2>
                        <form style={{ display: 'grid', gap: '1.5rem', maxWidth: '400px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                                <input type="text" defaultValue={MOCK_USER.name} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                                <input type="email" defaultValue={MOCK_USER.email} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <Button style={{ width: 'fit-content' }}>Save Changes</Button>
                        </form>
                    </section>
                )}

                {activeTab === 'address' && (
                    <section>
                        <h2 className={styles.sectionTitle}>Shipping Address</h2>
                        <div style={{ padding: '2rem', border: '2px dashed #ddd', borderRadius: '12px', textAlign: 'center' }}>
                            <p style={{ color: '#888', marginBottom: '1.5rem' }}>You have not saved any addresses yet.</p>
                            <Button variant="outline">Add New Address</Button>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
