import Link from "next/link";
import React from "react";

const FilterManufacturer = (props) => {
  const { manufacturer, products } = props;
  const device = products?.data?.category?.device;
  return (
    <div
      className="manufacture-item row pt-3 px-2 pb-2 text-center"
      style={{ cursor: "pointer" }}
    >
      {products?.data?.categories?.map((category) => {
        return (
          <div
            className="manufacture-item__link col-xl-2  col-lg-2 col-md-2 col-sm-3 col-4"
            key={category.id}
          >
            <Link
              href={`/products/${device}/${manufacturer}/${category.device}`}
              className="text-decoration-none d-inline-block border border-secondary p-1 rounded text-black"
              style={{ minWidth: "150px" }}
            >
              {category.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FilterManufacturer;
