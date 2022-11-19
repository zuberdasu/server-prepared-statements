const { checkToken } = require("../mysql/queries");

module.exports.checkToken = async (req, res, next) => {
  const { token } = req.headers;

  //important in case token is not set!
  if (!token) {
    res.send({ status: 0, error: "Token not set!" });
  }

  const query = checkToken();

  const results = await req.asyncMySQL(query, token);

  if (results.length) {
    next();
    return;
  }

  res.send({ status: 0, error: "Invalid token!" });
};
