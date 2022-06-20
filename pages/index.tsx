import type { NextPage } from "next";

import Header from "../components/Header";
import Contact from "../components/Contact";
import ProductCard from "../components/ProductCard";

const LandingPage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="mt-[80px] mb-10 sm:flex sm:justify-center">
        <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
          {Array.apply(null, Array(9)).map((v, idx) => (
            <li key={idx}>
              <a href="">
                <ProductCard
                  src="/product_demo.jpeg"
                  alt="Thrion product"
                  name="Product name 1"
                  price="Rp5.000.000,00"
                />
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Contact />
      <footer className="px-4 py-6 text-center bg-black">
        <a className="text-sm text-white" href="https://www.flaticon.com/free-icons/code" title="code icons">
          Code icons created by Freepik - Flaticon
        </a>
      </footer>
    </>
  );
};

export default LandingPage;
