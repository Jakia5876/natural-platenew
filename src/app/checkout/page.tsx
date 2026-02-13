'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Shipping cost logic (mock)
    const shippingCost = 60; // Inside Dhaka default
    const total = subtotal + shippingCost;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart and redirect to success page
        clearCart();
        // Use a random order ID
        const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        router.push(`/order-confirmation/${orderId}`);
    };

    if (items.length === 0) {
        if (typeof window !== 'undefined') {
            // Redirect to cart if empty
            router.push('/cart');
        }
        return null;
    }

    return (
        <div className={styles.container}>
            {isSubmitting && (
                <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <p style={{ marginTop: '1rem', fontWeight: '600', color: 'var(--dark-green)' }}>Placing your order...</p>
                </div>
            )}

            <h1 className={styles.title}>Checkout</h1>

            <form onSubmit={handleSubmit} className={styles.layout}>
                {/* Left Column: Shipping & Payment */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>📍 Delivery Information</h2>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Full Name *</label>
                            <input type="text" className={styles.input} required placeholder="e.g. Rahim Ahmed" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone Number *</label>
                            <input type="tel" className={styles.input} required placeholder="e.g. 017XXXXXXXX" />
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Full Address *</label>
                            <textarea className={styles.textarea} required placeholder="House #, Road #, Area, City" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>City *</label>
                            <select className={styles.select}>
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                                <option>Sylhet</option>
                                <option>Rajshahi</option>
                                <option>Khulna</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Area / Thana *</label>
                            <select className={styles.select}>
                                <option>Gulshan</option>
                                <option>Banani</option>
                                <option>Dhanmondi</option>
                                <option>Mirpur</option>
                                <option>Uttara</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>💳 Payment Method</h2>
                    <div className={styles.paymentOption}>
                        <div className={styles.checkIcon}>✓</div>
                        <div>
                            <strong style={{ display: 'block', color: 'var(--dark-green)', fontSize: '1.1rem' }}>Cash on Delivery</strong>
                            <span style={{ fontSize: '0.9rem', color: '#555' }}>Pay with cash when you receive your order.</span>
                        </div>
                        <span className={styles.codBadge}>Recommended</span>
                    </div>

                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px dashed #ccc' }}>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                            ℹ️ Other payment methods (bKash, Nagad) are currently disabled. COD is the fastest way to get your order.
                        </p>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className={styles.summary}>
                    <h2 className={styles.sectionTitle}>Order Summary</h2>

                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
                        {items.map(item => (
                            <div key={item.id} className={styles.summaryItem}>
                                <img src={item.image} alt={item.name} className={styles.summaryImage} />
                                <div className={styles.summaryDetails}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item.name}</span>
                                        <span>৳{item.price * item.quantity}</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Qty: {item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.totals}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>৳{subtotal}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>Shipping (Dhaka)</span>
                            <span>৳{shippingCost}</span>
                        </div>
                        <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                            <span>Total to Pay</span>
                            <span>৳{total}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'start', cursor: 'pointer', fontSize: '0.9rem' }}>
                            <input type="checkbox" required />
                            <span>I agree to the <a href="/terms" style={{ color: 'var(--primary-green)', textDecoration: 'underline' }}>Terms & Conditions</a></span>
                        </label>
                    </div>

                    <Button fullWidth type="submit">Confirm Order</Button>
                </div>
            </form>
        </div>
    );
}
