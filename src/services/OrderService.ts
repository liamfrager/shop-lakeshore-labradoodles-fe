import CartService from "./CartService";
import { Cart } from "../types";
import axios from "axios";

export default class OrderService {

    private static apiEndpoint = process.env.REACT_APP_BE_ENDPOINT;

    static async checkoutCart(): Promise<string> {
        localStorage.setItem('checkoutInProgress', 'True');
        const cart: Cart = await CartService.getCart();
        // TODO: verify that all items in the cart still exist/are in stock through printful.
        console.log('checking out cart: ', cart);
        const response = await axios.post(`${this.apiEndpoint}/stripe/checkout`, {
            body: cart,
        });
        return response.data.url;
    }
}
