export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string; // Main image
    images?: string[]; // Gallery images
    rating: number;
    reviews: number;
    isNew?: boolean;
    inStock: boolean;
    weight: string;
    description?: string;
}

export const products: Product[] = [
    // --- Tableware (Areca Leaf) ---
    {
        id: 'p1',
        name: 'Areca Leaf Square Plate (10")',
        category: 'Tableware',
        price: 22,
        originalPrice: 25,
        image: '/images/products/areca-square-10-raw.jpg',
        images: ['/images/products/areca-square-10-raw.jpg', '/images/products/media__1770957156965.jpg'],
        rating: 4.9,
        reviews: 42,
        inStock: true,
        weight: '10 inch',
        isNew: true,
        description: 'Eco-friendly 10-inch square plate made from 100% natural Areca palm leaves. Biodegradable, compostable, and chemical-free. Perfect for dinner parties and events.'
    },
    {
        id: 'p2',
        name: 'Areca Leaf Square Plate (8")',
        category: 'Tableware',
        price: 18,
        image: '/images/products/media__1770957156965.jpg',
        rating: 4.8,
        reviews: 28,
        inStock: true,
        weight: '8 inch',
        description: 'Standard 8-inch square plate. Sturdy and heat resistant. Ideal for serving snacks, appetizers, or desserts.'
    },
    {
        id: 'p3',
        name: 'Areca Leaf Deep Round Plate (10")',
        category: 'Tableware',
        price: 21,
        originalPrice: 25,
        image: '/images/products/media__1770957156967.jpg',
        rating: 4.7,
        reviews: 56,
        inStock: true,
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
        reviews: 19,
        inStock: true,
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
        reviews: 12,
        inStock: true,
        weight: '6 inch',
        isNew: true,
        description: 'Deep square bowl perfect for soups, curries, and salads. Retains heat and prevents spills.'
    },
    {
        id: 'p6',
        name: 'Areca Leaf Rectangular Tray (10")',
        category: 'Tableware',
        price: 22,
        image: '/images/products/areca-rect-watermelon.png',
        rating: 4.9,
        reviews: 25,
        inStock: true,
        weight: '10x6 inch',
        isNew: true,
        description: 'Elegant rectangular tray. Ideal for serving appetizers, sushi, or desserts.'
    },
    {
        id: 'p7',
        name: 'Food Box',
        category: 'Tableware',
        price: 20,
        image: '/images/products/areca-square-stack.png',
        rating: 4.5,
        reviews: 30,
        inStock: true,
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
        reviews: 15,
        inStock: true,
        weight: '6 inch',
        isNew: true,
        description: 'Small square plate for sides and snacks. Elegant and sustainable.',
    },
    {
        id: 'p9',
        name: 'Areca Leaf Deep Round Plate (10")',
        category: 'Tableware',
        price: 21,
        image: '/images/products/areca-round-10-deep.jpg',
        rating: 4.5,
        reviews: 10,
        inStock: true,
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
        reviews: 22,
        inStock: true,
        weight: '10 inch',
        isNew: true,
        description: '10-inch round plate with a deep rim (dip). Ideal for meals with gravies and sauces.'
    },
    {
        id: 'p11',
        name: 'Areca Leaf Round Plate (8")',
        category: 'Tableware',
        price: 18,
        image: '/images/products/areca-round-8-raw.png',
        rating: 4.6,
        reviews: 20,
        inStock: true,
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
        reviews: 8,
        inStock: true,
        weight: '6 inch',
        isNew: true,
        description: 'Charming heart-shaped bowl. Perfect for special occasions and desserts.'
    },
    {
        id: 'p13',
        name: 'Areca Leaf Snack Plate',
        category: 'Tableware',
        price: 15,
        image: '/images/products/areca-snack-plate.png',
        rating: 4.7,
        reviews: 18,
        inStock: true,
        weight: '6 inch',
        isNew: true,
        description: 'Versatile square snack plate. Ideal for popcorn, chips, or dry snacks.'
    },

    // --- Vegetables ---
    {
        id: 'v1',
        name: 'Brown rice ( 1kg)',
        category: 'Grains',
        price: 150,
        originalPrice: 180,
        image: '🌾',
        rating: 4.8,
        reviews: 124,
        inStock: true,
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
        reviews: 89,
        inStock: true,
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
        reviews: 45,
        inStock: true,
        weight: '250g',
        description: 'Spicy and fresh green chilies. Adds the perfect kick to your dishes.'
    },
    {
        id: 'v4',
        name: 'Fresh Carrots',
        category: 'Vegetables',
        price: 60,
        originalPrice: 70,
        image: '🥕',
        rating: 4.7,
        reviews: 32,
        inStock: true,
        weight: '1kg',
        description: 'Crunchy and sweet organic carrots. Great for salads, cooking, or snacking.'
    },

    // --- Fruits ---
    {
        id: 'f1',
        name: 'Organic Bananas (Sagor)',
        category: 'Fruits',
        price: 90,
        originalPrice: 100,
        image: '🍌',
        rating: 4.6,
        reviews: 210,
        inStock: true,
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
        reviews: 78,
        inStock: true,
        weight: '1 pc',
        description: 'Fresh green coconut full of sweet water and soft meat. The ultimate natural refreshing drink.'
    },

    // --- Grocery / Pantry ---
    {
        id: 'g1',
        name: 'Premium Basmati Rice',
        category: 'Rice',
        price: 350,
        originalPrice: 380,
        image: '🍚',
        rating: 4.8,
        reviews: 300,
        inStock: true,
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
        reviews: 156,
        inStock: true,
        weight: '500ml',
        description: '100% pure cold-pressed mustard oil. Traditional "Ghani Bhanga" oil with authentic pungency.'
    }
];
