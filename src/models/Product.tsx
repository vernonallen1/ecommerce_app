export interface ProductItem {
  product_id: string;
  product: string;
  price: number;
  quantity: number;
  store: string;
  description: string;
  discount: number;
}

export interface ProductVariant {
  id: string;
  variant: object;
  price: number;
  quantity: number;
}

export interface ProductWithVariants {
  product: ProductItem;
  variants: Array<ProductVariant>
}