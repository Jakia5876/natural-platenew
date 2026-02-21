'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';
import styles from './page.module.css';

interface Review {
    id: string;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
    product_id: string;
}

export default function GlobalReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('product_reviews')
                    .select('*')
                    .eq('approved', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setReviews(data || []);
            } catch (err) {
                console.error('Error fetching all reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllReviews();
    }, []);

    const getProductName = (productId: string) => {
        const product = products.find(p => p.id === productId);
        return product ? product.name : 'Unknown Product';
    };

    const getProductImage = (productId: string) => {
        const product = products.find(p => p.id === productId);
        return product ? product.image : null;
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className={styles.header}>
                <h1 className={styles.title}>গ্রাহকদের মূল্যবান মতামত (What Our Customers Say)</h1>
                <p className={styles.subtitle}>
                    Natural Plate-এর প্রতি আপনাদের আস্থা আমাদের অনুপ্রেরণা। (Your trust in Natural Plate inspires us.)
                </p>
            </div>

            {loading ? (
                <div className={styles.status}>লোড হচ্ছে... (Loading reviews...)</div>
            ) : reviews.length === 0 ? (
                <div className={styles.status}>এখনো কোনো রিভিউ নেই। (No reviews found yet.)</div>
            ) : (
                <div className={styles.reviewsGrid}>
                    {reviews.map((review) => (
                        <div key={review.id} className={styles.reviewCard}>
                            <div className={styles.reviewContent}>
                                <div className={styles.rating}>
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <p className={styles.comment}>{review.comment}</p>
                            </div>

                            <div className={styles.reviewFooter}>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{review.user_name}</span>
                                    <span className={styles.date}>{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>

                                <Link href={`/product/${review.product_id}`} className={styles.productLink}>
                                    {getProductImage(review.product_id) && (
                                        <div className={styles.productThumbnail}>
                                            <img src={getProductImage(review.product_id)!} alt={getProductName(review.product_id)} />
                                        </div>
                                    )}
                                    <span className={styles.productName}>{getProductName(review.product_id)}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.cta}>
                <h3>পণ্য কিনেছেন? আপনার মতামত জানান!</h3>
                <p>Have you purchased from us? Share your experience on the product page!</p>
                <Link href="/products" className="btn btn-primary">
                    পণ্যসমূহ দেখুন (View Products)
                </Link>
            </div>
        </div>
    );
}
