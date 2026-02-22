import styles from './PostCard.module.css';
import { formatDate } from '@/utils/formatDate';

interface PostCardProps {
    post: {
        id: string;
        title: string;
        content: string;
        media_type: 'image' | 'video' | 'none';
        media_url: string | null;
        created_at: string;
    };
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className={styles.card}>
            {post.media_type === 'image' && post.media_url && (
                <div className={styles.media}>
                    <img src={post.media_url} alt={post.title} />
                </div>
            )}
            {post.media_type === 'video' && post.media_url && (
                <div className={styles.media}>
                    {post.media_url.includes('youtube.com') || post.media_url.includes('youtu.be') ? (
                        <iframe
                            width="100%"
                            height="315"
                            src={post.media_url.replace('watch?v=', 'embed/')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : post.media_url.includes('facebook.com') ? (
                        <div className={styles.fbVideoWrapper}>
                            <iframe
                                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(post.media_url)}&show_text=false&width=500`}
                                width="100%"
                                height="314"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                    ) : (
                        <video controls width="100%">
                            <source src={post.media_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            )}
            <div className={styles.content}>
                <span className={styles.date}>{formatDate(post.created_at)}</span>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.text}>{post.content}</p>

                <div className={styles.shareSection}>
                    <span className={styles.shareLabel}>শেয়ার করুন (Share):</span>
                    <div className={styles.shareButtons}>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin + '/blog' : '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.shareBtn}
                            title="Share on Facebook"
                        >
                            📘 Facebook
                        </a>
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - ' + (typeof window !== 'undefined' ? window.location.origin + '/blog' : ''))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.shareBtn}
                            style={{ backgroundColor: '#25D366' }}
                            title="Share on WhatsApp"
                        >
                            📞 WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
