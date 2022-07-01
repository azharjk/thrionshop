import { Product } from "./product";

export enum StatusType {
  NEW = "NEW",
  SHIPPED = "SHIPPED",
  DELIEVERED = "DELIEVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  COD = "COD",
  TRANSFER = "TRANSFER",
}

export interface Order {
  id: number;
  product: Product;
  customer_name: string;
  whatsapp_number: string;
  address: string;
  status: StatusType;
  payment_method: PaymentMethod;
  total_price: number;
  total_price_html: string;
}

export interface OrderDetailResponse {
  data: Order;
}
