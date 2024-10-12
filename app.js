// basic import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotENV = require("dotenv");
const FileRouter = require("./src/routes/fileApi");

dotENV.config();

// database setup
let URL = "mongodb://localhost:27017/exam";
mongoose
  .connect(URL)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.Origin_HOST,
  })
);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.use("/api", router, FileRouter);
app.use("/images", express.static("uploads"));

module.exports = app;
