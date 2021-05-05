const jwt = require("jsonwebtoken"); //npm i jsonwebtoken

const key = "RandomKey"; // some string
function getNewToken(payload) {
  return jwt.sign(payload, key, { expiresIn: "90m" });
}

module.exports = {
  getNewToken,
};
