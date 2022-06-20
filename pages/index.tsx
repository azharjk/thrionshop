import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { Product, ProductsResponse } from "../interfaces/product";
import { AxiosInstance } from "../utils/axios";

import Header from "../components/Header";
import Contact from "../components/Contact";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const LandingPage: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // FIXME: Consume showcase products instead of all products
      const { data } = await (
        await AxiosInstance()
      ).get<ProductsResponse>("/products");

      setProducts(data.data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="mt-[80px] mb-10 sm:flex sm:justify-center">
        {products.length < 1 ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
            {products.map(
              ({ title, price_html, thumbnail, thumbnail_alt }, idx) => (
                <li key={idx}>
                  <a href="">
                    <ProductCard
                      src={thumbnail}
                      alt={thumbnail_alt}
                      name={title}
                      price={price_html}
                    />
                  </a>
                </li>
              )
            )}
          </ul>
        )}
      </main>
      <Contact />
      <footer className="px-4 py-6 text-center bg-black">
        <a
          className="text-sm text-white"
          href="https://www.flaticon.com/free-icons/code"
          title="code icons"
        >
          Code icons created by Freepik - Flaticon
        </a>
      </footer>
    </>
  );
};

export default LandingPage;
