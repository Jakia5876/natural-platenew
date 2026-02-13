'use client';

import { useState } from 'react';
import Button from './Button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from '../app/product/[id]/page.module.css'; // Importing styles from the page module

// We need to define the type manually since we are importing styles from outside the component folder
// Ideally this component should be in the same folder or styles should be shared.
// For now, we will reuse the classes but we need to match the structure.

interface ProductActionsProps {
    product: Product;
    styles: any;
}

export default function ProductActions({ product, styles }: ProductActionsProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        // addToCart currently only adds 1, we might need to update context to accept quantity
        // For now, let's call it multiple times or update context.
        // Updating context is better. But context is simple: `items` list.
        // My context `addToCart` just increments by 1 if exists.
        // I need to update `addToCart` to accept quantity?
        // Let's modify the loop here for simplicity or update context later.
        // Loop for now.
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        alert('Added to cart!');
    };

    return (
        <div className={styles.actions} style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
                <button
                    onClick={handleDecrement}
                    style={{ padding: '0.8rem 1rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                    -
                </button>
                <span style={{ padding: '0 1rem', fontWeight: '600' }}>{quantity}</span>
                <button
                    onClick={handleIncrement}
                    style={{ padding: '0.8rem 1rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                    +
                </button>
            </div>
            <Button fullWidth onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline">Buy Now</Button>
        </div>
    );
}
