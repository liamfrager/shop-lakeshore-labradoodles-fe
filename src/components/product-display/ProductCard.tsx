import { Link } from "react-router-dom";
import { Product } from "../../types";
import './ProductCard.css';

interface ProductCardProps {
    product: Product,
}

export default function ProductCard(props: ProductCardProps) {
    const product = props.product;

    return (
        <Link to={`/product/${product.id}`}>
            <div className="card">
                <img src={product.image} alt={product.name} />
                <div className="caption">
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                </div>
            </div>
        </Link>
    )
}