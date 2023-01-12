require("dotenv").config();
const express = require("express");
const app = express();

const user = require("./routes/user");

app.use(express.json());

//ROUTERS
app.use("/user", user);

const port = 1000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
