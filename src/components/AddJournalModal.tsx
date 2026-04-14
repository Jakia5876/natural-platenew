'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './AddJournalModal.module.css';

interface AddJournalModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddJournalModal({ onClose, onSuccess }: AddJournalModalProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mediaType, setMediaType] = useState<'image' | 'video' | 'none'>('none');
    const [mediaUrl, setMediaUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await supabase.storage
            .from('journal-media')
            .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('journal-media')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalMediaUrl = mediaUrl;

            if (selectedFile) {
                finalMediaUrl = await handleFileUpload(selectedFile);
            }

            const { error } = await supabase
                .from('daily_posts')
                .insert([{
                    title,
                    content,
                    media_type: mediaType,
                    media_url: finalMediaUrl,
                    published: true
                }]);

            if (error) throw error;
            onSuccess();
        } catch (err: any) {
            console.error('Error creating journal entry:', err);
            alert(`Error: ${err.message || 'Unknown error occurred'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                <h2 className={styles.modalTitle}>Add New Journal Entry</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="title">Title (Optional)</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="A descriptive title..."
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            required
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="What's happening today?"
                            rows={5}
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <div className={styles.field}>
                            <label htmlFor="mediaType">Media Type</label>
                            <select
                                id="mediaType"
                                value={mediaType}
                                onChange={e => {
                                    setMediaType(e.target.value as any);
                                    setSelectedFile(null);
                                    setMediaUrl('');
                                }}
                            >
                                <option value="none">None</option>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        </div>

                        <div className={styles.field} style={{ flex: 2 }}>
                            <label htmlFor="mediaFile">
                                {mediaType === 'image' ? 'Upload Image' : mediaType === 'video' ? 'Upload Video' : 'Media'}
                            </label>
                            {mediaType !== 'none' ? (
                                <div className={styles.uploadArea}>
                                    <input
                                        id="mediaFile"
                                        type="file"
                                        accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                setSelectedFile(e.target.files[0]);
                                                setMediaUrl('');
                                            }
                                        }}
                                        className={styles.fileInput}
                                        disabled={loading}
                                    />
                                    <p className={styles.uploadTip}>Or paste a URL below:</p>
                                    <input
                                        id="mediaUrl"
                                        type="text"
                                        value={mediaUrl}
                                        onChange={e => {
                                            setMediaUrl(e.target.value);
                                            setSelectedFile(null);
                                        }}
                                        placeholder={mediaType === 'video' ? 'YouTube/Video Link' : 'Image URL'}
                                        disabled={loading}
                                    />
                                </div>
                            ) : (
                                <input disabled placeholder="Select media type first" />
                            )}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Posting...' : 'Post to Journal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
