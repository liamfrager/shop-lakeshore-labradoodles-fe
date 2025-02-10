import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import './ProductImageDisplay.css';
import { Color } from "../../types";

interface ProductImageDisplayProps {
    images: string[];
    color: Color;
}

export default function ProductImageDisplay(props: ProductImageDisplayProps) {

    const [i, setI] = useState<number>(0);

    useEffect(() => {
        setI(0);
    }, [])

    return (
        <div className="bubble images-display col">
            <div className="thumbnails row">
                {props.images.map((image, index) => (
                    <img key={index} src={image} className="bubble" onClick={() => setI(index)} style={{ backgroundColor: props.color.code, opacity: i === index ? '.8' : '.5' }} />
                ))}
            </div>
            <div className="product-image-display">
                {props.images.length > 1 && <FontAwesomeIcon className="image-cycle-button" icon={faChevronCircleLeft} onClick={() => setI((i + props.images.length - 1) % props.images.length)} />}
                <img
                    src={props.images[i]}
                    alt="product preview"
                    style={{ backgroundColor: props.color.code }}
                />
                {props.images.length > 1 && <FontAwesomeIcon className="image-cycle-button" icon={faChevronCircleRight} onClick={() => setI((i + props.images.length + 1) % props.images.length)} />}
            </div>
        </div>
    )
}