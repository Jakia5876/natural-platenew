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

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {/* Gallery Section */}
                <div className={styles.gallery}>
                    <div className={styles.mainImageContainer}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.mainImage}
                        />
                    </div>
                    {/* Thumbnails placeholder */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{ width: '80px', height: '80px', background: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', border: i === 1 ? '2px solid var(--primary-green)' : '1px solid #ddd' }}>
                                <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
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
                        Eco-friendly and sustainable {product.name}. Perfect for parties, weddings, and daily use.
                        Made from 100% natural Areca leaves, chemical-free and biodegradable.
                        Experience the elegance of nature with every meal.
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
