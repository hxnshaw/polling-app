require("dotenv").config();
const express = require("express");
const app = express();

const user = require("./routes/user");
const poll = require("./routes/poll");
app.use(express.json());

//ROUTERS
app.use("/users", user);
app.use("/polls", poll);

const port = 1000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
