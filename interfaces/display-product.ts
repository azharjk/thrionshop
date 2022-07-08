export interface DisplayProduct {
  id: number;
  product: Product;
  rate: number;
}

export interface DisplayProductsResponse {
  data: DisplayProduct[];
}
