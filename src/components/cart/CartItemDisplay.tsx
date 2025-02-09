import { CartItem } from "../../types";
import './CartItemDisplay.css';

interface CartItemDisplayProps {
    item: CartItem,
    onQuantityChange: (itemID: number, newQuantity: number) => void,
}

export default function CartItemDisplay(props: CartItemDisplayProps) {
    return (
        <li className='cart-item'>
            <div className='row'>
                <img src={props.item.img} alt={props.item.name} />
                <div className='col item-details'>
                    <strong>{props.item.name}</strong>
                    <span>{`$${props.item.price.toFixed(2)}`}</span>
                    <span>×
                        <select
                            className='quantity-select'
                            value={props.item.quantity}
                            onChange={(e) => props.onQuantityChange(props.item.id, Number(e.target.value))}
                        >
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </span>
                </div>
            </div>
            <span className='item-price'>{`$${(props.item.price * props.item.quantity).toFixed(2)}`}</span>
        </li>
    );
}