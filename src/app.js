const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const user = require("./route/user");
require("dotenv").config();

const ErrorMiddleware = require("./middlewares/errors");

//setting up config file

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

//import all routes
// const auth = require('./routes/auth');
// const order = require('./routes/order');
// const payment = require('./routes/payment');
app.use("/api", user);
// app.use('/api/v1', auth);
// app.use('/api/v1', order);
// app.use('/api/v1', payment);

//Middleware error handler
app.use(ErrorMiddleware);

module.exports = app;
