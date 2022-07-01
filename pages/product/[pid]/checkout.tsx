import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "react-modal";

import { OrderDetailResponse, PaymentMethod } from "../../../interfaces/order";
import { AxiosInstance } from "../../../utils/axios";
import { toRupiah } from "../../../utils/currency";
import MainLayout from "../../../components/MainLayout";
import { Product, ProductDetailResponse } from "../../../interfaces/product";
import HorizontalProductCard from "../../../components/HorizontalProductCard";

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await (
    await AxiosInstance()
  ).get<ProductDetailResponse>(`/products/${params?.pid}`);

  return {
    props: {
      product: data.data,
    },
  };
};

Modal.setAppElement("#__next");

const Checkout: NextPage<CheckoutProps> = ({ product }) => {
  const { id, title, price, price_html, images } = product;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prices, setPrices] = useState<PriceItem[]>([
    {
      title: "Product price",
      name: "product_price",
      amount: price,
      amountHtml: price_html,
    },
  ]);

  const { handleSubmit, register } = useForm<CheckoutForm>();

  const sumTotalPrice = () => {
    let sum = 0;

    prices.forEach((price) => {
      sum += price.amount;
    });

    return sum;
  };

  const onSubmit: SubmitHandler<CheckoutForm> = async ({
    name,
    whatsAppNumber,
    address,
    paymentMethod,
  }) => {
    const body = {
      product_id: id,
      customer_name: name,
      whatsapp_number: whatsAppNumber,
      address,
      total_price: sumTotalPrice(),
      payment_method: paymentMethod,
    };

    // FIXME: Check if the request is not succeeded
    const { data } = await (
      await AxiosInstance()
    ).post<OrderDetailResponse>("/orders", body);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
      {/* FIXME: Make modal size responsive but in a better way */}
      <Modal
        className="absolute text-white p-4 rounded-sm shadow-lg bg-slate-700 top-[3rem] left-[2rem] right-[2rem] sm:left-[10rem] sm:right-[10rem]"
        isOpen={isModalOpen}
      >
        <header>
          <h1 className="text-white text-lg text-center">
            Yeay, successfully purchased product:{" "}
            <span className="font-semibold">Air Jordan 7x</span>
          </h1>
        </header>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="uppercase">Checkout ID</span>
            <span className="font-semibold">1</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Product</span>
            <span className="font-semibold">Air Jordan 7x</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Payment method</span>
            <span className="font-semibold">TRANSFER</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Total price</span>
            <span className="font-semibold">Rp170.000</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={closeModal}
            className="block w-full border mt-2 py-2 uppercase font-semibold rounded-sm"
          >
            Okay
          </button>
          <Link href="/">
            <a
              className="block w-full bg-slate-500 border mt-2 py-2 uppercase font-semibold rounded-sm text-center"
              href="/"
            >
              See other products
            </a>
          </Link>
        </div>
      </Modal>
      <div className="flex justify-center w-full mb-8">
        <div className="p-4 w-full max-w-[550px] sm:border sm:mt-[50px]">
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
              onSubmit={handleSubmit(onSubmit)}
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
                    pattern: /^\d+$/,
                  })}
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
