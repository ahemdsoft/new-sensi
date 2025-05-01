export type TCartItem = {
    id: string;
    name: string;
    discountPrice: number;
    stock: number;
    price: number;
    image: string;
    slug: string;
    type: string;
    mobile?: string;
    brand?: string;
    file?: File;
  };