import Link from "next/link";
import React from "react";
const Categories = ({ categories }) => {
  return (
    <div className="categories p-2">
      <ul className="list-unstyled w-100">
        {categories?.data?.rootCategories?.map((category) => {
          return (
            <li key={category.id} className="categories-item my-1">
              <Link
                href={`/products/${category.device}`}
                className="d-flex justify-content-between align-items-center text-decoration-none text-dark fs-6 py-1 w-100"
              >
                {category.name}
                <span></span>
              </Link>
              <div className="categories-item-submenu d-none bg-light position-absolute end-0 p-2 shadow">
                <div className="row">
                  <h6 className="font-weight-bold">Thương hiệu</h6>
                  <div className="col-lg-4">
                    <ul className="menu-list list-unstyled">
                      {category?.subcategories?.map((subcategory) => (
                        <li key={subcategory.id} className="menu-item py-1">
                          <Link
                            href={`/products/${category.device}/${subcategory.device}`}
                            className="menu-link text-decoration-none text-body-secondary"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
