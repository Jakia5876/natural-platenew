'use client';

import { useState } from 'react';
import JournalFeed from '@/components/JournalFeed';
import AddJournalModal from '@/components/AddJournalModal';
import styles from './page.module.css';

export default function JournalPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handlePostCreated = () => {
        setIsModalOpen(false);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', minHeight: '80vh', position: 'relative' }}>
            <div className={styles.header}>
                <h1 className={styles.title}>আমাদের জার্নাল (Our Journal)</h1>
                <p className={styles.subtitle}>
                    প্রতিদিনের আপডেট এবং বিশেষ মুহূর্তগুলো শেয়ার করা হচ্ছে। (Sharing daily updates and special moments.)
                </p>
            </div>

            <JournalFeed key={refreshKey} />

            {/* Floating Action Button */}
            <button
                className={styles.fab}
                onClick={() => setIsModalOpen(true)}
                title="Add New Entry"
            >
                +
            </button>

            {isModalOpen && (
                <AddJournalModal
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handlePostCreated}
                />
            )}
        </div>
    );
}
