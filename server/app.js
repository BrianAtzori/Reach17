// ---------- ENV SETUP ----------
require("dotenv").config();

// ---------- EXPRESS SETUP ----------
const express = require("express");
const app = express();
require("express-async-errors");
app.use(express.json());

// ---------- SECURITY SETUP ----------
//Imports
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
//Activation
app.use(cors());
app.use(helmet());
app.use(cors());
app.use(xss());

app.set("Trust Proxy", 1); //Se sono dietro reverse proxy per limiter
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 100,
  })
);

// ---------- MIDDLEWARE SETUP ----------
// Imports
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/authentication");

// Activation
app.use(errorHandlerMiddleware);

// ---------- ROUTES SETUP ----------

const authRouter = require("./routes/auth");
const coursesRouter = require("./routes/courses");
const { utilitiesRouter } = require("./routes/utilities");
const { noAuthUtilitiesRouter } = require("./routes/utilities-no-auth");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/courses/", authenticationMiddleware, coursesRouter);
app.use("/api/v1/utilities", authenticationMiddleware, utilitiesRouter);
app.use("/api/v1/public/", noAuthUtilitiesRouter);

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
