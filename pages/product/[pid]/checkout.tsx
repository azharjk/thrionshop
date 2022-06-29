import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

import { useForm, SubmitHandler } from "react-hook-form";

import { AxiosInstance } from "../../../utils/axios";
import { toRupiah } from "../../../utils/currency";
import MainLayout from "../../../components/MainLayout";
import { Product, ProductDetailResponse } from "../../../interfaces/product";

interface CheckoutProps {
  product: Product;
}

interface PriceItem {
  name: string;
  title: string;
  amount: number;
  amountHtml: string;
}

enum PaymentMethod {
  COD = "cash-on-delivery",
  TRANSFER = "transfer",
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

const Checkout: NextPage<CheckoutProps> = ({ product }) => {
  const { title, price, price_html, images } = product;

  const [prices, setPrices] = useState<PriceItem[]>([
    {
      title: "Product price",
      name: "product_price",
      amount: price,
      amountHtml: price_html,
    },
  ]);

  const { handleSubmit, register } = useForm<CheckoutForm>();

  const onSubmit: SubmitHandler<CheckoutForm> = (data) => console.log(data);

  const sumTotalPrice = () => {
    let sum = 0;

    prices.forEach((price) => {
      sum += price.amount;
    });

    return sum;
  };

  return (
    <MainLayout>
      <div className="flex justify-center w-full mb-8">
        <div className="p-4 w-full max-w-[550px] sm:border sm:mt-[50px]">
          <header className="mb-4">
            <h1>
              <span className="uppercase font-semibold">Checkout</span> -{" "}
              {title}
            </h1>
          </header>
          <div className="flex gap-3">
            <div>
              <Image
                loader={() => images[0].src}
                unoptimized
                src={images[0].src}
                width={100}
                height={100}
                alt={images[0].alt}
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              <span>{title}</span>
              <div className="flex justify-end items-center gap-2">
                <span className="font-semibold text-lg">{price_html}</span>
                <span>&times;1</span>
              </div>
            </div>
          </div>
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
                  <option value="cash-on-delivery">
                    Cash On Delivery (COD)
                  </option>
                  <option value="transfer">Transfer</option>
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
