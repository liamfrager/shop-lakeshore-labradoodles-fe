import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import './Header.css';
import { useEffect, useState } from "react";
import { faShirt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartService from "../../services/CartService";
import PeekABooMenu from "../menus/PeekABooMenu";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        setSelectedMenuItem(location.pathname.split('/')[1]);
        setCartCount(CartService.getCartCount());
    }, [location]);

    const menuItems = [
        { name: 'Products', route: 'products', icon: faShirt },
        { name: 'Cart', route: 'cart', icon: faShoppingCart, badge: cartCount },
    ]

    const handleMenuItemSelect = (menuItem: string) => {
        navigate(`/${menuItems.find(item => item.name === menuItem)?.route}`);
    }

    return (
        <nav className='row'>
            <Link to="/">
                <Logo />
            </Link>
            <PeekABooMenu
                isPeekABoo={false}
                menuItems={menuItems}
                selectedMenuItem={selectedMenuItem}
                onMenuItemSelect={handleMenuItemSelect}
                peekABooOptions={{
                    peekABooDirection: 'right',
                }}
            />
        </nav>
    )
}