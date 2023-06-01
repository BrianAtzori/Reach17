const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

//   console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication not valid");
  }

  const token = authHeader.split(" ")[1];

//   console.log("Token: " + token)

  try {
    const payload = jwt.verify(token, process.env.SEC_J);
    req.user = { userId: payload.userId, account: payload.email };
  } catch (err) {
    throw new UnauthenticatedError("Authentication not valid");
  }
};

module.exports = auth;
