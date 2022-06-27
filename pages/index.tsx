import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";

import { Product, ProductsResponse } from "../interfaces/product";
import { AxiosInstance } from "../utils/axios";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import MainLayout from "../components/MainLayout";

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
    <MainLayout>
      <Header />
      <main className="mt-[80px] mb-10 sm:flex sm:justify-center">
        {products.length < 1 ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
            {products.map(
              ({ id, title, price_html, thumbnail, thumbnail_alt }) => (
                <li key={id}>
                  <Link href={`/product/${id}`}>
                    <a href={`/product/${id}`}>
                      <ProductCard
                        src={thumbnail}
                        alt={thumbnail_alt}
                        name={title}
                        price={price_html}
                      />
                    </a>
                  </Link>
                </li>
              )
            )}
          </ul>
        )}
      </main>
    </MainLayout>
  );
};

export default LandingPage;
