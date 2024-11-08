require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
const apiRouter = require("./routes/v1/api");
const categoriesRouter = require("./routes/v1/categories");
const productsRouter = require("./routes/v1/product");
const discountRouter = require("./routes/v1/discountCode");
const moduleRouter = require("./routes/v1/module");
const commentRouter = require("./routes/v1/comment");
const cartRouter = require("./routes/v1/cart");
const orderRouter = require("./routes/v1/order");
const reviewRouter = require("./routes/v1/review");

var app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "http://localhost:8080");
//   next();
// });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/api", cartRouter);
app.use("/api", categoriesRouter);
app.use("/api", productsRouter);
app.use("/api", discountRouter);
app.use("/api", moduleRouter);
app.use("/api", commentRouter);
app.use("/api", orderRouter);
app.use("/api", reviewRouter);
app.use("/", indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
