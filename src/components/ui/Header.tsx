import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import './Header.css';
import { useEffect, useState } from "react";

export default function Header() {
    const location = useLocation();

    const [selectedMenuItem, setSelectedMenuItem] = useState<string>();

    useEffect(() => {
        setSelectedMenuItem(location.pathname.split('/')[1]);
    }, [location]);

    const menuItems: MenuItem[] = [
        { name: 'Products', route: 'products', icon: '' },
        { name: 'Cart', route: 'cart', icon: '' },
    ]

    return (
        <nav>
            <Link to="/">
                <Logo />
            </Link>
            <ul>
                {menuItems.map(menuItem => (
                    <Link to={`/${menuItem.route}`}
                        key={menuItem.name}
                        className={selectedMenuItem === menuItem.route ? 'selected' : ''}
                    >
                        <li>{menuItem.name}</li>
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

interface MenuItem {
    name: string,
    route: string,
    icon: string,
}