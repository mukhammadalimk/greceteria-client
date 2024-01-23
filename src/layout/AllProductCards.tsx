import { useEffect } from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import usePaginate from "../hooks/usePaginate";
import PaginationButtons from "../components/UI/PaginationButtons";

interface productItemTypes {
  name: string;
  price: number;
  weight: string;
  brandName: string;
  description: string;
  category: string;
  store: string;
  images: string[];
  discountedPrice: number;
  inStock: boolean;
}

const AllProductCards = () => {
  useEffect(() => {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
  }, []);

  const { handlePageClick, pageCount, currentItems } = usePaginate(products);

  return (
    <>
      <div className="section-md">
        <div className="container">
          <div className="section__head" style={{ position: "relative" }}>
            <h2>All Products</h2>
            <PaginationButtons
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
          <div className="all-products">
            {currentItems.map((item: productItemTypes) => (
              <ProductCard
                images={item.images}
                discountPrice={item.discountedPrice}
                price={item.price}
                key={item.name}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductCards;