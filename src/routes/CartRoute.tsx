import { useEffect, useState } from "react";
import { Cart } from "../types";
import CartService from "../services/CartService";
import CartItemDisplay from "../components/cart/CartItemDisplay";
import OrderService from "../services/OrderService";
import Loader from "../components/ui/Loader";
import './CartRoute.css';
import { Link, useNavigate } from "react-router-dom";

export default function CartRoute() {
    const navigate = useNavigate();

    const [cart, setCart] = useState<Cart | null | undefined>(undefined);
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

    const handleRemoveItem = (itemID: number) => {
        CartService.removeItem(itemID);
        setCart(prevCart => {
            if (!prevCart) return prevCart;
            const newItems = { ...prevCart.items };
            delete newItems[itemID];
            return {
                ...prevCart,
                items: newItems
            };
        });
    }

    const handleCheckout = async () => {
        try {
            const stripeCheckoutURL: string = await OrderService.checkoutCart();
            window.location.href = stripeCheckoutURL;
        } catch (error) {
            navigate(`/error?messages=Could not checkout.&messages=Please try again later.`);
        }
    }

    return (
        <>
            <h1>Cart</h1>
            {cart ? (
                Object.entries(cart.items).length > 0 ? (
                    <ul className='cart bubble'>
                        {Object.entries(cart.items).map(([id, item]) => (
                            <CartItemDisplay
                                key={id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemoveItem={handleRemoveItem}
                            />
                        ))}
                        <li className='cart-item'>
                            <span>Free Shipping</span>
                            <span>$0.00</span>
                        </li>
                        <li className='order-total'>
                            <div></div>
                            <div className='col'>
                                <strong>Order Total</strong>
                                <span>{`$${totalPrice.toFixed(2)}`}</span>
                                <button onClick={handleCheckout}>Checkout</button>
                            </div>
                        </li>
                    </ul>
                ) : (
                    <Link to="/products" className="bubble">
                        <p>There are no items in your cart!</p>
                    </Link>
                )

            ) : (
                <Loader loading={cart} />
            )
            }
        </>
    );
}