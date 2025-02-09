import { Link } from "react-router-dom";
import { Product } from "../types";
import ShopService from "../services/ShopService";
import { useEffect, useState } from "react";
import ProductCard from "../components/product-display/ProductCard";
import DynamicDisplay from "../components/ui/DynamicDisplay";
import Loader from "../components/ui/Loader";
import ProductCategories from "../components/product-display/ProductCategories";

export default function ProductsRoute() {

    const [allProducts, setAllProducts] = useState<Product[] | undefined | null>(undefined);
    const [displayedProducts, setDisplayedProducts] = useState<Product[] | undefined | null>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
    const [allCategories, setAllCategories] = useState<string[]>([]);


    useEffect(() => {
        ShopService.getAllProducts().then(data => {
            setAllProducts(data);
            setDisplayedProducts(data);
            if (data) {
                // Get categories
                let existsOthers = false;
                const categories = new Set<string>();
                data.forEach(product => {
                    if (product.category === null) {
                        existsOthers = true;
                        return;
                    }
                    categories.add(product.category);
                });
                const categoriesArray = Array.from(categories);
                if (existsOthers) categoriesArray.push('Other');
                setAllCategories(categoriesArray);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All Products') {
            setDisplayedProducts(allProducts);
        } else if (selectedCategory === 'Other') {
            setDisplayedProducts(allProducts?.filter(product => product.category === null));
        } else {
            setDisplayedProducts(allProducts?.filter(product => product.category === selectedCategory));
        }
    }, [selectedCategory]);


    return (
        <>
            <h1>Products</h1>
            {displayedProducts ? (
                <>
                    <ProductCategories categories={allCategories} selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
                    {displayedProducts.length > 0 ? (
                        <DynamicDisplay>
                            {displayedProducts.map(product => <ProductCard key={product.id} product={product} />)}
                        </DynamicDisplay>
                    ) : (
                        <span>Could not load any items...</span>
                    )}
                </>
            ) : (
                < Loader loading={displayedProducts} />
            )}
        </>
    )
}