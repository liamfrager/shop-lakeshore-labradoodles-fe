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
            <h1>Congratulations!</h1>
            <h3>Your purchase will be shipped shortly.</h3>
        </>
    );
}