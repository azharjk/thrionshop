import { PaymentMethod } from "./order";

export interface CheckoutReceipt {
  checkoutId: number;
  productName: string;
  paymentMethod: PaymentMethod;
  totalPriceHtml: string;
}
