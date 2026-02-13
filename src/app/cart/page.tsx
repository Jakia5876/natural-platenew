'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

    if (items.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>🍽️</div>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--text-gray)' }}>Your cart is empty</h2>
                    <p style={{ marginBottom: '2rem', color: '#888' }}>Looks like you haven't added anything to your plate yet.</p>
                    <Link href="/products">
                        <Button>Browse Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Shopping Cart</h1>

            <div className={styles.layout}>
                {/* Cart Items Table */}
                <div className={styles.cartItems}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ width: '50%' }}>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className={styles.productInfo}>
                                            <img src={item.image} alt={item.name} className={styles.productImage} />
                                            <div>
                                                <Link href={`/product/${item.id}`} className={styles.productName}>{item.name}</Link>
                                                <span className={styles.productMeta}>{item.weight}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>৳{item.price}</td>
                                    <td>
                                        <div className={styles.quantityControl}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >-</button>
                                            <span className={styles.qtyValue}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>৳{item.price * item.quantity}</td>
                                    <td>
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeFromCart(item.id)}
                                            title="Remove item"
                                        >
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Order Summary */}
                <div className={styles.summary}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>
                    <div className={styles.summaryRow}>
                        <span>Subtotal ({totalItems} items)</span>
                        <span>৳{subtotal}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <div className={styles.summaryRow} style={{ color: 'var(--success-green)', fontSize: '0.9rem' }}>
                        <span>Payment Method</span>
                        <span>Cash on Delivery Available</span>
                    </div>
                    <div className={styles.summaryTotal}>
                        <span>Total</span>
                        <span>৳{subtotal}</span>
                    </div>

                    <Link href="/checkout" style={{ display: 'block', marginTop: '1.5rem' }}>
                        <Button fullWidth>Proceed to Checkout</Button>
                    </Link>

                    <Link href="/products" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                        Or Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
