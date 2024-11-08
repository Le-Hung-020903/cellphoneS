import Image from "next/image";
import dynamic from "next/dynamic";
import "../../css/device.css";
import Breadcrumb from "../../../components/breadcrumb";
import FilterCategories from "../../../components/device";
import ProductList from "../../../components/product_card";
import { revalidateProductsDevice } from "../../../actions/revalidateData";
import FilterProducts from "../../../components/filter_products";

const FlashSale = dynamic(() => import("../../../components/flash_sale.jsx"), {
  ssr: false,
});

const getProducts = async (device, options) => {
  let query = "";

  if (options?.order) {
    query += `?order=${options.order}`;
  }

  if (options?.dir) {
    query += `&dir=${options.dir}`;
  }

  const products = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/device/${device}${query}`,
    {
      next: { tags: ["productDevice"] },
    }
  );
  revalidateProductsDevice();
  return products.json();
};

const Device = async ({ params, searchParams }) => {
  const { device } = params;
  const { order, dir } = searchParams;
  const products = await getProducts(device, { order, dir });

  return (
    <div
      className="device-wrapper"
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
            <Breadcrumb.Item active>
              {products.data.category.name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container pb-3">
          <div className="device-slider mt-3">
            <div className="row g-2">
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
              <div className="col-lg-6 col-md-12">
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
          <div className="manufactures  bg-white rounded  mt-3 mx-0 mb-3 pb-2">
            <FilterCategories products={products} device={device} />
          </div>
          <div className="flash-sale mt-2 rounded overflow-hidden">
            <FlashSale />
          </div>
          <div className="filter-product bg-white rounded mt-3">
            <FilterProducts />
          </div>
          <div className="product-list bg-white rounded  p-2 mt-3">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Device;
