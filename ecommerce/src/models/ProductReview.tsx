export interface ProductReview {
    name: string;
    review: string;
    images?: string[];
    time: string | Date;
    stars: number;
}