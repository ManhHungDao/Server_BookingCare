import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import cors from "cors";

require("dotenv").config();

let app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
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

//config app

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// connect database
let port = process.env.PORT || 6969;
mongoose.set('strictQuery', false);
const MongoDB_URI =
  "mongodb+srv://daomanhhung:12022001Hung@cluster0.taold.mongodb.net/booking_care?retryWrites=true&w=majority";
mongoose
  .connect(MongoDB_URI)
  .then(() => {
    console.log("connect to database succeed");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Backend Nodejs is runing on the port : " + port);
});
