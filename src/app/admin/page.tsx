'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const MOCK_STATS = [
    { label: 'Total Sales', value: '৳45,280', icon: '💰' },
    { label: 'Active Orders', value: '12', icon: '📦' },
    { label: 'Customers', value: '342', icon: '👥' },
    { label: 'Total Products', value: '18', icon: '🍽️' },
];

const MOCK_ORDERS = [
    { id: 'NP-1004', product: '10" Square Plate', customer: 'Karim Ahmed', date: 'Just now', status: 'Pending', total: '৳880' },
    { id: 'NP-1003', product: '6" Round Plate (Set)', customer: 'Sara Karim', date: '2 hours ago', status: 'Shipped', total: '৳1,200' },
    { id: 'NP-1002', product: 'Fresh Honey', customer: 'Rakib Hasan', date: 'Yesterday', status: 'Delivered', total: '৳850' },
    { id: 'NP-1001', product: 'Mustard Oil', customer: 'Nila Begum', date: 'Oct 12', status: 'Delivered', total: '৳280' },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className={styles.adminContainer}>
            {/* Admin Sidebar */}
            <aside className={styles.sidebar}>
                <h2>⚙️ Admin Panel</h2>
                <nav className={styles.adminNav}>
                    <div
                        className={`${styles.navItem} ${activeTab === 'overview' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Dashboard
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === 'orders' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        📝 Orders
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === 'products' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        🏷️ Products
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === 'customers' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('customers')}
                    >
                        👥 Customers
                    </div>
                    <Link href="/" className={styles.navItem} style={{ marginTop: 'auto', borderTop: '1px solid #455a64', paddingTop: '1rem' }}>
                        🏠 View Store
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        {activeTab === 'overview' && 'Dashboard Overview'}
                        {activeTab === 'orders' && 'Order Management'}
                        {activeTab === 'products' && 'Product Inventory'}
                    </h1>
                    <div className={styles.adminProfile}>
                        Welcome, <strong>Admin</strong>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <>
                        <div className={styles.statsGrid}>
                            {MOCK_STATS.map((stat, i) => (
                                <div key={i} className={styles.statCard}>
                                    <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                    <span className={styles.statValue}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Recent Orders</h2>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_ORDERS.map(order => (
                                        <tr key={order.id}>
                                            <td style={{ fontWeight: '600' }}>#{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>
                                                <span className={`${styles.badge} ${order.status === 'Pending' ? styles.badgePending :
                                                        order.status === 'Shipped' ? styles.badgeShipped : styles.badgeSuccess
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>{order.total}</td>
                                            <td><button className={styles.actionBtn}>View Details</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className={styles.tableContainer}>
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                            Full order management interface will appear here.
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className={styles.tableContainer}>
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                            Product inventory and editing interface will appear here.
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
