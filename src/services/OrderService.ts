import Stripe from "stripe";
import PrintfulService from "./PrintfulService";
import StripeService from "./StripeService";
import CartService from "./CartService";
import { Cart, Order } from "../types";

export default class OrderService {

    static async getLineItems(cart: Cart): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> {
        const lineItems = await Promise.all(Object.entries(cart.items).map(async ([id, item]) => {
            const variant = await PrintfulService.getVariant(Number(id));
            const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
                price_data: StripeService.getPriceData(variant),
                quantity: item.quantity,
            }
            return lineItem;
        }));
        return lineItems;
    }

    static async checkoutCart() {
        const cart: Cart = await CartService.getCart();
        // TODO: verify that all items in the cart still exist/are in stock through printful.
        const checkoutSession = StripeService.createCheckoutSession(cart);
    }


    // Takes a stripe.checkout.Session object as an input and places an order on Printful. Returns Printful's API response
    static async placeOrder(checkoutSession: Stripe.Checkout.Session) {
        const order: Order = {
            recipient: {
                name: checkoutSession.shipping_details?.name,
                address1: checkoutSession.shipping_details?.address?.line1,
                address2: checkoutSession.shipping_details?.address?.line2,
                city: checkoutSession.shipping_details?.address?.city,
                state_code: checkoutSession.shipping_details?.address?.state,
                country_code: checkoutSession.shipping_details?.address?.country,
                zip: checkoutSession.shipping_details?.address?.postal_code,
                phone: checkoutSession.customer_details?.phone,
                email: checkoutSession.customer_details?.email,
            },
            items: Object.entries(checkoutSession.metadata || {}).map(([id, quantity]) => ({
                sync_variant_id: Number(id),
                quantity: Number(quantity),
            })),
            packing_slip: {
                email: 'lakeshorelabradoodles@gmail.com',
                phone: '+1(860)478-0267',
                message: 'Thank you for your purchase!',
                logo_url: 'https://shop.lakeshorelabradoodles.com/static/images/logo.png',
                store_name: 'Lakeshore Labradoodles',
            },
        }
        return PrintfulService.placeOrder(order);
    }
}
