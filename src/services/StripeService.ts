import Stripe from "stripe";
import OrderService from "./OrderService";
import { Cart } from "../types";

const STRIPE_API_KEY: string = process.env.STRIPE_API_KEY!;

// A class that interacts with the Stripe API. Initialize with Stripe API key to link this object with your account
export default class StripeService {

    private static stripe: Stripe = new Stripe(STRIPE_API_KEY);

    // Takes a Printful variant as an input and returns a dictionary formatted as 'price-data' for the Stripe API session creation
    static getPriceData(variant: any): Stripe.Checkout.SessionCreateParams.LineItem.PriceData {
        const priceData = {
            currency: variant.currency.toLowerCase(),
            unit_amount: parseInt(variant.retail_price.replace('.', '')),
            product_data: {
                name: variant.name,
                // TODO: Implement product descriptions
                description: variant.name,
                images: variant.files.map((file: any) => file.thumbnail_url),
            },
        }
        return priceData;
    }

    static async createCheckoutSession(cart: Cart): Promise<Stripe.Checkout.Session> {
        const metadata = Object.entries(cart.items).reduce((acc, [id, item]) => {
            acc[Number(id)] = item.quantity;
            return acc;
        }, {} as { [key: number]: number });

        const YOUR_DOMAIN = 'https://shop.lakeshorelabradoodles.com';
        const checkoutSessionParams: Stripe.Checkout.SessionCreateParams = {
            line_items: await OrderService.getLineItems(cart),
            mode: 'payment',
            shipping_address_collection: {'allowed_countries': ['US']},
            success_url: YOUR_DOMAIN + '/order_success',
            cancel_url: YOUR_DOMAIN + '/cart',
            metadata: metadata,
        }
        return this.stripe.checkout.sessions.create(checkoutSessionParams);
    }
}