import { productService } from '@/lib/productService';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export default async function ProductListingPage() {
    const products = await productService.getAll();

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Categories</h3>
                        <label className={styles.filterItem}>
                            <input type="checkbox" defaultChecked /> All Products
                        </label>
                        <label className={styles.filterItem}>
                            <input type="checkbox" /> Tableware
                        </label>
                        <label className={styles.filterItem}>
                            <input type="checkbox" /> Vegetables
                        </label>
                        <label className={styles.filterItem}>
                            <input type="checkbox" /> Fruits
                        </label>
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Price Range</h3>
                        <input type="range" min="0" max="1000" style={{ width: '100%' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            <span>৳0</span>
                            <span>৳1000+</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={styles.main}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>All Products</h1>
                        <select className={styles.sortSelect}>
                            <option>Sort by: Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest</option>
                        </select>
                    </div>

                    <div className={styles.grid}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No products found.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
