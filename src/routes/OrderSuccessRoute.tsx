import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccessRoute() {

    const navigate = useNavigate();

    useEffect(() => {
        const checkoutInProgress = localStorage.getItem('checkoutInProgress') === 'True';
        if (!checkoutInProgress) {
            navigate('/');
        } else {
            localStorage.removeItem('checkoutInProgress');
            localStorage.removeItem('cart');
        }
    }, [navigate]);

    return (
        <>
            <h1>Thank you for your purchase! 🐾</h1>
            <h3>Your order is being processed and will be shipped soon.</h3>
            <h3>Check your email for order details.</h3>
        </>
    );
}