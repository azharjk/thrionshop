import { SyntheticEvent, useState } from "react";
import { GetServerSideProps, NextPage } from "next";

import { useForm, SubmitHandler } from "react-hook-form";

import { OrderDetailResponse, PaymentMethod } from "../../../interfaces/order";
import { Product, ProductDetailResponse } from "../../../interfaces/product";
import { CheckoutReceipt } from "../../../interfaces/checkout";
import { AxiosInstance } from "../../../utils/axios";
import { toRupiah } from "../../../utils/currency";
import MainLayout from "../../../components/MainLayout";
import HorizontalProductCard from "../../../components/HorizontalProductCard";
import CheckoutModal from "../../../components/CheckoutModal";
import CheckoutConfirmationModal from "../../../components/CheckoutConfirmationModal";
import LoadingCheckoutReceipt from "../../../components/LoadingCheckoutReceipt";

interface CheckoutProps {
  product: Product;
}

interface PriceItem {
  name: string;
  title: string;
  amount: number;
  amountHtml: string;
}

interface CheckoutForm {
  name: string;
  whatsAppNumber: string;
  address: string;
  paymentMethod: PaymentMethod;
}

interface CheckoutRequest {
  product_id: number;
  customer_name: string;
  whatsapp_number: string;
  address: string;
  total_price: number;
  payment_method: PaymentMethod;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await (
    await AxiosInstance()
  ).get<ProductDetailResponse>(`/cms/products/${params?.pid}`);

  return {
    props: {
      product: data.data,
    },
  };
};

const Checkout: NextPage<CheckoutProps> = ({ product }) => {
  const { id, title, price, price_html, images } = product;

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [checkoutRequest, setCheckoutRequest] = useState<CheckoutRequest>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCheckoutReceiptLoading, setIsCheckoutReceiptLoading] =
    useState(false);
  const [checkoutReceipt, setCheckoutReceipt] = useState<CheckoutReceipt>();

  const [prices, setPrices] = useState<PriceItem[]>([
    {
      title: "Product price",
      name: "product_price",
      amount: price,
      amountHtml: price_html,
    },
  ]);

  const { handleSubmit, register } = useForm<CheckoutForm>();
  const [whatsAppNumber, setWhatsAppNumber] = useState("");

  const sumTotalPrice = () => {
    let sum = 0;

    prices.forEach((price) => {
      sum += price.amount;
    });

    return sum;
  };

  const onWhatsAppNumberChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    if (value.length === 0) {
      setWhatsAppNumber(value);
      return;
    }

    if (!regex.test(value)) {
      return;
    }

    setWhatsAppNumber(e.currentTarget.value);
  };

  const onSubmitWithConfirmation: SubmitHandler<CheckoutForm> = async ({
    name,
    address,
    paymentMethod,
  }) => {
    setCheckoutRequest({
      product_id: id,
      customer_name: name,
      whatsapp_number: whatsAppNumber,
      address,
      total_price: sumTotalPrice(),
      payment_method: paymentMethod,
    });
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const commitCheckout = async () => {
    closeConfirmationModal();

    setIsCheckoutReceiptLoading(true);

    // FIXME: Check if the request is not succeeded
    const { data } = await (
      await AxiosInstance()
    ).post<OrderDetailResponse>("/cms/orders", checkoutRequest!);

    setIsCheckoutReceiptLoading(false);

    setCheckoutReceipt({
      checkoutId: data.data.id,
      productName: data.data.product.title,
      paymentMethod: data.data.payment_method,
      totalPriceHtml: toRupiah(sumTotalPrice()),
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
      {checkoutReceipt ? (
        <CheckoutModal
          isOpen={isModalOpen}
          closeHandler={closeModal}
          checkoutReceipt={checkoutReceipt}
        />
      ) : null}
      <CheckoutConfirmationModal
        isOpen={showConfirmationModal}
        onApprove={commitCheckout}
        onCancel={closeConfirmationModal}
      />
      <div className="flex justify-center w-full mb-8">
        <div className="p-4 w-full max-w-[550px] sm:border sm:mt-[50px] relative">
          {isCheckoutReceiptLoading ? <LoadingCheckoutReceipt /> : null}
          <header className="mb-4">
            <h1>
              <span className="uppercase font-semibold">Checkout</span> -{" "}
              {title}
            </h1>
          </header>
          <HorizontalProductCard
            src={images[0].src}
            alt={images[0].alt}
            title={title}
            price_html={price_html}
          />
          <div className="mt-4">
            <form
              onSubmit={handleSubmit(onSubmitWithConfirmation)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="wa-number">WhatsApp number</label>
                <input
                  {...register("whatsAppNumber", {
                    required: true,
                  })}
                  onChange={onWhatsAppNumberChange}
                  value={whatsAppNumber}
                  type="text"
                  id="wa-number"
                  placeholder="Enter your WhatsApp number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address">Address</label>
                <textarea
                  {...register("address", { required: true })}
                  className="resize-none h-[100px]"
                  placeholder="Enter your address"
                  id="address"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label
                  className="uppercase font-semibold mt-3 mb-2"
                  htmlFor="payment-method"
                >
                  Payment method
                </label>
                <select id="payment-method" {...register("paymentMethod")}>
                  <option value="COD">Cash On Delivery (COD)</option>
                  <option value="TRANSFER">Transfer</option>
                </select>
              </div>
              <div className="mt-2 border p-2">
                <ul className="flex flex-col gap-2">
                  {prices.map((price, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{price.title}</span>
                      <span className="font-semibold">{price.amountHtml}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border p-2 flex justify-between items-center">
                <span>Total price</span>
                <span className="font-semibold">
                  {toRupiah(sumTotalPrice())}
                </span>
              </div>
              <button className="w-full border mt-2 py-2 uppercase font-semibold">
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
