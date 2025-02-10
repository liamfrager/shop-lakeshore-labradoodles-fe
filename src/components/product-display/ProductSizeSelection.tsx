interface ProductSizeSelectionProps {
    sizes: string[],
    sizePrices: { [size: string]: number },
    onChange: (size: string) => void,
}

export default function ProductSizeSelection(props: ProductSizeSelectionProps) {
    return (
        <select onChange={(e) => props.onChange(e.target.value)}>
            {props.sizes.map(size => {
                const priceIncrease: number = props.sizePrices[size] - props.sizePrices[props.sizes[0]];
                return (
                    <option key={size} value={size}>
                        {size}
                        {priceIncrease > 0 && ` (+$${priceIncrease.toFixed(2)})`}
                    </option>
                )
            })}
        </ select>
    );
};