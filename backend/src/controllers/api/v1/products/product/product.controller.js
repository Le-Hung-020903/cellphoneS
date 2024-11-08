const { Op } = require("sequelize");
const {
  Product,
  Manufacturer,
  Products_image,
  Categorie,
  Discount,
  Specification,
  User,
  sequelize,
} = require("../../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../../utils/response");

module.exports = {
  index: async (req, res) => {
    try {
      let { page = 1, limit = 5 } = req.query;
      const options = {
        order: [["id", "desc"]],
        attributes: [
          "id",
          "name",
          "price",
          "categories_id",
          "quantity",
          "desc",
          "manufacturer_id",
        ],
        include: [
          {
            model: Products_image,
            as: "Products_images", // viết đúng với bên trong model đã đặt as
            attributes: ["url_image"],
          },
          {
            model: Categorie,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
            },
          },
        ],
      };
      if (Number.isInteger(+limit) && Number.isInteger(+page)) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
      }
      const { count, rows: products } = await Product.findAndCountAll(options);
      const totalPages = Math.ceil(count / limit);
      return successResponse(res, 200, "Success", {
        products,
        count,
        totalPages,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  add: async (req, res) => {
    try {
      let {
        name,
        price,
        quantity,
        producer,
        discount,
        categories,
        desc,
        url_image,
        specifications,
      } = req.body;

      if (
        !name ||
        !price ||
        !quantity ||
        !producer ||
        !categories ||
        !specifications
      ) {
        return errorResponse(res, 400, "All fields are required");
      }
      if (!url_image) {
        url_image = [];
      }
      if (!specifications) {
        specifications = [];
      }
      url_image = Array.isArray(url_image) ? url_image : [url_image];
      specifications = Array.isArray(specifications)
        ? specifications
        : [specifications];
      if (
        !(
          Number.isInteger(price) &&
          Number.isInteger(quantity) &&
          Number.isInteger(discount)
        )
      ) {
        return errorResponse(
          res,
          400,
          "Price, Quantity, and Discount must be integers"
        );
      }
      const [manufacturers] = await Manufacturer.findOrCreate({
        where: {
          name: producer,
        },
        defaults: {
          name: producer,
        },
      });
      if (!manufacturers) {
        return errorResponse(res, 500, "Sever error", e.message);
      }
      // tạo sản phẩm
      const [product, created] = await Product.findOrCreate({
        where: {
          name,
          price,
          quantity,
          categories_id: categories,
          manufacturer_id: manufacturers.id,
          desc,
        },
        defaults: {
          name,
          price,
          quantity,
          categories_id: categories,
          manufacturer_id: manufacturers.id,
          desc,
        },
      });
      if (!product) {
        return errorResponse(res, 500, "Sever error", e.message);
      }
      if (!created) {
        return errorResponse(res, 409, "Product already exists");
      }
      // nếu tạo được product thì add thêm phần discount vào db
      await product.addDiscount(discount);

      // đưa 1 mảng ảnh vào db
      const urlInstances = await Promise.all(
        url_image.map(async (item) => {
          const urlInstance = await Products_image.create({
            url_image: item,
            product_id: product.id,
          });
          return urlInstance;
        })
      );
      if (!urlInstances) {
        return errorResponse(res, 500, "Sever error", e.message);
      }

      // đưa 1 mảng thông số vào db
      const specificationsInstances = await Promise.all(
        specifications.map(async (value) => {
          const specificationsInstance = await Specification.create({
            name: value?.key,
            info: value?.value,
            product_id: product.id,
          });
          return specificationsInstance;
        })
      );
      if (!specificationsInstances) {
        return errorResponse(res, 500, "Sever error", e.message);
      }

      return successResponse(res, 201, "Product added successfully", {
        product,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      let {
        name,
        price,
        quantity,
        producer,
        discount,
        categories,
        desc,
        url_image,
        specifications,
      } = req.body;

      if (
        !name ||
        !price ||
        !quantity ||
        !producer ||
        !categories ||
        !specifications
      ) {
        return errorResponse(res, 400, "All fields are required");
      }

      if (!url_image) {
        url_image = [];
      }
      if (!specifications) {
        specifications = [];
      }

      url_image = Array.isArray(url_image) ? url_image : [url_image];
      specifications = Array.isArray(specifications)
        ? specifications
        : [specifications];
      if (
        !(
          Number.isInteger(price) &&
          Number.isInteger(quantity) &&
          Number.isInteger(discount)
        )
      ) {
        return errorResponse(
          res,
          400,
          "Price, Quantity, and Discount must be integers"
        );
      }

      const searchProduct = await Product.findByPk(id);
      if (!searchProduct) {
        return errorResponse(res, 404, "Product not found");
      }

      const [manufacturers] = await Manufacturer.findOrCreate({
        where: {
          name: producer,
        },
        defaults: {
          name: producer,
        },
      });

      if (!manufacturers) {
        return errorResponse(res, 500, "Sever error", e.message);
      }
      // update product old
      await Product.update(
        {
          name,
          price,
          quantity,
          categories_id: categories,
          manufacturer_id: manufacturers.id,
          desc,
        },
        {
          where: { id },
        }
      );
      // update discount_code
      await searchProduct.setDiscount(discount);

      // create url images
      const urlInstances = await Promise.all(
        url_image.map(async (item) => {
          const urlInstance = await Products_image.create({
            url_image: item,
            product_id: searchProduct.id,
          });
          return urlInstance;
        })
      );

      if (!urlInstances) {
        return errorResponse(res, 500, "Sever error", e.message);
      }
      //delete url_images from database
      const destroySpecifications = await Specification.destroy({
        where: {
          product_id: searchProduct.id,
        },
      });
      if (!destroySpecifications) {
        return errorResponse(res, 500, "Sever error", e.message);
      }

      const specificationsInstances = await Promise.all(
        specifications.map(async (value) => {
          const specificationsInstance = await Specification.create({
            name: value?.key,
            info: value?.value,
            product_id: searchProduct.id,
          });
          return specificationsInstance;
        })
      );

      if (!specificationsInstances) {
        return errorResponse(res, 500, "Sever error", e.message);
      }

      const updateProduct = await Product.findByPk(id, {
        include: [
          {
            model: Products_image,
            as: "Products_images",
            attributes: ["url_image"],
          },
          {
            model: Specification,
            as: "specifications",
          },
          {
            model: Categorie,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
            },
          },
        ],
      });

      return successResponse(res, 201, "Product update successfully", {
        updateProduct,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  find: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        attributes: [
          "id",
          "name",
          "price",
          "categories_id",
          "quantity",
          "desc",
          "manufacturer_id",
        ],
        include: [
          {
            model: Products_image,
            as: "Products_images", // viết đúng với bên trong model đã đặt as
            attributes: ["url_image"],
          },
          {
            model: Categorie,
            as: "categories",
            attributes: ["name", "parent_id", "device"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
            },
          },
          {
            model: Specification,
            as: "specifications",
            attributes: ["name", "info"],
          },
        ],
      });
      if (!product) {
        return errorResponse(res, 404, "Product not found or does not exist");
      }

      const manufacturer = await Categorie.findByPk(
        product.categories.parent_id
      );

      const device = await Categorie.findByPk(manufacturer.parent_id);

      return successResponse(res, 200, "Success", {
        product,
        manufacturer,
        device,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  deleteUrl: async (req, res) => {
    try {
      const { product_id, image_id } = req.params;
      // hàm chuyển đối 1 giá trị thành số nguyên
      const idProduct = +product_id;
      const idImage = +image_id;

      if (isNaN(idProduct) || isNaN(idImage)) {
        return errorResponse(res, 400, "Invalid product_id or image_id");
      }

      const deleteImage = await Products_image.destroy({
        where: {
          id: idImage,
          product_id: idProduct,
        },
      });
      if (!deleteImage) {
        return errorResponse(res, 500, "Server Error", e.message);
      }
      return successResponse(res, 200, "Image deleted successfully");
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Discount, as: "discount" },
          {
            model: Products_image,
            as: "Products_images",
          },
          {
            model: Specification,
            as: "specifications",
          },
        ],
      });
      if (!product) {
        return errorResponse(res, 404, "Product not found");
      }
      await product.removeDiscount(product.discount);
      await Products_image.destroy({
        where: {
          product_id: product.id,
        },
      });
      await Specification.destroy({
        where: {
          product_id: product.id,
        },
      });
      await product.destroy();
      return successResponse(res, 200, "Products deleted successfully");
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  filterProductByDevice: async (req, res) => {
    try {
      const { device } = req.params;
      const { discount, limit = 10, page = 1, order, dir } = req.query;

      // Get root categories
      const rootCategories = await Categorie.findOne({
        where: {
          device: device,
        },
      });

      if (!rootCategories) {
        return errorResponse(res, 404, "Category not found");
      }

      // Get categories A
      const categories = await Categorie.findAll({
        where: {
          parent_id: rootCategories.id,
        },
        attributes: ["id", "name", "device"],
      });
      if (!categories) {
        return errorResponse(res, 404, "Subcategory not found");
      }
      // Get categories id A
      const categoriesId = categories.map((categoryId) => categoryId.id);

      // Get categories B of A
      const subCategories = await Promise.all(
        categoriesId.map(async (categoryId) => {
          const subCategoriesInstance = await Categorie.findAll({
            where: {
              parent_id: categoryId,
            },
          });
          return subCategoriesInstance;
        })
      );

      // Get categories id B
      const subCategoriesId = subCategories
        .flat()
        .map((subCategoryId) => subCategoryId.id);

      //  get all products of categories 3
      const options = {
        where: {
          categories_id: {
            [Op.in]: subCategoriesId,
          },
        },
        order: [["id", "desc"]],
        attributes: [
          "id",
          "name",
          "price",
          "categories_id",
          "quantity",
          "desc",
          "manufacturer_id",
        ],
        include: [
          {
            model: Products_image,
            as: "Products_images", // viết đúng với bên trong model đã đặt as
            attributes: ["url_image"],
          },
          {
            model: Categorie,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
            },
          },
        ],
      };
      if (Number.isInteger(+limit) && Number.isInteger(+page)) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
      }

      if (order && order.toLowerCase() === "filter_price") {
        if (dir.toLowerCase() === "desc" || dir.toLowerCase() === "asc") {
          options.order = [["price", dir.toLowerCase()]];
        }
      }

      const { count, rows: products } = await Product.findAndCountAll(options);
      return successResponse(res, 200, "Success", {
        categories,
        products,
        category: rootCategories,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  filterProductByManufacturer: async (req, res) => {
    try {
      const { manufacturer } = req.params;
      const { discount, limit = 5, page = 1, order, dir } = req.query;
      // Get manufacturer
      const manufacturerId = await Categorie.findOne({
        where: {
          device: manufacturer,
        },
      });
      if (!manufacturerId) {
        return errorResponse(res, 404, "Manufacturer not found");
      }

      //get rootCategory
      const rootCategory = await Categorie.findOne({
        where: {
          id: manufacturerId.parent_id,
        },
      });

      // Get subCategories of rootCategory
      const subManufacturers = await Categorie.findAll({
        where: {
          parent_id: manufacturerId.id,
        },
        attributes: ["id", "name", "device"],
      });

      // Get subManufacturer id
      const subManufacturerId = subManufacturers.map(
        (subManufacturer) => subManufacturer.id
      );

      // Get Products by subCategory
      const options = {
        where: {
          categories_id: {
            [Op.in]: subManufacturerId,
          },
        },
        order: [["id", "desc"]],
        attributes: [
          "id",
          "name",
          "price",
          "categories_id",
          "quantity",
          "desc",
          "manufacturer_id",
        ],
        include: [
          {
            model: Products_image,
            as: "Products_images", // viết đúng với bên trong model đã đặt as
            attributes: ["url_image"],
          },
          {
            model: Categorie,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
            },
          },
        ],
      };

      if (Number.isInteger(+limit) && Number.isInteger(+page)) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
      }

      if (order && order.toLowerCase() === "filter_price") {
        if (dir.toLowerCase() === "desc" || dir.toLowerCase() === "asc") {
          options.order = [["price", dir.toLowerCase()]];
        }
      }

      const { count, rows: products } = await Product.findAndCountAll(options);

      return successResponse(res, 200, "Success", {
        category: rootCategory,
        categories: subManufacturers,
        products: products,
        manufacturer: manufacturerId,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  filterProductByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const { discount, order, dir } = req.query;

      const categoryId = await Categorie.findOne({
        where: {
          device: category,
        },
      });

      if (!categoryId) {
        return errorResponse(res, 404, "Category not found");
      }
      // Get category id of parent
      const parentCategoryId = await Categorie.findOne({
        where: {
          id: categoryId.parent_id,
        },
      });
      // Get root category
      const rootCategory = await Categorie.findOne({
        where: {
          id: parentCategoryId.parent_id,
        },
      });

      const categories = await Categorie.findAll({
        where: {
          parent_id: parentCategoryId.id,
        },
        attributes: ["id", "name", "device"],
      });

      // options
      const id = categoryId.id;
      const options = {
        where: {
          categories_id: id,
        },
        order: [["id", "desc"]],
        attributes: [
          "id",
          "name",
          "price",
          "categories_id",
          "quantity",
          "desc",
          "manufacturer_id",
        ],
        include: [
          {
            model: Products_image,
            as: "Products_images", // viết đúng với bên trong model đã đặt as
            attributes: ["url_image"],
          },
          {
            model: Categorie,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
            },
          },
        ],
      };

      if (order && order.toLowerCase() === "filter_price") {
        if (dir.toLowerCase() === "desc" || dir.toLowerCase() === "asc") {
          options.order = [["price", dir.toLowerCase()]];
        }
      }

      //get all products of categories
      const products = await Product.findAll(options);

      return successResponse(res, 200, "Success", {
        device: rootCategory,
        manufacturer: parentCategoryId,
        category: categoryId,
        categories,
        products,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  filterSimilarProduct: async (req, res) => {
    try {
      const { similar } = req.params;
      const product = await Product.findOne({
        where: {
          id: similar,
        },
      });
      if (!product) {
        return errorResponse(res, 404, "Product not found or does not exist");
      }
      // Get category  of product
      const categoryId = await Categorie.findOne({
        where: {
          id: product.categories_id,
        },
      });
      if (!categoryId) {
        return errorResponse(res, 404, "Category not found");
      }

      //get categories similar
      const categories = await Categorie.findAll({
        where: {
          parent_id: categoryId.parent_id,
        },
      });

      // Get id of categories
      const categoriesId = categories?.map((category) => category.id);

      // Get products of categories similar
      let productsInstance = await Promise.all(
        categoriesId?.map(async (categoryId) => {
          const productInstance = await Product.findAll({
            where: {
              categories_id: categoryId,
            },
            attributes: ["id", "name", "price", "quantity", "desc"],
            include: [
              {
                model: Products_image,
                as: "Products_images", // viết đúng với bên trong model đã đặt as
                attributes: ["url_image"],
              },
              {
                model: Categorie,
                as: "categories",
                attributes: ["name"],
              },
              {
                model: Discount,
                as: "discount",
                attributes: ["discount_code"],
                through: {
                  attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
                },
              },
            ],
          });
          return productInstance;
        })
      );

      // random array
      let products = productsInstance.sort(() => 0.5 - Math.random());

      // Get 5 products
      const selectedProducts = products.slice(0, 3);

      return successResponse(res, 200, "Success", {
        products: selectedProducts.flat(),
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  homeProduct: async (req, res) => {
    try {
      const { limit = 10, page = 1 } = req.query;
      const devices = await Categorie.findAll({
        where: {
          parent_id: null,
        },
        attributes: ["id", "desc"],
      });

      const deviceIds = devices?.map((rootCategory) => {
        return rootCategory.id;
      });

      const manufacturers = await Promise.all(
        deviceIds.map(async (deviceId) => {
          const manufacturer = await Categorie.findAll({
            where: {
              parent_id: deviceId,
            },
            attributes: ["id", "name"],
          });
          return manufacturer;
        })
      );

      const options = {
        order: [["id", "desc"]],
        attributes: [
          "id",
          "name",
          "price",
          "categories_id",
          "quantity",
          "desc",
          "manufacturer_id",
        ],
        include: [
          {
            model: Products_image,
            as: "Products_images", // viết đúng với bên trong model đã đặt as
            attributes: ["url_image"],
          },
          {
            model: Categorie,
            as: "categories",
            attributes: ["name"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
            },
          },
        ],
      };
      // Tính offset và limit
      if (Number.isInteger(+limit) && Number.isInteger(+page)) {
        options.offset = (page - 1) * limit;
        options.limit = limit;
      }

      const { count, rows: products } = await Product.findAndCountAll(options);

      // Tính toán số lượng sản phẩm còn lại
      // const remainingProducts = count - page * limit;

      return successResponse(res, 200, "Success", {
        devices,
        manufacturers,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  addFavoriteProduct: async (req, res) => {
    try {
      const transaction = await sequelize.transaction();
      const { productId } = req.body;
      const { id } = req.user;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        return errorResponse(res, 404, "Product not found");
      }
      await user.addFavoriteProducts(product, { transaction });
      await transaction.commit();
      return successResponse(res, 200, "Add favorite product successfully");
    } catch (e) {
      await transaction.rollback();
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  getFavoriteProducts: async (req, res) => {
    try {
      const { id } = req.user;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      const products = await user.getFavoriteProducts({
        attributes: ["id", "name", "price", "quantity"],
        include: [
          {
            model: Products_image,
            as: "Products_images",
            attributes: ["url_image"],
          },
          {
            model: Discount,
            as: "discount",
            attributes: ["discount_code"],
            through: {
              attributes: [],
            },
          },
        ],
        through: {
          attributes: [],
        },
      });
      const favoriteProducts = { products };
      return successResponse(res, 200, "Success", favoriteProducts);
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  deleteFavoriteProduct: async (req, res) => {
    try {
      const { id } = req.user;
      const { id: productId } = req.params;
      if (!id) {
        return errorResponse(res, 401, "Unauthorized");
      }
      if (!productId) {
        return errorResponse(res, 404, "Product not found");
      }
      const user = await User.findByPk(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      const transaction = await sequelize.transaction();
      await user.removeFavoriteProducts(productId, { transaction });
      await transaction.commit();
      return successResponse(res, 200, "Delete favorite product successfully");
    } catch (e) {
      await transaction.rollback();
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
};
