export type Product = {
    id: number, // Printful product ID
    name: string,
    description: string,
    image: string,
    previewImages: { [color: string]: string[] },
    sizePrices: { [size: string]: number},
    colors: Color[],
    sizes: string[],
    variantIDs: VariantIDMap,
    category: string | null,
};

export type VariantIDMap = { [color: string]: { [size: string]: number } };

export type Variant = {
    id: number, // Printful variant ID
    name: string,
    retail_price: number,
    color: Color,
    size: string,
    files: { thumbnail_url: string }[],
};

export type Color = {
    name: string,
    code: string,
};

export type Order = {
    recipient: {
        name: string | null | undefined,
        address1: string | null | undefined,
        address2: string | null | undefined,
        city: string | null | undefined,
        state_code: string | null | undefined,
        country_code: string | null | undefined,
        zip: string | null | undefined,
        phone: string | null | undefined,
        email: string | null | undefined,
    },
    items: {
        sync_variant_id: number,
        quantity: number,
    }[],
    packing_slip: {
        email: string,
        phone: string,
        message: string,
        logo_url: string,
        store_name: string,
    },
}

export type CartData = {
    items: { [id: number]: number },
}

export type Cart = {
    items: { [id: number]: CartItem },
}

export type CartItem = {
    id: number,
    name: string,
    price: number,
    img?: string,
    quantity: number,
}