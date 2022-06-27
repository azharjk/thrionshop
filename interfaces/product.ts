export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  price_html: string;
  thumbnail: string;
  thumbnail_alt: string;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductsResponse {
  data: Product[];
}

export interface ProductDetailResponse {
  data: Product;
}
