import { NextPage } from "next";
import Link from "next/link";
import ReactModal from "react-modal";

import { CheckoutReceipt } from "../interfaces/checkout";

interface CheckoutModalProps {
  isOpen: boolean;
  closeHandler: () => void;
  // FIXME: This fix the typescript parser
  checkoutReceipt: CheckoutReceipt | undefined;
}

ReactModal.setAppElement("#__next");

const CheckoutModal: NextPage<CheckoutModalProps> = ({
  isOpen,
  closeHandler,
  checkoutReceipt,
}) => {
  const { checkoutId, productName, paymentMethod, totalPriceHtml } =
    checkoutReceipt!;

  return (
    <ReactModal
      className="absolute p-4 top-0 bottom-0 left-0 right-0"
      isOpen={isOpen}
    >
      <div className="bg-slate-700 p-4 w-full max-w-[420px] text-white rounded-sm shadow-md mx-auto mt-16">
        <header>
          <h1 className="text-white text-lg text-center">
            Yeay, successfully purchased product:{" "}
            <span className="font-semibold">{productName}</span>
          </h1>
        </header>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="uppercase">Checkout ID</span>
            <span className="font-semibold">{checkoutId}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Product</span>
            <span className="font-semibold">{productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Payment method</span>
            <span className="font-semibold">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Total price</span>
            <span className="font-semibold">{totalPriceHtml}</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={closeHandler}
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
      </div>
    </ReactModal>
  );
};

export default CheckoutModal;
