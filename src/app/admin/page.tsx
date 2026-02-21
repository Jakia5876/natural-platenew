'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

// Note: MOCK_STATS is now replaced by real data fetching in useEffect

const MOCK_ORDERS = [
    { id: 'NP-1004', product: '10" Square Plate', customer: 'Karim Ahmed', date: 'Just now', status: 'Pending', total: '৳880' },
    { id: 'NP-1003', product: '6" Round Plate (Set)', customer: 'Sara Karim', date: '2 hours ago', status: 'Shipped', total: '৳1,200' },
    { id: 'NP-1002', product: 'Fresh Honey', customer: 'Rakib Hasan', date: 'Yesterday', status: 'Delivered', total: '৳850' },
    { id: 'NP-1001', product: 'Mustard Oil', customer: 'Nila Begum', date: 'Oct 12', status: 'Delivered', total: '৳280' },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [posts, setPosts] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [stats, setStats] = useState({
        sales: '৳0',
        orders: '0',
        customers: '0',
        products: '0'
    });
    const [loading, setLoading] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', media_type: 'none', media_url: '' });

    useEffect(() => {
        fetchOverviewData();
        if (activeTab === 'daily-posts') fetchPosts();
        if (activeTab === 'reviews') fetchReviews();
        if (activeTab === 'products') fetchProducts();
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab]);

    const fetchOverviewData = async () => {
        const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
        const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
        // Simulating sales for now as we don't have many real orders yet
        setStats({
            sales: '৳0',
            orders: String(orderCount || 0),
            customers: '0', // We can add a profiles/customers table later
            products: String(productCount || 0)
        });
    };

    const fetchOrders = async () => {
        setLoading(true);
        const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (data) setOrders(data);
        setLoading(false);
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Delete this product?')) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (!error) fetchProducts();
        }
    };

    const handleToggleStock = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('products')
            .update({ in_stock: !currentStatus })
            .eq('id', id);
        if (!error) fetchProducts();
    };

    const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
        if (!error) {
            fetchOrders();
            fetchOverviewData();
        }
    };

    const fetchPosts = async () => {
        setLoading(true);
        const { data } = await supabase.from('daily_posts').select('*').order('created_at', { ascending: false });
        if (data) setPosts(data);
        setLoading(false);
    };

    const fetchReviews = async () => {
        setLoading(true);
        const { data } = await supabase.from('product_reviews').select('*').order('created_at', { ascending: false });
        if (data) setReviews(data);
        setLoading(false);
    };

    const fetchProducts = async () => {
        setLoading(true);
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (data) setProducts(data);
        setLoading(false);
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('daily_posts').insert([newPost]);
        if (!error) {
            setNewPost({ title: '', content: '', media_type: 'none', media_url: '' });
            fetchPosts();
            alert('Post created successfully!');
        } else {
            alert('Error creating post: ' + error.message);
        }
    };

    const handleDeletePost = async (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            const { error } = await supabase.from('daily_posts').delete().eq('id', id);
            if (!error) fetchPosts();
        }
    };

    const handleToggleReview = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('product_reviews')
            .update({ approved: !currentStatus })
            .eq('id', id);
        if (!error) fetchReviews();
    };

    const handleDeleteReview = async (id: string) => {
        if (confirm('Delete this review?')) {
            const { error } = await supabase.from('product_reviews').delete().eq('id', id);
            if (!error) fetchReviews();
        }
    };

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
                        className={`${styles.navItem} ${activeTab === 'daily-posts' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('daily-posts')}
                    >
                        📱 Daily Feed
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
                        className={`${styles.navItem} ${activeTab === 'reviews' ? styles.navActive : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        ⭐ Reviews
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
                        {activeTab === 'daily-posts' && 'Daily Feed Management'}
                        {activeTab === 'reviews' && 'Customer Reviews'}
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
                            <div className={styles.statCard}>
                                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💰</span>
                                <span className={styles.statLabel}>Total Sales</span>
                                <span className={styles.statValue}>{stats.sales}</span>
                            </div>
                            <div className={styles.statCard}>
                                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦</span>
                                <span className={styles.statLabel}>Active Orders</span>
                                <span className={styles.statValue}>{stats.orders}</span>
                            </div>
                            <div className={styles.statCard}>
                                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</span>
                                <span className={styles.statLabel}>Customers</span>
                                <span className={styles.statValue}>{stats.customers}</span>
                            </div>
                            <div className={styles.statCard}>
                                <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🍽️</span>
                                <span className={styles.statLabel}>Total Products</span>
                                <span className={styles.statValue}>{stats.products}</span>
                            </div>
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
                                    {orders.slice(0, 5).map(order => (
                                        <tr key={order.id}>
                                            <td style={{ fontWeight: '600' }}>#{order.id}</td>
                                            <td>{order.customer_name}</td>
                                            <td>
                                                <span className={`${styles.badge} ${order.status === 'Pending' ? styles.badgePending :
                                                    order.status === 'Shipped' ? styles.badgeShipped : styles.badgeSuccess
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>৳{order.total_amount}</td>
                                            <td><button className={styles.actionBtn}>View Details</button></td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                                No recent orders.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'daily-posts' && (
                    <div className={styles.tabContent}>
                        {/* Add Post Form */}
                        <div className={styles.card} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '12px' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Create New Post</h3>
                            <form onSubmit={handleCreatePost} style={{ display: 'grid', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Title (Optional)"
                                    value={newPost.title}
                                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                                <textarea
                                    placeholder="Content (Required)"
                                    required
                                    value={newPost.content}
                                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', minHeight: '100px' }}
                                />
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <select
                                        value={newPost.media_type}
                                        onChange={e => setNewPost({ ...newPost, media_type: e.target.value as any })}
                                        style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', flex: 1 }}
                                    >
                                        <option value="none">No Media</option>
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Media URL"
                                        disabled={newPost.media_type === 'none'}
                                        value={newPost.media_url}
                                        onChange={e => setNewPost({ ...newPost, media_url: e.target.value })}
                                        style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', flex: 2 }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Publish Post</button>
                            </form>
                        </div>

                        {/* Posts List */}
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Title</th>
                                        <th>Media</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map(post => (
                                        <tr key={post.id}>
                                            <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                            <td>{post.title || 'No Title'}</td>
                                            <td>{post.media_type}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className={styles.actionBtn}
                                                    style={{ color: '#e74c3c' }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.length === 0 && (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                                No daily posts yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.tabContent}>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Rating</th>
                                        <th>Comment</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.map(review => (
                                        <tr key={review.id}>
                                            <td>{new Date(review.created_at).toLocaleDateString()}</td>
                                            <td>{review.user_name}</td>
                                            <td>{'★'.repeat(review.rating)}</td>
                                            <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {review.comment}
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${review.approved ? styles.badgeSuccess : styles.badgePending}`}>
                                                    {review.approved ? 'Approved' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleToggleReview(review.id, review.approved)}
                                                    className={styles.actionBtn}
                                                >
                                                    {review.approved ? 'Hide' : 'Approve'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    className={styles.actionBtn}
                                                    style={{ color: '#e74c3c' }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {reviews.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                                No reviews yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className={styles.tabContent}>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.customer_name}</td>
                                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td>৳{order.total_amount}</td>
                                            <td>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                    className={styles.statusSelect}
                                                    style={{ padding: '0.3rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button className={styles.actionBtn}>Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                                                No orders found in database.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className={styles.tabContent}>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>
                                                <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {product.image.length > 2 ? <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : product.image}
                                                </div>
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>৳{product.price}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleToggleStock(product.id, product.in_stock)}
                                                    className={`${styles.badge} ${product.in_stock ? styles.badgeSuccess : styles.badgePending}`}
                                                    style={{ cursor: 'pointer', border: 'none' }}
                                                >
                                                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                                                </button>
                                            </td>
                                            <td style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className={styles.actionBtn}>Edit</button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className={styles.actionBtn}
                                                    style={{ color: '#e74c3c' }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
