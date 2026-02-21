const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const products = [
    {
        id: 'p1',
        name: 'Areca Leaf Square Plate (10")',
        category: 'Tableware',
        price: 22,
        original_price: 25,
        image: '/images/products/areca-square-10-raw.jpg',
        images: ['/images/products/areca-square-10-raw.jpg', '/images/products/media__1770957156965.jpg'],
        rating: 4.9,
        reviews_count: 42,
        in_stock: true,
        weight: '10 inch',
        is_new: true,
        description: 'Eco-friendly 10-inch square plate made from 100% natural Areca palm leaves. Biodegradable, compostable, and chemical-free. Perfect for dinner parties and events.'
    },
    {
        id: 'p2',
        name: 'Areca Leaf Square Plate (8")',
        category: 'Tableware',
        price: 18,
        image: '/images/products/media__1770957156965.jpg',
        rating: 4.8,
        reviews_count: 28,
        in_stock: true,
        weight: '8 inch',
        description: 'Standard 8-inch square plate. Sturdy and heat resistant. Ideal for serving snacks, appetizers, or desserts.'
    },
    {
        id: 'p3',
        name: 'Areca Leaf Deep Round Plate (10")',
        category: 'Tableware',
        price: 21,
        original_price: 25,
        image: '/images/products/media__1770957156967.jpg',
        rating: 4.7,
        reviews_count: 56,
        in_stock: true,
        weight: '12 inch',
        description: 'Large 12-inch round plate. Durable enough for heavy meals with gravy. A sustainable alternative to plastic and styrofoam.'
    },
    {
        id: 'p4',
        name: 'Areca Leaf Round Plate (10")',
        category: 'Tableware',
        price: 20,
        image: '/images/products/areca-round-10-raw.jpg',
        rating: 4.6,
        reviews_count: 19,
        in_stock: true,
        weight: '10 inch',
        description: 'Classic 10-inch round dinner plate. 100% organic and natural texture. Microwave safe and leak-proof.'
    },
    {
        id: 'p5',
        name: 'Areca Leaf Deep Square Bowl (6")',
        category: 'Tableware',
        price: 18,
        image: '/images/products/areca-square-bowl.jpg',
        rating: 4.8,
        reviews_count: 12,
        in_stock: true,
        weight: '6 inch',
        is_new: true,
        description: 'Deep square bowl perfect for soups, curries, and salads. Retains heat and prevents spills.'
    },
    {
        id: 'p6',
        name: 'Areca Leaf Rectangular Tray (10")',
        category: 'Tableware',
        price: 22,
        image: '/images/products/areca-rect-watermelon.png',
        rating: 4.9,
        reviews_count: 25,
        in_stock: true,
        weight: '10x6 inch',
        is_new: true,
        description: 'Elegant rectangular tray. Ideal for serving appetizers, sushi, or desserts.'
    },
    {
        id: 'p7',
        name: 'Food Box',
        category: 'Tableware',
        price: 20,
        image: '/images/products/areca-square-stack.png',
        rating: 4.5,
        reviews_count: 30,
        in_stock: true,
        weight: '6 inch',
        description: 'Small square plate for sides, cakes, and snacks. Lightweight yet sturdy.'
    },
    {
        id: 'p8',
        name: 'Areca Leaf Square Plate (6")',
        category: 'Tableware',
        price: 15,
        image: '/images/products/areca-square-single.png',
        rating: 4.7,
        reviews_count: 15,
        in_stock: true,
        weight: '6 inch',
        is_new: true,
        description: 'Small square plate for sides and snacks. Elegant and sustainable.'
    },
    {
        id: 'p9',
        name: 'Areca Leaf Deep Round Plate (10")',
        category: 'Tableware',
        price: 21,
        image: '/images/products/areca-round-10-deep.jpg',
        rating: 4.5,
        reviews_count: 10,
        in_stock: true,
        weight: '10 inch',
        description: 'Deep 10-inch round plate. Robust and spacious, perfect for main courses with sides.'
    },
    {
        id: 'p10',
        name: 'Areca Leaf Plate (6")',
        category: 'Tableware',
        price: 15,
        image: '/images/products/areca-round-single.png',
        rating: 4.8,
        reviews_count: 22,
        in_stock: true,
        weight: '10 inch',
        is_new: true,
        description: '10-inch round plate with a deep rim (dip). Ideal for meals with gravies and sauces.'
    },
    {
        id: 'p11',
        name: 'Areca Leaf Round Plate (8")',
        category: 'Tableware',
        price: 18,
        image: '/images/products/areca-round-8-raw.png',
        rating: 4.6,
        reviews_count: 20,
        in_stock: true,
        weight: '8 inch',
        description: 'Standard 8-inch round plate. Great for breakfast or light meals.'
    },
    {
        id: 'p12',
        name: 'Areca Leaf Heart Bowl',
        category: 'Tableware',
        price: 15,
        image: '/images/products/areca-heart-bowl.png',
        rating: 4.8,
        reviews_count: 8,
        in_stock: true,
        weight: '6 inch',
        is_new: true,
        description: 'Charming heart-shaped bowl. Perfect for special occasions and desserts.'
    },
    {
        id: 'p13',
        name: 'Areca Leaf Snack Plate',
        category: 'Tableware',
        price: 15,
        image: '/images/products/areca-snack-plate.png',
        rating: 4.7,
        reviews_count: 18,
        in_stock: true,
        weight: '6 inch',
        is_new: true,
        description: 'Versatile square snack plate. Ideal for popcorn, chips, or dry snacks.'
    },
    {
        id: 'v1',
        name: 'Brown rice ( 1kg)',
        category: 'Grains',
        price: 150,
        original_price: 180,
        image: '🌾',
        rating: 4.8,
        reviews_count: 124,
        in_stock: true,
        weight: '1kg',
        description: 'High-quality unpolished brown rice. Rich in fiber and highly nutritious.'
    },
    {
        id: 'v2',
        name: 'Fresh Pure Honey (500 grams)',
        category: 'Grocery',
        price: 850,
        image: '🍯',
        rating: 4.9,
        reviews_count: 89,
        in_stock: true,
        weight: '500g',
        description: '100% natural and pure forest honey. No added sugar or preservatives.'
    },
    {
        id: 'v3',
        name: 'Green Chili (Kacha Morich)',
        category: 'Vegetables',
        price: 300,
        image: '🌶️',
        rating: 4.9,
        reviews_count: 45,
        in_stock: true,
        weight: '250g',
        description: 'Spicy and fresh green chilies. Adds the perfect kick to your dishes.'
    },
    {
        id: 'v4',
        name: 'Fresh Carrots',
        category: 'Vegetables',
        price: 60,
        original_price: 70,
        image: '🥕',
        rating: 4.7,
        reviews_count: 32,
        in_stock: true,
        weight: '1kg',
        description: 'Crunchy and sweet organic carrots. Great for salads, cooking, or snacking.'
    },
    {
        id: 'f1',
        name: 'Organic Bananas (Sagor)',
        category: 'Fruits',
        price: 90,
        original_price: 100,
        image: '🍌',
        rating: 4.6,
        reviews_count: 210,
        in_stock: true,
        weight: '1 Dozen',
        description: 'Sweet and creamy Sagor bananas. Naturally ripened without chemicals.'
    },
    {
        id: 'f2',
        name: 'Green Coconut',
        category: 'Fruits',
        price: 200,
        image: '🥥',
        rating: 4.9,
        reviews_count: 78,
        in_stock: true,
        weight: '1 pc',
        description: 'Fresh green coconut full of sweet water and soft meat. The ultimate natural refreshing drink.'
    },
    {
        id: 'g1',
        name: 'Premium Basmati Rice',
        category: 'Rice',
        price: 350,
        original_price: 380,
        image: '🍚',
        rating: 4.8,
        reviews_count: 300,
        in_stock: true,
        weight: '5kg',
        description: 'Long-grain aromatic Basmati rice. Aged to perfection for the best texture and flavor.'
    },
    {
        id: 'g2',
        name: 'Cold Pressed Mustard Oil',
        category: 'Oils',
        price: 280,
        image: '🫗',
        rating: 4.9,
        reviews_count: 156,
        in_stock: true,
        weight: '500ml',
        description: '100% pure cold-pressed mustard oil. Traditional "Ghani Bhanga" oil with authentic pungency.'
    }
];

async function migrate() {
    const client = new Client({
        connectionString: process.env.SUPABASE_DB_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Connected to Supabase database.');

        for (const p of products) {
            const query = `
                INSERT INTO products (id, name, category, price, original_price, image, images, rating, reviews_count, in_stock, weight, description, is_new)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    category = EXCLUDED.category,
                    price = EXCLUDED.price,
                    original_price = EXCLUDED.original_price,
                    image = EXCLUDED.image,
                    images = EXCLUDED.images,
                    rating = EXCLUDED.rating,
                    reviews_count = EXCLUDED.reviews_count,
                    in_stock = EXCLUDED.in_stock,
                    weight = EXCLUDED.weight,
                    description = EXCLUDED.description,
                    is_new = EXCLUDED.is_new
            `;
            const values = [
                p.id, p.name, p.category, p.price, p.original_price || null,
                p.image, p.images || [], p.rating, p.reviews_count,
                p.in_stock, p.weight, p.description, p.is_new || false
            ];
            await client.query(query, values);
            console.log(`Migrated product: ${p.name}`);
        }

        console.log('Product migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err.message);
    } finally {
        await client.end();
    }
}

migrate();
