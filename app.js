const express = require("express");
const { check, matchedData, validationResult } = require("express-validator");
const app = express();

app.set("json spaces", 2);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.post(
  "/contact-us",
  check(["name", "email", "message"]).notEmpty().trim(),
  check("email").isEmail(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array({ onlyFirstError: true }) });
      return;
    }

    const data = matchedData(req);
    res.json(data);
  }
);

module.exports = app;
