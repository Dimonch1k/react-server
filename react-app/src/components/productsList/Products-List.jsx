import React, { useState, useEffect, useCallback } from "react";
import ProductItem from "./Product-Item/Product-Item";
import AddProduct from "./Add-Product/Add-Product";
import Filters from "./Filters/Filters";
import Sorting from "./Sorting/Sorting";
import ListGrid from "./List-Grid/List-Grid";
import ProductsCart from "./Products-Cart/Products-Cart";

import classNames from "classnames";

import { productList } from "./productList";

import "../../styles/components/productList/Product-List.scss";
import "../../styles/components/productList/Shopping-Cart/Shopping-Cart.scss";
import { Outlet } from "react-router-dom";

const filterMap = {
  All: () => true,
  Expires: (product) => product.expire,
  "In Stock": (product) => !product.expire,
};

const sortingMap = {
  "Initially cheap": (a, b) => a.price - b.price,
  "Initially expensive": (a, b) => b.price - a.price,
  "In stock": (a, b) => a.expire - b.expire,
  Expires: (a, b) => b.expire - a.expire,
};

const ProductsList = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : productList;
  });
  const [currentFilter, setCurrentFilter] = useState("All");
  const [currentSort, setCurrentSort] = useState("Initially cheap");
  const [gridRows, setGridRows] = useState(false);
  const [counter, setCounter] = useState(0);

  const addNewProduct = useCallback(
    (product) => {
      setProducts((products) => [...products, product]);
    },
    [setProducts]
  );

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div>
      <div className="container">
        <div className="catalog-settings">
          {/* Add Product */}
          <AddProduct addNewProduct={addNewProduct} />

          {/* Filters */}
          <Filters
            setCurrentFilter={setCurrentFilter}
            currentFilter={currentFilter}
            filterMap={filterMap}
          />

          {/* Sorting */}
          <Sorting
            setCurrentSort={setCurrentSort}
            currentSort={currentSort}
            sortingMap={sortingMap}
          />

          {/* Product list view */}
          <ListGrid gridRows={gridRows} setGridRows={setGridRows} />

          {/* Shopping Cart */}
          <ProductsCart counter={counter} />
        </div>

        <Outlet />
        <div className={classNames("product-list", { rows: gridRows })}>
          {products
            .filter(filterMap[currentFilter])
            .sort(sortingMap[currentSort])
            .map((product) => (
              <ProductItem
                key={product.id}
                image={product.image}
                info={product.info}
                price={product.price}
                expire={product.expire}
                more={product.more}
                gridRows={gridRows}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
