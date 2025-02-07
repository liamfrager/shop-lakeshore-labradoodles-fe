import { Link } from "react-router-dom"
import Logo from "./Logo"

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
                    <li key={menuItem.name}>
                        <Link to={menuItem.route} >
                            {menuItem.name}
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
    icon: string,
}