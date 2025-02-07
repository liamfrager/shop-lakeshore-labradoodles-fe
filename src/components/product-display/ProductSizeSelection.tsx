import { Color } from "../../types";

interface ProductSizeSelectionProps {
    sizes: string[],
    onChange: (size: string) => void,
}

export default function ProductSizeSelection(props: ProductSizeSelectionProps) {
    return (
        <select onChange={(e) => props.onChange(e.target.value)}>
            {props.sizes.map(size => <option key={size} value={size}>{size}</option>)}
        </ select>
    );
};