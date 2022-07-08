import Link from "next/link";

import ProductCard from "../../components/ProductCard";
import MainLayout from "../../components/MainLayout";
import Header from "../../components/Header";

const ProductsPage = () => {
  const cheap = [
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    }
  ];
  const newProducts = [
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
  ];

  const excellent = [
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
    {
      id: 1,
      title: "PRODUCT DUMMY TEST",
      price_html: "Rp50.000,00",
      thumbnail: "/dummy-product.jpg",
      thumbnail_alt: "dummy product",
    },
  ];

  return (
    <MainLayout>
      <Header />
      <main className="mt-[80px] mb-10 sm:flex sm:flex-col sm:items-center">
        <section>
          <div className="mb-4 py-2">
            <h3 className="uppercase font-semibold text-slate-700 text-xl ml-4">
              New products
            </h3>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
            {newProducts.map((product) => (
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
        </section>
        <section className="mt-8">
          <div className="mb-4 py-2">
            <h3 className="uppercase font-semibold text-slate-700 text-xl ml-4">
              Excellent condition
            </h3>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
            {excellent.map((product) => (
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
        </section>
        <section className="mt-8">
          <div className="mb-4 py-2">
            <h3 className="uppercase font-semibold text-slate-700 text-xl ml-4">
              Cheap price
            </h3>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
            {cheap.map((product) => (
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
        </section>
      </main>
    </MainLayout>
  );
};

export default ProductsPage;
