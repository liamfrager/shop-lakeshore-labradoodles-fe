import { Color } from "../../types";

interface ProductColorSelectionProps {
    colors: Set<Color>,
    onChange: (color: Color) => void,
}

export default function ProductColorSelection(props: ProductColorSelectionProps) {
    return (
        <div>
            {Array.from(props.colors).map(color => (
                <>
                    <input
                        type="radio"
                        name="color"
                        value={color.name}
                        title={color.name}
                        onChange={() => props.onChange(color)}
                    />
                </>
            ))}
        </div>
    );
};