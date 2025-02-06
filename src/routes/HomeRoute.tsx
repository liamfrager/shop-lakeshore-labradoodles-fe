import { Link } from "react-router-dom";
import { Product } from "../types";
import ShopService from "../services/ShopService";
import { useEffect, useState } from "react";

export default function HomeRoute() {

    let [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        ShopService.getAllProducts().then(data => setProducts(data));
    }, []);


    return (
        <>
            <h1>Lakeshore Labradoodles Merch Shop!</h1>
            {products.length > 0 &&
                <div>
                    {products.map(product => (
                        <div>
                            <Link to={`/product/${product.id}`}>
                                <div>
                                    <img src={product.image} alt={product.name} />
                                    <div>
                                        <span>{product.name}</span>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div >
            }
        </>
    );
}