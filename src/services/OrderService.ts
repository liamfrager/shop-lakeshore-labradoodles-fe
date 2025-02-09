import CartService from "./CartService";
import { Cart } from "../types";
import axios from "axios";

export default class OrderService {

    private static apiEndpoint = process.env.REACT_APP_BE_ENDPOINT;

    static async checkoutCart(): Promise<string> {
        const cart: Cart | null = await CartService.getCart();
        if (cart === null) throw Error;
        localStorage.setItem('checkoutInProgress', 'True');
        // TODO: verify that all items in the cart still exist/are in stock through printful.
        const response = await axios.post(`${this.apiEndpoint}/stripe/checkout`, {
            body: cart,
        });
        return response.data.url;
    }
}
