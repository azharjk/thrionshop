import { GetServerSideProps, NextPage } from "next";

import { AxiosInstance } from "../../utils/axios";
import {
  Category,
  CategoryWithProductResponse,
} from "../../interfaces/category";
import MainLayout from "../../components/MainLayout";
import Header from "../../components/Header";
import CategoryWithProductList from "../../components/CategoryWithProductList";

interface ProductsPageProps {
  categories: Category[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await (
    await AxiosInstance()
  ).get<CategoryWithProductResponse>("/categories-with-products");

  return {
    props: {
      categories: data.data,
    },
  };
};

const ProductsPage: NextPage<ProductsPageProps> = ({ categories }) => {
  return (
    <MainLayout>
      <Header />
      <main className="mt-[80px] mb-10 sm:flex sm:flex-col sm:items-center">
        <CategoryWithProductList categories={categories} />
      </main>
    </MainLayout>
  );
};

export default ProductsPage;
