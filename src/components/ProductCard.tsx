'use client';

import Link from 'next/link';
import Button from './Button';
import styles from './ProductCard.module.css';
import { Product } from '@/lib/productService';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

function isImageUrl(str: string): boolean {
    return str.startsWith('/') || str.startsWith('http');
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
    };

    const hasRealImage = isImageUrl(product.image);

    return (
        <div className={styles.card}>
            <Link href={`/product/${product.id}`} className={styles.imageContainer}>
                {hasRealImage ? (
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.image}
                        />
                    </div>
                ) : (
                    <div className={styles.emojiContainer}>
                        <span className={styles.emoji}>{product.image}</span>
                    </div>
                )}
            </Link>
            <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <Link href={`/product/${product.id}`}>
                    <h3 className={styles.title}>{product.name}</h3>
                </Link>
                <div className={styles.rating}>
                    <span>⭐ {product.rating}</span>
                    <span className={styles.reviewCount}>({product.reviews})</span>
                </div>
                <div className={styles.bottom}>
                    <div>
                        <span className={styles.price}>৳{product.price}</span>
                        {product.originalPrice && (
                            <span className={styles.originalPrice}>৳{product.originalPrice}</span>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
}
