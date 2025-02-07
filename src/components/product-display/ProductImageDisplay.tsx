import { useEffect, useState } from "react";

interface ProductImageDisplayProps {
    images: string[];
}

export default function ProductImageDisplay(props: ProductImageDisplayProps) {

    const [i, setI] = useState<number>(0);

    useEffect(() => {
        setI(0);
    }, [])

    return (
        <div>
            {props.images.length > 1 && <span onClick={() => setI(i - 1)}>{"<"}</span>}
            <img
                style={{ maxWidth: '100%' }}
                src={props.images[i]}
                alt="product preview"
            />
            {props.images.length > 1 && <span onClick={() => setI(i + 1)}>{">"}</span>}
        </div>
    )
}