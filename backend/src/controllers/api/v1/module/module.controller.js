const { Module, Action } = require("../../../../models/index");
const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
module.exports = {
  index: async (req, res) => {
    try {
      const modules = await Module.findAll({
        order: [["id", "DESC"]],
        attributes: ["id", "name", "desc"],
        include: {
          model: Action,
          as: "actions",
          attributes: ["name"],
          through: {
            attributes: [], // Không lấy bất kỳ thuộc tính nào từ bảng trung gian
          },
        },
      });
      return successResponse(res, 200, "Success", { modules });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  add: async (req, res) => {
    try {
      let { desc, actions, name } = req.body;
      if (!desc || !name) {
        return errorResponse(res, 400, "describe or name is required");
      }
      if (!actions) {
        actions = [];
      }
      actions = Array.isArray(actions) ? actions : [actions];

      const module = await Module.create({
        name: name,
        desc: desc,
      });
      if (!module) {
        return errorResponse(res, 500, "Server Error", e.message);
      }
      const actionInstances = await Promise.all(
        actions.map(async (action) => {
          const [actionInstance] = await Action.findOrCreate({
            where: {
              name: action.trim(),
            },
            defaults: {
              name: action.trim(),
            },
          });
          return actionInstance;
        })
      );
      await module.addActions(actionInstances);
      return successResponse(res, 200, "Success", { module });
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      let { name, desc, actions } = req.body;
      if (!name || !desc) {
        return errorResponse(res, 400, "describe or name is required");
      }
      if (!actions) {
        actions = [];
      }
      actions = Array.isArray(actions) ? actions : [actions];
      const module = await Module.findByPk(id);
      if (!module) {
        return errorResponse(res, 404, "Module not found");
      }
      await Module.update({ name: name, desc: desc }, { where: { id: id } });
      const actionInstances = await Promise.all(
        actions.map(async (action) => {
          const [actionInstance] = await Action.findOrCreate({
            where: {
              name: action.trim(),
            },
            defaults: {
              name: action.trim(),
            },
          });
          return actionInstance;
        })
      );
      await module.setActions(actionInstances);

      const moduleNewUpdate = await Module.findByPk(id);
      return successResponse(
        res,
        200,
        "Module update successfully",
        moduleNewUpdate
      );
    } catch (e) {
      return errorResponse(res, 500, "Server Error", e.message);
    }
  },
};
