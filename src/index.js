require("dotenv").config();
const express = require("express");
const app = express();

const port = 1000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
