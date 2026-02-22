'use client';

import { useState, useEffect } from 'react';
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

export default function JournalFeed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('journal_entries')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (err) {
                console.error('Error fetching journal entries:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>Loading journal entries...</div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className={styles.loading}>No journal entries yet. Be the first to post!</div>
        );
    }

    return (
        <div className={styles.feedGrid}>
            {posts.map(post => (
                <DailyPost key={post.id} post={post} />
            ))}
        </div>
    );
}
