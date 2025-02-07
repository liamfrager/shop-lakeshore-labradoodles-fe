import { CartItem } from "../../types";

interface CartItemDisplayProps {
    item: CartItem,
    onQuantityChange: (itemID: number, newQuantity: number) => void,
}

export default function CartItemDisplay(props: CartItemDisplayProps) {
    return (
        <>
            <img src={props.item.img} alt={props.item.name} />
            <p>{props.item.name}</p>
            <p>{`$${props.item.price}`}</p>
            <span>x</span>
            <select onChange={(e) => props.onQuantityChange(props.item.id, Number(e.target.value))}>
                { }
                {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1} selected={props.item.quantity === i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            <p>{`$${props.item.price * props.item.quantity}`}</p>
        </>
    );
}