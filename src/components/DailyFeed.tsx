'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import DailyPost from './DailyPost';
import styles from './DailyFeed.module.css';

interface Post {
    id: string;
    created_at: string;
    title?: string;
    content: string;
    media_type: 'image' | 'video' | 'none';
    media_url?: string;
}

export default function DailyFeed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('daily_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (error) throw error;
                setPosts(data || []);
            } catch (err) {
                console.error('Error fetching daily posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className={styles.feedSection}>
                <div className="container">
                    <h2 className="section-title">Daily Updates</h2>
                    <div className={styles.loading}>Loading latest updates...</div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) {
        return null; // Don't show the section if there are no posts
    }

    return (
        <section className={styles.feedSection}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className="section-title">আমাদের ব্লগ (Our Blog)</h2>
                    <p className={styles.subtitle}>নিয়মিত আপডেট এবং গুরুত্বপূর্ণ তথ্য পেতে আমাদের ব্লগ পড়ুন।</p>
                    <Link href="/blog" className={styles.viewAll}>View All Posts →</Link>
                </div>
                <div className={styles.feedGrid}>
                    {posts.map(post => (
                        <DailyPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
