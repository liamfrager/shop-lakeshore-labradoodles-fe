import { Color, Product } from "../types";
import PrintfulService from "./PrintfulService";

export default class ShopService {
    // Returns all product entries in the database or creates them if they don't exist
    static async getAllProducts() {
        const syncs = await PrintfulService.getAllProducts();
        const products: Product[] = syncs.map((sync: any) => ({
            id: sync.id,
            name: sync.name,
            image: sync.thumbnail_url,
        }));
        return products;
    }

    // Takes Printful sync product ID as returns a Product object with product details
    static async getProduct(id: number): Promise<Product> {
        const sync = await PrintfulService.getProduct(id);

        // Get sizes
        const clothingSizeOrder = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
        const sizes = Array.from(new Set<string>(sync.sync_variants.map((variant: any) => variant.size)))
            .sort((a: string, b: string) => {
                const indexA = clothingSizeOrder.indexOf(a);
                const indexB = clothingSizeOrder.indexOf(b);
                return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB) || a.localeCompare(b);
            });

        const colors: Color[] = [];
        const sizePrices: { [size: string]: string } = {};
        const previewImages: { [color: string]: string[] } = {};

        sync.sync_variants.forEach((variant: any) => {
            // Get product colors
            const color: Color = {
                name: variant.color,
                code: '',
            }
            if (!colors.includes(color)) {
                colors.push(color);
            }

            // Get product variant prices
            const size = variant.size;
            if (!sizePrices[size]) {
                sizePrices[size] = variant.retail_price;
            }

            // Get preview images
            if (!previewImages[color.name]) {
                variant.files.forEach((file: any) => {
                    if (file.filename.endsWith('.jpg')) {
                        if (!previewImages[color.name]) {
                            previewImages[color.name] = [];
                        }
                        previewImages[color.name].push(file.preview_url);
                    }
                });
            }
        });

        // Create product object
        const product: Product = {
            id: id,
            name: sync.sync_product.name,
            description: '',
            image: sync.sync_product.thumbnail_url,
            sizes: sizes,
            previewImages: previewImages,
            sizePrices: sizePrices,
            colors: colors,
        };

        return product;
    }
}