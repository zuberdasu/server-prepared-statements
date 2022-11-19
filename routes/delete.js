const express = require("express");
const { deleteUser } = require("../mysql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  const query = deleteUser();

  const params = [req.headers.token];

  await req.asyncMySQL(query, params);
  res.send({ status: 1 });
});

module.exports = router;
