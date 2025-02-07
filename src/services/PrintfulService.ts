import axios from 'axios';
import { Order } from '../types';

export default class PrintfulService {
    private static apiEndpoint = process.env.REACT_APP_BE_ENDPOINT;

    // Returns all sync products from the Printful shop.
    public static async getAllProducts() {
        const response = await axios.get(`${this.apiEndpoint}/products`);
        return response.data;
    }

    // Takes a Printful sync product ID as an input and returns details on the product
    public static async getProduct(id: number) {
        const response = await axios.get(`${this.apiEndpoint}/products/${id}`);
        return response.data;
    }

    // Takes a Printful sync product ID as an input and returns details on all its variants
    public static async getVariantIDs(id: number) {
        const product = await this.getProduct(id);
        const variantsIDs = product.sync_variants.map((variant: { id: number }) => variant.id);
        return variantsIDs;
    }

    // Takes a Printful sync variant ID as an input and returns details on that variant
    public static async getVariant(id: number) {
        const response = await axios.get(`${this.apiEndpoint}/variants/${id}`);
        return response.data;
    }

    // Takes a Printful product variant ID as an input and returns the color code associated with that variant
    public static async getColorCode(id: number) {
        const response = await axios.get(`${this.apiEndpoint}/products/${id}/color`);
        return response.data;
    }

    // Takes Printful order data as an input and places an order. Returns an API response from Printful
    public static async placeOrder(order: Order) {
        const response = await axios.post(`${this.apiEndpoint}/orders`, {
            body: order,
        });
        return response.data;
    }

}