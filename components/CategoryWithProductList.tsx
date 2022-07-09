import Link from "next/link";

import { Category } from "../interfaces/category";
import ProductCard from "./ProductCard";

interface CategoryWithProductListProps {
  categories: Category[];
}

const CategoryWithProductList: React.FC<CategoryWithProductListProps> = ({
  categories,
}) => {
  return (
    <>
      {categories.map(({ id, name, products }) => (
        <section key={id} className="mt-6 first:mt-0">
          <div className="mb-4 py-2">
            <h3 className="uppercase font-semibold text-slate-700 text-xl ml-4">
              {name}
            </h3>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
            {products.map(
              ({ id, thumbnail, thumbnail_alt, title, price_html }) => (
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
        </section>
      ))}
    </>
  );
};

export default CategoryWithProductList;
