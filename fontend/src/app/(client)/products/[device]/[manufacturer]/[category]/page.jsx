import Breadcrumb from "../../../../../components/breadcrumb";
import FilterCategory from "../../../../../components/category";
import ProductList from "../../../../../components/product_card";
import "../../../../css/device.css";
import { revalidateProductsCategory } from "../../../../../actions/revalidateData";
import Image from "next/image";
import FilterProducts from "../../../../../components/filter_products";

const getProductOfCategory = async (category, options) => {
  let key = "";
  if (options?.order) {
    key += `?order${options.order}`;
  }
  if (options?.dir) {
    key += `&dir=${options.dir}`;
  }
  const products = await fetch(
    `http://localhost:3000/api/v1/products/device/manufacturers/category/${category}/${key}`,
    {
      next: { tags: ["productCategory"] },
    }
  );
  revalidateProductsCategory();
  return products.json();
};

const Category = async ({ params, searchParams }) => {
  const { category } = params;
  const { order, dir } = searchParams;
  const products = await getProductOfCategory(category, { order, dir });

  return (
    <div
      className="category-wrapper"
      style={{
        backgroundColor: "#f2f2f2",
      }}
    >
      <div
        className="breadcrumb-wrapper"
        style={{ backgroundColor: "while", marginTop: "65px" }}
      >
        <div className="container">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item href={`/products/${products.data.device.device}`}>
              {products.data.device.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={`/products/${products.data.device.device}/${products.data.manufacturer.device}`}
            >
              {products.data.manufacturer.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {products.data.category.name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container pb-3">
          <div className="category-slider mt-3">
            <div className="row  g-2">
              <div className="col-lg-6 col-md-12">
                <Image
                  src={"/images/device/image-1.png"}
                  alt="Ảnh device"
                  width={100}
                  height={100}
                  className="device-slider__img rounded"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className=" col-lg-6 col-md-12 ">
                <Image
                  src={"/images/device/image-2.png"}
                  alt="Ảnh device"
                  width={100}
                  height={100}
                  className="device-slider__img rounded"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="manufactures row mt-3 gx-3 gy-2 bg-white rounded ms-0 me-0 pb-2">
            <FilterCategory products={products} />
          </div>
          <div className="filter-product bg-white rounded mt-3">
            <FilterProducts />
          </div>
          <div className="product-list bg-white rounded p-2 mt-3">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
