export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: any | undefined;
    thumbnail: any | undefined;
    category: string;
};

interface ProductQueryResponse {
    count: number,
    next: any,
    previous: any,
    results: Product[],
}