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

    useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                const rect = menuRef.current.getBoundingClientRect();
                if (rect.top <= window.scrollY) {
                    setIsStuck(true);
                } else {
                    setIsStuck(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
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
    )
}