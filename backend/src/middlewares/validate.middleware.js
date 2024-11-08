const { object } = require("yup");
module.exports = (req, res, next) => {
  req.validate = async (data, rules = {}) => {
    try {
      const schema = object(rules);
      const body = await schema.validate(data, {
        abortEarly: false,
      });
      return body;
    } catch (e) {
      const errors = Object.fromEntries(
        e.inner.map((item) => {
          return [item.path, item.message];
        })
      );
      req.flash("error", errors);
    }
  };
  next();
};
