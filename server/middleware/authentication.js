const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication not valid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SEC_J);
    req.user = { userID: payload.userID, account: payload.email };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication not valid");
  }
};

module.exports = auth;
