import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import './PeekABooMenu.css';

interface MenuItem {
    name: string,
    route?: string,
    icon?: IconProp,
    badge?: number | string,
}

interface PeekABooMenuProps {
    isPeekABoo: boolean,
    menuItems: MenuItem[],
    selectedMenuItem: string,
    onMenuItemSelect: (menuItem: string) => void,
    peekABooMenuIcon?: IconProp,
    peekABooOnMobile?: boolean
    peekABooDirection: 'left' | 'right',
    peekStyle?: React.CSSProperties,
    booStyle?: React.CSSProperties,
    ref?: React.RefObject<HTMLDivElement | null>
}
export default function PeekABooMenu(props: PeekABooMenuProps) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [isPeekABoo, setIsPeekABoo] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const defaultRef = useRef<HTMLDivElement>(null);
    const ref = props.ref ?? defaultRef;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const menu = ref.current;
            const target = (e.target as Element)
            if ((menu && !menu.contains(target)) || target.closest('.peek-a-boo-list-item')) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showMenu, ref]);

    useEffect(() => {
        if (props.peekABooOnMobile !== false && isMobile) {
            setIsPeekABoo(true);
        } else {
            setIsPeekABoo(props.isPeekABoo);
        }
        if (isPeekABoo) {
            ref.current?.classList.remove('transition-visibility');
        } else {
            setTimeout(() => ref.current?.classList.add('transition-visibility'), 200);
        }
    }, [props.isPeekABoo, isMobile, props.peekABooOnMobile, isPeekABoo, ref]);

    // Peek-A-Boo on mobile
    useEffect(() => {
        if (props.peekABooOnMobile !== false) {
            const checkSize = () => {
                setIsMobile(window.innerWidth < 600);
            };

            checkSize();
            window.addEventListener("resize", checkSize);
            return () => window.removeEventListener("resize", checkSize);
        }
    }, [props.peekABooOnMobile]);

    const handlePeekABooToggle = () => {
        setShowMenu((prev) => !prev);
    }

    return (
        <div
            ref={ref}
            className={`
                peek-a-boo-container
                ${isPeekABoo ? 'peek' : 'boo'}
                ${props.peekABooDirection === 'right' ? 'right' : 'left'}
                col
            `}
            style={isPeekABoo ? props.peekStyle : props.booStyle}
        >
            <span
                className={`
                    peek-a-boo-toggle
                    ${showMenu ? 'selected' : ''}
                    bubble
                `}
                onClick={handlePeekABooToggle}
            >
                <FontAwesomeIcon icon={props.peekABooMenuIcon || faBars} />
            </span>
            <ul className={`
                peek-a-boo-list
                ${isPeekABoo ? 'col' : 'row'}
                ${showMenu ? '' : 'hide-menu'}
                bubble
            `}>
                {props.menuItems.map(item => (
                    <li
                        key={item.name}
                        className={`
                            peek-a-boo-list-item
                            ${item.name === props.selectedMenuItem ? 'selected' : ''}
                            row
                        `}
                        onClick={() => props.onMenuItemSelect(item.name)}
                    >
                        {item.icon && <FontAwesomeIcon icon={item.icon} />}
                        {item.name}
                        <span className='badge'>{item.badge}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}