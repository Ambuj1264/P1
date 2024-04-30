const jwt = require("jsonwebtoken");
const { TOKEN_NOT_FOUND, UNAUTHORIZED } = require("../utility/constant");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res
      .status(401)
      .json({ success: false, message: TOKEN_NOT_FOUND, data: null });
  }
  const token = authToken.split(" ")[1];
  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: UNAUTHORIZED, data: null });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
