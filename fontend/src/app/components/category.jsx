import Link from "next/link";
import React from "react";

const FilterCategory = (props) => {
  const { products } = props;
  const device = products?.data?.device?.device;
  const manufacturer = products?.data?.manufacture?.device;
  return (
    <div
      className="manufacture-item row pt-3 px-2 pb-2 text-center"
      style={{ cursor: "pointer" }}
    >
      {products?.data?.categories?.map((category) => {
        return (
          <div className=" col-xl-2 col-lg-2 col-sm-3" key={category.id}>
            <Link
              href={`/products/${device}/${manufacturer}/${category.device}`}
              className="text-decoration-none d-inline-block border border-secondary rounded p-2 text-black"
            >
              {category.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FilterCategory;
