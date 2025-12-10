export interface CartModel {
    product_id: string;
    product_name: string;
    store_id: string;
    store_name: string;
    price: number;
    variant: object;
    variant_id: number;
    quantity_left: number;
    quantity: number;
    discount: number;
} 