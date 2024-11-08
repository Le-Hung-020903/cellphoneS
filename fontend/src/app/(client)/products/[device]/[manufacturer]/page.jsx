import Image from "next/image";
import Breadcrumb from "../../../../components/breadcrumb";
import "../../../css/device.css";
import FilterManufacturer from "../../../../components/manufacturer";
import { revalidateProductsManufacturer } from "../../../../actions/revalidateData";
import ProductList from "../../../../components/product_card";
import FilterProducts from "../../../../components/filter_products";

const getManufacturers = async (manufacture, options) => {
  let query = "";
  if (options?.order) {
    query += `?order=${options.order}`;
  }
  if (options?.dir) {
    query += `&dir=${options.dir}`;
  }
  const manufacturers = await fetch(
    `http://localhost:3000/api/v1/products/manufacturers/${manufacture}/${query}`,
    {
      next: { tags: ["productManufacturer"] },
    }
  );
  revalidateProductsManufacturer();
  return manufacturers.json();
};

const Manufacturer = async ({ params, searchParams }) => {
  const { manufacturer } = params;
  const { order, dir } = searchParams;
  const products = await getManufacturers(manufacturer, { order, dir });

  return (
    <div
      className="manufacture-wrapper"
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
            <Breadcrumb.Item
              href={`/products/${products.data.category.device}`}
            >
              {products.data.category.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {products.data.manufacturer.name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container pb-3">
          <div className="manufacture-slider mt-3">
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
          <div className="manufactures mt-3 bg-white rounded ms-0 me-0 pb-2">
            <FilterManufacturer
              products={products}
              manufacturer={manufacturer}
            />
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

export default Manufacturer;
