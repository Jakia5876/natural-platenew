import styles from './DailyPost.module.css';

interface DailyPostProps {
    post: {
        id: string;
        created_at: string;
        title?: string;
        content: string;
        media_type: 'image' | 'video' | 'none';
        media_url?: string;
    };
}

export default function DailyPost({ post }: DailyPostProps) {
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className={styles.postCard}>
            <div className={styles.postHeader}>
                <span className={styles.date}>{formattedDate}</span>
                {post.title && <h3 className={styles.title}>{post.title}</h3>}
            </div>

            <div className={styles.content}>
                <p>{post.content}</p>
            </div>

            {post.media_type !== 'none' && post.media_url && (
                <div className={styles.mediaContainer}>
                    {post.media_type === 'image' && (
                        <img src={post.media_url} alt={post.title || 'Daily update image'} className={styles.postImage} />
                    )}
                    {post.media_type === 'video' && (
                        <div className={styles.videoWrapper}>
                            {post.media_url.includes('youtube.com') || post.media_url.includes('youtu.be') ? (
                                <iframe
                                    src={post.media_url.replace('watch?v=', 'embed/')}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : post.media_url.includes('facebook.com') ? (
                                <iframe
                                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(post.media_url)}&show_text=false&width=500`}
                                    width="500"
                                    height="314"
                                    style={{ border: 'none', overflow: 'hidden' }}
                                    scrolling="no"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                ></iframe>
                            ) : (
                                <video src={post.media_url} controls className={styles.postVideo}></video>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
