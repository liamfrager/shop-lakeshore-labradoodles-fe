import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import './Header.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import CartService from "../../services/CartService";

export default function Header() {
    const location = useLocation();

    const [selectedMenuItem, setSelectedMenuItem] = useState<string>();
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        setSelectedMenuItem(location.pathname.split('/')[1]);
        setCartCount(CartService.getCartCount());
    }, [location]);

    const menuItems: MenuItem[] = [
        { name: 'Products', route: 'products', icon: faShirt },
        { name: 'Cart', route: 'cart', icon: faShoppingCart },
    ]

    return (
        <nav>
            <Link to="/">
                <Logo />
            </Link>
            <ul>
                {menuItems.map(menuItem => (
                    <li>
                        <Link to={`/${menuItem.route}`}
                            key={menuItem.name}
                            className={selectedMenuItem === menuItem.route ? 'selected' : ''}
                        >
                            <FontAwesomeIcon icon={menuItem.icon} />
                            {menuItem.name}
                            {menuItem.name === 'Cart' && <span className="cart-count">{` (${cartCount})`}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

interface MenuItem {
    name: string,
    route: string,
    icon: IconDefinition,
}