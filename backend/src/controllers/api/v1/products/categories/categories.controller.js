const {
  Categorie,
  Product,
  Manufacturer,
} = require("../../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../../utils/response");
module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Categorie.findAll();
      const rootCategories = await Categorie.findAll({
        where: {
          parent_id: null,
        },
        include: {
          model: Categorie,
          as: "subcategories",
          attributes: ["id", "name", "parent_id", "desc", "device"],
        },
      });
      return successResponse(res, 200, "Success", {
        categories: categories,
        rootCategories,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  add: async (req, res) => {
    try {
      const { name, parent_id, desc, device } = req.body;
      if (!name) {
        return errorResponse(res, 400, "Name is required");
      }
      const [categories, created] = await Categorie.findOrCreate({
        where: {
          name: name,
          parent_id: parent_id,
          desc: desc,
          device: device,
        },
        defaults: {
          name: name,
          parent_id: parent_id,
          desc: desc,
          device: device,
        },
      });
      if (!created) {
        return errorResponse(res, 409, "Categories already exists");
      }
      return successResponse(res, 201, "Success", { categories });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, parent_id, desc, device } = req.body;
      if (!name) {
        return errorResponse(res, 400, "Name is required");
      }
      const categories = await Categorie.findByPk(id);
      if (!categories) {
        return errorResponse(res, 404, "Categories not found");
      }
      await categories.update({ name, parent_id, desc, device });
      return successResponse(
        res,
        200,
        "Categories update successfully",
        categories
      );
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const categories = await Categorie.findByPk(id);
      if (!categories) {
        return errorResponse(res, 404, "Categories not found");
      }
      await categories.destroy({
        where: {
          id: id,
        },
      });
      return successResponse(res, 200, "Categories deleted successfully");
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e);
    }
  },
  countProduct: async (req, res) => {
    try {
      const { category_id } = req.params;
      const { count } = await Product.findAndCountAll({
        where: { categories_id: category_id },
      });
      return successResponse(res, 200, "Success", { count });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
};
