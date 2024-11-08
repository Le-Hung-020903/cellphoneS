import Link from "next/link";

const FilterCategories = (props) => {
  const { products, device } = props;
  return (
    <div
      className="categories-item row pt-3 px-2 pb-2 text-center"
      style={{ cursor: "pointer" }}
    >
      {products?.data?.categories?.map((category) => {
        return (
          <div
            className="categories-item__link col-xl-2 col-lg-3 col-md-2 col-sm-3 col-4"
            key={category.id}
          >
            <Link
              href={`/products/${device}/${category.device}`}
              className="text-decoration-none d-inline-block border border-secondary rounded p-2 text-black w-100"
              style={{ minWidth: "100px" }}
            >
              {category.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FilterCategories;
