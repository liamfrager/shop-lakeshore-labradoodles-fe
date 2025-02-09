import { useEffect, useState } from "react";
import { Color } from "../../types";
import './ProductColorSelection.css';

interface ProductColorSelectionProps {
    colors: Color[],
    onChange: (color: Color) => void,
}

export default function ProductColorSelection(props: ProductColorSelectionProps) {

    const [colors, setColors] = useState<Color[]>();
    const [selectedColor, setSelectedColor] = useState<Color>();

    const handleColorChange = (color: Color) => {
        setSelectedColor(color);
        props.onChange(color);
    }

    useEffect(() => {
        if (colors) {
            if (colors.length > 0) setSelectedColor(colors[0]);
        } else {
            setColors(props.colors)
        }
    }, [colors]);


    return (
        <>
            <span>{selectedColor?.name}</span>
            <div className="color-selector">
                {colors && colors.map(color => (
                    <div key={color.name} className={`color-option ${selectedColor === color && 'selected'}`}>
                        <input
                            type="radio"
                            name="color"
                            id={color.name}
                            value={color.name}
                            onChange={() => handleColorChange(color)}
                        />
                        <label
                            htmlFor={color.name}
                            title={color.name}
                            className="shadow"
                            style={{ backgroundColor: color.code }}
                        ></label>
                    </div>
                ))}
            </div>
        </>
    );
};