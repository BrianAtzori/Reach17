// ---------- Enviroment Setup ----------
require("dotenv").config();

// ---------- Express Setup ----------
const express = require("express");
const app = express();
require("express-async-errors");
app.use(express.json());

// ---------- Middleware Setup ----------

// Imports
const errorHandlerMiddleware = require("./middleware/error-handler");

// Activation
app.use(errorHandlerMiddleware);

// ---------- Routes Setup ----------

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

app.use("/api/v1/auth", authRouter);

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
