import type { NextPage } from "next";
import Image from "next/image";

import ProductCard from "../components/ProductCard";

const LandingPage: NextPage = () => {
  return (
    <>
      <header className="px-4 grid place-items-center">
        <div className="w-100 py-[90px] flex justify-center">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="A Logo of Thrion"
          />
        </div>
        <div className="max-w-md">
          <p className="text-center font-light text-2xl">
            This should be a description of what Thrion is
          </p>
        </div>
      </header>
      <main className="mt-[80px] mb-10">
        <ul className="grid gap-6">
          <li>
            <a href="">
              <ProductCard
                src="/product_demo.jpeg"
                alt="Thrion product"
                name="Product name 1"
                price="Rp5.000.000,00"
              />
            </a>
          </li>
          <li>
            <a href="">
              <ProductCard
                src="/product_demo.jpeg"
                alt="Thrion product"
                name="Product name 2"
                price="Rp5.000.000,00"
              />
            </a>
          </li>
          <li>
            <a href="">
              <ProductCard
                src="/product_demo.jpeg"
                alt="Thrion product"
                name="Product name 3"
                price="Rp5.000.000,00"
              />
            </a>
          </li>
        </ul>
      </main>
    </>
  );
};

export default LandingPage;
