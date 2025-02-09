import { Link } from "react-router-dom";
import { Product } from "../types";
import ShopService from "../services/ShopService";
import { useEffect, useState } from "react";
import ProductCard from "../components/product-display/ProductCard";
import DynamicDisplay from "../components/ui/DynamicDisplay";
import Loader from "../components/ui/Loader";

export default function HomeRoute() {

    let [products, setProducts] = useState<Product[]>();


    useEffect(() => {
        ShopService.getAllProducts().then(data => setProducts(data));
    }, []);


    return (
        <>
            <h1>Products</h1>
            {products ? (
                <>
                    {products.length > 0 ? (
                        <DynamicDisplay>
                            {products.map(product => <ProductCard key={product.id} product={product} />)}
                        </DynamicDisplay>
                    ) : (
                        <span>Could not load any items...</span>
                    )}
                </>
            ) : (
                < Loader />
            )}
        </>
    )
}