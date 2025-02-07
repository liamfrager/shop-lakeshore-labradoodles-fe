import { useEffect, useState } from "react";
import { Cart } from "../types";
import CartService from "../services/CartService";
import CartItemDisplay from "../components/cart/CartItemDisplay";
import OrderService from "../services/OrderService";

export default function CartRoute() {
    const [cart, setCart] = useState<Cart>();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        CartService.getCart().then(data => setCart(data));
    }, []);

    useEffect(() => {
        if (cart) {
            setTotalPrice(Object.entries(cart.items).reduce((total, [id, item]) => total + item.price * item.quantity, 0))
        }
    }, [cart]);

    const handleQuantityChange = (itemID: number, newQuantity: number) => {
        CartService.setItem(itemID, newQuantity);
        setCart(prevCart => {
            if (!prevCart) return prevCart;
            return {
                ...prevCart,
                items: {
                    ...prevCart.items,
                    [itemID]: {
                        ...prevCart.items[itemID],
                        quantity: newQuantity
                    }
                }
            };
        });
    }

    const handleCheckout = async () => {
        const stripeCheckoutURL: string = await OrderService.checkoutCart();
        window.location.href = stripeCheckoutURL;
    }

    return (
        <>
            <h1>Cart</h1>
            {cart ? (
                <>
                    {Object.entries(cart.items).map(([id, item]) => <CartItemDisplay key={id} item={item} onQuantityChange={handleQuantityChange} />)}
                    <span>Free Shipping</span><span>$0.00</span>
                    <strong>Order Total</strong>
                    <span>{`$${totalPrice}`}</span>
                    <button onClick={handleCheckout}>Checkout</button>
                </>
            ) : (
                <>
                    <p>Loading...</p>
                </>
            )
            }
        </>
    );
}