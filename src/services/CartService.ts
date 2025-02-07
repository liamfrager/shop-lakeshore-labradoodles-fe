import { Cart, CartData, CartItem } from "../types";
import PrintfulService from "./PrintfulService";


export default class CartService {
    private static CART_KEY = 'cart';

    // Retrieves the cart from local storage
    public static getCartData(): CartData {
        const cart = localStorage.getItem(this.CART_KEY);
        return cart ? JSON.parse(cart) : { items: {} };
    }

    // Saves the cart to local storage
    public static saveCartData(cart: CartData): void {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }

    // Adds an item to the cart
    public static setItem(id: number, quantity: number): void {
        const cart = this.getCartData();
        cart.items[id] = quantity;
        this.saveCartData(cart);
    }

    // Removes an item from the cart
    public static removeItem(id: number): void {
        const cart = this.getCartData();
        delete cart.items[id];
        this.saveCartData(cart);
    }

    // Clears the cart
    public static clearCart(): void {
        localStorage.removeItem(this.CART_KEY);
    }

    public static async getCart(): Promise<Cart> {
        const cartData = this.getCartData();
        const cart: Cart = {
            items: await (async () => {
                const items: { [key: number]: CartItem } = {};
                for (const [id, quantity] of Object.entries(cartData.items)) {
                    const variant = await PrintfulService.getVariant(Number(id));
                    const cartItem: CartItem = {
                        id: Number(id),
                        name: variant.name,
                        price: Number(variant.retail_price),
                        img: variant.files[variant.files.length - 1].thumbnail_url,
                        quantity: Number(quantity),
                    };
                    items[Number(id)] = cartItem;
                }
                return items;
            })(),
        }
        return cart;
    }
}