import Image from "next/image";
import { useRouter } from "next/router";

import MainLayout from "../../../components/MainLayout";

const Checkout = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="flex justify-center w-full mb-8">
        <div className="p-4 w-full max-w-[550px] sm:border sm:mt-[50px]">
          <header className="mb-4">
            <h1>
              <span className="uppercase font-semibold">Checkout</span> -
              Product name
            </h1>
          </header>
          <div className="flex gap-3">
            <div>
              <Image
                loader={() => "https://picsum.photos/200/300"}
                src="https://picsum.photos/200/300"
                width={100}
                height={100}
                alt="Product image"
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              <span>Product name</span>
              <div className="flex justify-end items-center gap-2">
                <span className="font-semibold text-lg">Rp50.000,00</span>
                <span>&times;1</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <form action="" className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="wa-number">WhatsApp number</label>
                <input
                  type="text"
                  id="wa-number"
                  placeholder="Enter your WhatsApp number"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address">Address</label>
                <textarea
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
                <select id="payment-method">
                  <option value="cash-on-delivery">
                    Cash On Delivery (COD)
                  </option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              <div className="mt-2 border p-2">
                <ul className="flex flex-col gap-2">
                  <li className="flex justify-between items-center">
                    <span>Product price</span>
                    <span className="font-semibold">Rp50.000,00</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Somthing price</span>
                    <span className="font-semibold">Rp2.000,00</span>
                  </li>
                </ul>
              </div>
              <div className="border p-2 flex justify-between items-center">
                <span>Total price</span>
                <span className="font-semibold">Rp52.000,00</span>
              </div>
              <button className="w-full border mt-2 py-2 uppercase font-semibold">Checkout</button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
