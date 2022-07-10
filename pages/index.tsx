import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";

import {
  DisplayProduct,
  DisplayProductsResponse,
} from "../interfaces/display-product";
import { AxiosInstance } from "../utils/axios";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import MainLayout from "../components/MainLayout";

interface LandingPageProps {
  displayProducts: DisplayProduct[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await (
    await AxiosInstance()
  ).get<DisplayProductsResponse>("/cms/display-products");

  return {
    props: {
      displayProducts: data.data,
    },
  };
};

const LandingPage: NextPage<LandingPageProps> = ({ displayProducts }) => {
  return (
    <MainLayout>
      <Header />
      <main className="mt-[80px] mb-10 sm:flex sm:justify-center">
        <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
          {displayProducts.map(({ product }) => (
            <li key={product.id}>
              <Link href={`/product/${product.id}`}>
                <a href={`/product/${product.id}`}>
                  <ProductCard
                    src={product.thumbnail}
                    alt={product.thumbnail_alt}
                    name={product.title}
                    price={product.price_html}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <div className="flex justify-center my-8">
        <Link href="/product">
          <a
            href="/product"
            className="border mt-2 px-4 py-2 uppercase font-semibold"
          >
            See all products
          </a>
        </Link>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
