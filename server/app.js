// ---------- ENV SETUP ----------
require("dotenv").config();

// ---------- EXPRESS SETUP ----------
const express = require("express");
const app = express();
require("express-async-errors");
app.use(express.json());

// ---------- MIDDLEWARE SETUP ----------

// Imports
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/authentication");

// Activation
app.use(errorHandlerMiddleware);

// ---------- ROUTES SETUP ----------

//Approfondire problema cors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const authRouter = require("./routes/auth");
const courseRouter = require("./routes/courses");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/courses/", authenticationMiddleware, courseRouter);

// ---------- Try Init server and DB or throw error ----------
const port = process.env.PORT || 3154;

const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
