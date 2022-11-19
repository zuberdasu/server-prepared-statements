const express = require("express");
const router = express.Router();
const { updateUser } = require("../mysql/queries");
const sha256 = require("sha256");

router.put("/", async (req, res) => {
  let { email, name, password } = req.body;

  const query = updateUser();

  const token = req.headers.token;

  if (email && typeof email === "string") {
    const params = [email, token];
    await req.asyncMySQL(updateUser("email"), params);
  }
  if (name && typeof name === "string") {
    const params = [name, token];
    await req.asyncMySQL(updateUser("name"), params);
  }
  if (password && typeof password === "string") {
    password = sha256(process.env.SALT + password);
    const params = [password, token];
    await req.asyncMySQL(updateUser("password"), params);
  }

  res.send({ status: 1 });
});

module.exports = router;
