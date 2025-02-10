import { useNavigate, useParams } from "react-router-dom";
import { Color, Product } from "../types";
import { useEffect, useState } from "react";
import ShopService from "../services/ShopService";
import ProductColorSelection from "../components/product-display/ProductColorSelection";
import ProductSizeSelection from "../components/product-display/ProductSizeSelection";
import CartService from "../services/CartService";
import ProductImageDisplay from "../components/product-display/ProductImageDisplay";
import './ProductRoute.css';
import Loader from "../components/ui/Loader";

export default function ProductRoute() {

    let params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null | undefined>(undefined);
    const [color, setColor] = useState<Color>();
    const [size, setSize] = useState<string>();
    const [price, setPrice] = useState<string>();

    useEffect(() => {
        ShopService.getProduct(Number(params.id)).then(data => {
            setProduct(data);
            if (data) {
                setColor(data.colors.values().next().value);
                setSize(data.sizes[0]);
            }
        }).catch(error => {
            navigate(`/error?title=${error.status}: ${error.statusText}&messages=${error.data.message}`);
        });
    }, [params.id]);

    useEffect(() => {
        setPrice(product && size ? product.sizePrices[size] : '0.00');
    }, [product, size]);

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        const variantID = product!.variantIDs[color!.name][size!];
        CartService.setItem(variantID, 1);
        navigate('/cart');
    }

    return (
        product ? (
            <>
                <h1>{product.name}</h1>
                <div className="dynamic-two-columns row">
                    {color && <ProductImageDisplay images={product.previewImages[color.name]} color={color} />}

                    <form onSubmit={handleAddToCart} className="product-form col bubble">
                        <h1>{`$${price}`}</h1>
                        <ProductColorSelection colors={product.colors} onChange={setColor} />
                        <ProductSizeSelection sizes={product.sizes} onChange={setSize} />
                        <button type="submit">Add to Cart</button>
                    </form>
                </div>
            </>
        ) : (
            <Loader />
        )
    );
}