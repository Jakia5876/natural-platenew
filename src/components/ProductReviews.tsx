'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './ProductReviews.module.css';

interface Review {
    id: string;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

interface ProductReviewsProps {
    productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('product_reviews')
                .select('*')
                .eq('product_id', productId)
                .eq('approved', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReviews(data || []);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { error } = await supabase
                .from('product_reviews')
                .insert([{ ...formData, product_id: productId }]);

            if (error) throw error;

            setFormData({ user_name: '', rating: 5, comment: '' });
            alert('আপনার রিভিউ সফলভাবে জমা দেওয়া হয়েছে! (Review submitted successfully!)');
            fetchReviews();
        } catch (err: any) {
            alert('Error submitting review: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.reviewSection}>
            <h2 className={styles.sectionTitle}>গ্রাহক মতামত (Customer Reviews)</h2>

            {/* Submission Form */}
            <div className={styles.formCard}>
                <h3>একটি রিভিউ দিন (Leave a Review)</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>আপনার নাম (Your Name)</label>
                        <input
                            type="text"
                            required
                            value={formData.user_name}
                            onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                            placeholder="যেমন: রহিম আহমেদ"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>রেটিং দিন (Rating)</label>
                        <select
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        >
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'Star' : 'Stars'}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>আপনার মতামত লিখুন (Comment - Bangla supported)</label>
                        <textarea
                            required
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            placeholder="পণ্যটি কেমন লেগেছে তা লিখুন..."
                            rows={4}
                        />
                    </div>
                    <button type="submit" disabled={submitting} className="btn btn-primary">
                        {submitting ? 'জমা হচ্ছে...' : 'রিভিউ দিন (Submit Review)'}
                    </button>
                </form>
            </div>

            {/* Reviews List */}
            <div className={styles.reviewsList}>
                {loading ? (
                    <p className={styles.status}>লোড হচ্ছে... (Loading...)</p>
                ) : reviews.length === 0 ? (
                    <p className={styles.status}>এখনো কোনো রিভিউ নেই। (No reviews yet.)</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <span className={styles.userName}>{review.user_name}</span>
                                <span className={styles.date}>
                                    {new Date(review.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className={styles.rating}>
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <p className={styles.comment}>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
