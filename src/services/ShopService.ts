import { Color, Product, VariantIDMap } from "../types";
import PrintfulService from "./PrintfulService";

export default class ShopService {
    // Returns all product entries in the database or creates them if they don't exist
    static async getAllProducts(): Promise<Product[] | null> {
        try {
            const syncs = await PrintfulService.getAllProducts();
            const products: Product[] = syncs.map((sync: any) => ({
                id: sync.id,
                name: sync.name,
                image: sync.thumbnail_url,
                category: this.getCategory(sync),
            }));
            return products;
        } catch (error) {
            return null;
        }
    }

    // Takes Printful sync product ID as returns a Product object with product details
    static async getProduct(id: number): Promise<Product | null> {
        try {
            const sync = await PrintfulService.getProduct(id);

            // Get sizes
            const clothingSizeOrder = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
            const sizes = Array.from(new Set<string>(sync.sync_variants.map((variant: any) => variant.size)))
                .sort((a: string, b: string) => {
                    const indexA = clothingSizeOrder.indexOf(a);
                    const indexB = clothingSizeOrder.indexOf(b);
                    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB) || a.localeCompare(b);
                });

            const colors: Set<Color> = new Set();
            const sizePrices: { [size: string]: string } = {};
            const previewImages: { [color: string]: string[] } = {};
            const variantIDs: VariantIDMap = {};

            const colorCache: string[] = [];
            await Promise.all(sync.sync_variants.map(async (variant: any) => {
                // Get product colors
                if (!colorCache.some(color => color === variant.color)) {
                    colorCache.push(variant.color);
                    colors.add({
                        name: variant.color,
                        code: await PrintfulService.getColorCode(variant.variant_id),
                    });
                }

                // Get product variant prices
                sizePrices[variant.size] = variant.retail_price;

                // Get preview images
                if (!previewImages[variant.color]) {
                    variant.files.forEach((file: any) => {
                        if (file.filename.endsWith('.jpg')) {
                            if (!previewImages[variant.color]) {
                                previewImages[variant.color] = [];
                            }
                            previewImages[variant.color].push(file.preview_url);
                        }
                    });
                }

                // Get variant ID
                if (!variantIDs[variant.color]) {
                    variantIDs[variant.color] = {};
                }
                variantIDs[variant.color][variant.size] = variant.id;
            }));

            // Create product object
            const product: Product = {
                id: id,
                name: sync.sync_product.name,
                description: '',
                image: sync.sync_product.thumbnail_url,
                sizes: sizes,
                previewImages: previewImages,
                sizePrices: sizePrices,
                colors: Array.from(colors).sort((a, b) => a.name.localeCompare(b.name)),
                variantIDs: variantIDs,
                category: this.getCategory(sync.sync_product),
            };
            return product;
        } catch (error) {
            return null;
        }
    }
    
    private static getCategory(sync: any): string | null {
        const name: string = sync.name.toLowerCase();
        if (name.includes('hoodie') || name.includes('sweatshirt'))
            return 'Sweatshirts/Hoodies';
        if (name.includes('t-shirt'))
            return 'T-Shirts';
        return null;
    }
}