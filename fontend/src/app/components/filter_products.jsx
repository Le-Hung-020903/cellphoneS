import React from "react";
import "../(client)/css/filter_product.css";
import ButtonFilter from "../components/button_filter";

const FilterProducts = async () => {
  return (
    <div className="filter-product-wrapper p-2">
      <h3>Sắp xếp theo</h3>
      <ButtonFilter />
    </div>
  );
};

export default FilterProducts;
