'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { totalItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.nav}`}>
                <Link href="/" className={styles.logo}>
                    <img src="/images/logo.png" alt="Natural Plate Logo" className={styles.logoImg} />
                    Natural Plate
                </Link>

                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`${styles.navMenu} ${menuOpen ? styles.navMenuOpen : ''}`}>
                    <ul className={styles.menu}>
                        <li><Link href="/" className={styles.menuLink} onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link href="/blog" className={styles.menuLink} onClick={() => setMenuOpen(false)}>Blog</Link></li>
                        <li><Link href="/journal" className={styles.menuLink} onClick={() => setMenuOpen(false)}>Journal</Link></li>
                        <li><Link href="/products" className={styles.menuLink} onClick={() => setMenuOpen(false)}>Products</Link></li>
                        <li><Link href="/about" className={styles.menuLink} onClick={() => setMenuOpen(false)}>About Us</Link></li>
                        <li><Link href="/reviews" className={styles.menuLink} onClick={() => setMenuOpen(false)}>Reviews</Link></li>
                        <li><Link href="/contact" className={styles.menuLink}>Contact</Link></li>
                        <li><Link href="/order-tracking" className={styles.menuLink}>Track Order</Link></li>
                    </ul>
                </nav>

                <div
                    className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
                    onClick={() => setMenuOpen(false)}
                />

                <div className={styles.actions}>
                    <Link href="/dashboard" className={styles.cartBtn} title="My Account">
                        👤
                    </Link>
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
