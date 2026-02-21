import { supabase } from './supabase';

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    rating: number;
    reviews: number;
    inStock: boolean;
    weight: string;
    description?: string;
    isNew?: boolean;
}

const mapProduct = (p: any): Product => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    image: p.image,
    images: p.images,
    rating: Number(p.rating),
    reviews: p.reviews_count,
    inStock: p.in_stock,
    weight: p.weight || '',
    description: p.description,
    isNew: p.is_new
});

export const productService = {
    async getAll(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }
        return (data || []).map(mapProduct);
    },

    async getById(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching product ${id}:`, error);
            return null;
        }
        return mapProduct(data);
    },

    async getByCategory(category: string): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(`Error fetching category ${category}:`, error);
            return [];
        }
        return (data || []).map(mapProduct);
    }
};
