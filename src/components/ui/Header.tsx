import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import './Header.css';
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShirt, faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import CartService from "../../services/CartService";

export default function Header() {
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);

    const [selectedMenuItem, setSelectedMenuItem] = useState<string>();
    const [cartCount, setCartCount] = useState<number>(0);
    const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);

    useEffect(() => {
        setSelectedMenuItem(location.pathname.split('/')[1]);
        setCartCount(CartService.getCartCount());
    }, [location]);


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const menu = menuRef.current;
            const target = (e.target as Element)
            if (menu && !menu.contains(target) || target.closest('.menu-item')) {
                setShowDropdownMenu(false);
            }
        };

        if (showDropdownMenu) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showDropdownMenu]);

    const handleMenuToggle = () => {
        setShowDropdownMenu((prev) => !prev);
    };

    const menuItems: MenuItem[] = [
        { name: 'Products', route: 'products', icon: faShirt },
        { name: 'Cart', route: 'cart', icon: faShoppingCart },
    ]

    return (
        <nav className='row'>
            <Link to="/">
                <Logo />
            </Link>
            <div className='menu-container' ref={menuRef}>
                <FontAwesomeIcon icon={faBars} className={`menu-button bubble ${showDropdownMenu ? 'selected' : ''}`} onClick={handleMenuToggle} />
                <ul className={`bubble ${showDropdownMenu ? '' : 'hide-menu'}`}>
                    {menuItems.map(menuItem => (
                        <li key={menuItem.name}>
                            <Link to={`/${menuItem.route}`} className={`row menu-item ${selectedMenuItem === menuItem.route && 'selected'}`}>
                                <FontAwesomeIcon icon={menuItem.icon} />
                                {menuItem.name}
                                {menuItem.name === 'Cart' && <span className="cart-count">{cartCount}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

interface MenuItem {
    name: string,
    route: string,
    icon: IconDefinition,
}