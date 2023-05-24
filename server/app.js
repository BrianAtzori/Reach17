// ---------- Express Setup ----------
const express = require("express");
const app = express();
require("express-async-errors");

// ---------- Middleware Setup ----------

// -- Imports
const errorHandlerMiddleware = require("./middleware/error-handler");

// -- Activation
app.use(errorHandlerMiddleware);

// ---------- Routes Setup ----------
const authRouter = require("./routes/auth");

app.use("/api/v1/auth", authRouter);

// ---------- Try Init server and DB or throw error ----------
const port = process.env.PORT || 3154;

const start = () => {
  try {
    //init DB
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();
