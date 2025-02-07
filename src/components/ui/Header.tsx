import { Link } from "react-router-dom";
import Logo from "./Logo";
import './Header.css';

export default function Header() {

    const menuItems: MenuItem[] = [
        { name: 'Home', route: '/', icon: '' },
        { name: 'Cart', route: '/cart', icon: '' },
    ]

    return (
        <nav>
            <Link to="/">
                <Logo />
            </Link>
            <ul>
                {menuItems.map(menuItem => (
                    <Link to={menuItem.route} key={menuItem.name}>
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