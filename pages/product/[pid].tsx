import Image from "next/image";
import { useRouter } from "next/router";

import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import MainLayout from "../../components/MainLayout";

const ProductDetail = () => {
  // FIXME: Static data
  const images: string[] = [
    "https://dummyimage.com/600x500/000/fff",
    "https://dummyimage.com/700x600/000/fff",
    "https://dummyimage.com/800x900/000/fff",
  ];

  const router = useRouter();
  const { pid } = router.query;

  return (
    <MainLayout>
      <div className="flex justify-center mb-8">
        <div className="w-100 max-w-[500px] sm:border sm:pb-4 md:mt-[50px]">
          <div>
            <div className="mb-3 px-4 pt-4">
              <Carousel showThumbs={false}>
                {images.map((imageSrc, idx) => (
                  <div
                    key={idx}
                    className="w-100 h-[400px] md:h-[500px] relative"
                  >
                    <Image
                      loader={() => imageSrc}
                      unoptimized
                      src={imageSrc}
                      layout="fill"
                      alt="Product detail image alt"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="mt-4 px-4">
            <h1 className="font-semibold">product title - {pid}</h1>
            <div className="mt-2">
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis,
                impedit! Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Alias, unde.
              </span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-2xl">Rp300.000,00</span>
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
