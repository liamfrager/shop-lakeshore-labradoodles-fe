import './ProductCategories.css';

interface ProductCategoriesProps {
    categories: string[],
    selectedCategory: string,
    onCategorySelect: (category: string) => void,
}

export default function ProductCategories(props: ProductCategoriesProps) {
    return (
        <div className="row product-categories">
            <h3
                key="All Products"
                className={`bubble product-category ${props.selectedCategory === 'All Products' && 'selected-category'}`}
                onClick={() => props.onCategorySelect('All Products')}
            >
                All Products
            </h3>
            {props.categories.map(category => (
                <h3
                    key={category}
                    className={`bubble product-category ${category === props.selectedCategory && 'selected-category'}`}
                    onClick={() => props.onCategorySelect(category)}
                >
                    {category}
                </h3>
            ))}
        </div>
    )
}