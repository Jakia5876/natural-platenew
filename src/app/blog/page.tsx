'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import styles from './page.module.css';

interface BlogPost {
    id: string;
    title: string;
    content: string;
    media_type: 'image' | 'video' | 'none';
    media_url: string | null;
    created_at: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('daily_posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts((data as BlogPost[]) || []);
        } catch (err) {
            console.error('Error fetching blog posts:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className={styles.header}>
                <h1 className={styles.title}>আমাদের ব্লগ (Our Blog)</h1>
                <p className={styles.subtitle}>
                    প্রতিদিন নতুন নতুন তথ্য এবং সচেতনতামূলক পোস্ট পড়ুন। (Read new information and awareness posts every day.)
                </p>
            </div>

            {loading ? (
                <div className={styles.status}>লোড হচ্ছে... (Loading blog posts...)</div>
            ) : posts.length === 0 ? (
                <div className={styles.status}>এখনো কোনো পোস্ট নেই। (No posts found yet.)</div>
            ) : (
                <div className={styles.blogGrid}>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
