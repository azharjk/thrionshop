import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { AxiosInstance } from "../../utils/axios";
import { Product, ProductDetailResponse } from "../../interfaces/product";
import MainLayout from "../../components/MainLayout";

interface ProductDetailProps {
  product: Product;
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

const ProductDetail: NextPage<ProductDetailProps> = ({ product }) => {
  const { title, description, price_html, images } = product;

  return (
    <MainLayout>
      <div className="flex justify-center mb-8">
        <div className="w-100 max-w-[500px] sm:border sm:pb-4 md:mt-[50px]">
          <div>
            <div className="mb-3 px-4 pt-4">
              <Carousel showThumbs={false}>
                {images.map(({ src, alt }, idx) => (
                  <div
                    key={idx}
                    className="w-100 h-[400px] md:h-[500px] relative"
                  >
                    <Image
                      loader={() => src}
                      unoptimized
                      src={src}
                      layout="fill"
                      alt={alt}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="mt-4 px-4">
            <h1 className="font-semibold">{title}</h1>
            <div className="mt-2">
              <span>{description}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-2xl">{price_html}</span>
            </div>
            <button className="w-full border mt-4 py-2 uppercase font-semibold">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
