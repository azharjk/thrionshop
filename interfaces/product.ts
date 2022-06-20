export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  price_html: string;
  thumbnail: string;
  thumbnail_alt: string;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  data: Product[];
}
