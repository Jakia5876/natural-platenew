'use client';

import { useState, useEffect, useMemo } from 'react';
import { productService, Product } from '@/lib/productService';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export default function ProductListingPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await productService.getAll();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Get unique categories from products
    const categories = useMemo(() => {
        const cats = [...new Set(products.map(p => p.category))];
        return cats.sort();
    }, [products]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Price filter
        result = result.filter(p => p.price <= maxPrice);

        // Sort — products with real image URLs first, then by selected sort
        result.sort((a, b) => {
            const aHasImage = a.image && a.image.startsWith('/');
            const bHasImage = b.image && b.image.startsWith('/');

            // Products with real images come first
            if (aHasImage && !bHasImage) return -1;
            if (!aHasImage && bHasImage) return 1;

            // Then apply selected sort
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
                default:
                    return 0; // Keep original order (images first)
            }
        });

        return result;
    }, [products, selectedCategories, maxPrice, sortBy]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setMaxPrice(1000);
        setSortBy('default');
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className={styles.spinner}></div>
                    <p style={{ marginTop: '1rem', color: '#888' }}>Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Categories</h3>
                        <label className={styles.filterItem}>
                            <input
                                type="checkbox"
                                checked={selectedCategories.length === 0}
                                onChange={clearFilters}
                            />
                            All Products ({products.length})
                        </label>
                        {categories.map(cat => (
                            <label key={cat} className={styles.filterItem}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                {cat} ({products.filter(p => p.category === cat).length})
                            </label>
                        ))}
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Price Range</h3>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            style={{ width: '100%' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            <span>৳0</span>
                            <span style={{ fontWeight: '600', color: 'var(--primary-green)' }}>৳{maxPrice}{maxPrice >= 1000 ? '+' : ''}</span>
                        </div>
                    </div>

                    {selectedCategories.length > 0 && (
                        <button
                            onClick={clearFilters}
                            className={styles.clearBtn}
                        >
                            ✕ Clear Filters
                        </button>
                    )}
                </aside>

                {/* Main Content */}
                <main className={styles.main}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>
                            {selectedCategories.length === 1 ? selectedCategories[0] : 'All Products'}
                            <span className={styles.count}> ({filteredProducts.length})</span>
                        </h1>
                        <select
                            className={styles.sortSelect}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Sort by: Popular</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>

                    {/* Mobile filter chips */}
                    <div className={styles.mobileFilters}>
                        <select
                            className={styles.mobileCategorySelect}
                            value={selectedCategories.length === 1 ? selectedCategories[0] : ''}
                            onChange={(e) => {
                                if (e.target.value === '') {
                                    setSelectedCategories([]);
                                } else {
                                    setSelectedCategories([e.target.value]);
                                }
                            }}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.grid}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className={styles.noResults}>
                            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
                            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No products found</p>
                            <p style={{ color: '#aaa', marginTop: '0.5rem' }}>Try adjusting your filters or price range</p>
                            <button onClick={clearFilters} className={styles.clearBtn} style={{ marginTop: '1rem' }}>
                                Reset Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
