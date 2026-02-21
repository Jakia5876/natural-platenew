import { productService } from '@/lib/productService';
import Button from '@/components/Button';
import ProductActions from '@/components/ProductActions';
import ProductReviews from '@/components/ProductReviews';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const products = await productService.getAll();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await productService.getById(id);

    if (!product) {
        notFound();
    }

    const isImageUrl = (str: string) => str.startsWith('/') || str.startsWith('http');
    const hasRealImage = isImageUrl(product.image);

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {/* Gallery Section */}
                <div className={styles.gallery}>
                    <div className={styles.mainImageContainer}>
                        {hasRealImage ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className={styles.mainImage}
                            />
                        ) : (
                            <div style={{
                                width: '100%', height: '100%', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #fff8e1 100%)',
                                borderRadius: '12px', minHeight: '350px'
                            }}>
                                <span style={{ fontSize: '8rem' }}>{product.image}</span>
                            </div>
                        )}
                    </div>
                    {/* Thumbnails - only show for products with real images */}
                    {hasRealImage && (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {(product.images || [product.image]).slice(0, 3).map((img, i) => (
                                <div key={i} style={{ width: '80px', height: '80px', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', border: i === 0 ? '2px solid var(--primary-green)' : '1px solid #ddd' }}>
                                    <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className={styles.details}>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceContainer}>
                        <span className={styles.price}>৳{product.price}</span>
                        {product.originalPrice && (
                            <span className={styles.originalPrice}>৳{product.originalPrice}</span>
                        )}
                        <span style={{ background: 'var(--light-green)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--dark-green)' }}>
                            In Stock
                        </span>
                    </div>

                    <p className={styles.description}>
                        {product.description || `Eco-friendly and sustainable ${product.name}. Perfect for parties, weddings, and daily use.`}
                    </p>

                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <span>Pages/Size</span>
                            <strong>{product.weight}</strong>
                        </div>
                        <div className={styles.metaItem}>
                            <span>Material</span>
                            <strong>Areca Leaf</strong>
                        </div>
                        <div className={styles.metaItem}>
                            <span>Biodegradable</span>
                            <strong>Yes (100%)</strong>
                        </div>
                    </div>

                    <ul className={styles.benefits}>
                        <li className={styles.benefit}>✅ Microwave Safe</li>
                        <li className={styles.benefit}>✅ Compostable</li>
                        <li className={styles.benefit}>✅ Sturdy & Leak-proof</li>
                    </ul>

                    <ProductActions product={product} styles={styles} />
                </div>
            </div>

            {/* Product Reviews */}
            <ProductReviews productId={product.id} />
        </div>
    );
}
