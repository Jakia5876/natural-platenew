'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { totalItems } = useCart();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logo}>
                    🌿 Natural Plate
                </Link>

                <nav>
                    <ul className={styles.menu}>
                        <li><Link href="/" className={styles.menuLink}>Home</Link></li>
                        <li><Link href="/products" className={styles.menuLink}>Products</Link></li>
                        <li><Link href="/about" className={styles.menuLink}>About Us</Link></li>
                        <li><Link href="/contact" className={styles.menuLink}>Contact</Link></li>
                    </ul>
                </nav>

                <div className={styles.actions}>
                    <Link href="/cart" className={styles.cartBtn}>
                        🛒
                        {totalItems > 0 && (
                            <span className={styles.cartBadge}>{totalItems}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
