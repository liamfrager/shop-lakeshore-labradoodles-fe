import { useEffect, useRef, useState } from 'react';
import './ProductCategories.css';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import PeekABooMenu from '../menus/PeekABooMenu';

interface ProductCategoriesProps {
    categories: string[],
    selectedCategory: string,
    onCategorySelect: (category: string) => void,
}

export default function ProductCategories(props: ProductCategoriesProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isStuck, setIsStuck] = useState<boolean>(false);
    const [placeholderHeight, setPlaceholderHeight] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                const em = parseFloat(getComputedStyle(document.documentElement).fontSize);
                if (window.scrollY >= 9 * em) {
                    if (!isStuck) {
                        setPlaceholderHeight(menuRef.current.offsetHeight + 32);
                        setIsStuck(true);
                    }
                } else {
                    if (isStuck) {
                        setIsStuck(false);
                        setPlaceholderHeight(0);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isStuck]);

    return (
        <>
            <div style={{ height: placeholderHeight }}></div>
            <PeekABooMenu
                ref={menuRef}
                isPeekABoo={isStuck}
                menuItems={[{ name: 'All Products' }, ...props.categories.map(category => ({ name: category }))]}
                selectedMenuItem={props.selectedCategory}
                onMenuItemSelect={props.onCategorySelect}
                peekABooMenuIcon={faSliders}
                peekABooDirection='right'
                peekStyle={{
                    position: 'fixed',
                    inset: '9em 1em auto auto',
                }}
                booStyle={{ marginBottom: '2em' }}
            />
        </>
    )
}