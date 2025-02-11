import { SetStateAction, useEffect, useState } from "react";

interface ProductSizeSelectionProps {
    sizes: string[],
    sizePrices: { [size: string]: number },
    onChange: (size: string) => void,
}

export default function ProductSizeSelection(props: ProductSizeSelectionProps) {
    const [selectedSize, setSelectedSize] = useState<string>(props.sizes[0]);

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const select = e.target;
        const newSize = select.value;
        const selected = document.createElement('option');
        selected.value = newSize;
        selected.textContent = newSize;
        select.appendChild(selected)
        select.selectedIndex = select.options.length - 1;
        setSelectedSize(newSize);
        props.onChange(newSize);
    }

    const handleOnClick = (e: React.MouseEvent<HTMLSelectElement>) => {
        const select = e.currentTarget;
        if (select.options.length > props.sizes.length) {
            select.removeChild(select.lastChild!);
            select.selectedIndex = props.sizes.indexOf(selectedSize);
        }
    }

    return (
        <select onChange={handleOnChange} onMouseDown={handleOnClick}>
            {props.sizes.map(size => {
                const priceIncrease: number = props.sizePrices[size] - props.sizePrices[props.sizes[0]];
                const displayText = priceIncrease > 0 ? `${size} (+$${priceIncrease.toFixed(2)})` : size;
                return (
                    <option key={size} value={size}>
                        {displayText}
                    </option>
                )
            })}
        </ select>
    );
};