const bcrypt = require("bcryptjs");
const pool = require("../db");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, passcode } = req.body;
  try {
    const data = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already exists.",
      });
    } else {
      const salt = await bcrypt.genSalt();
      const passcodeHash = await bcrypt.hash(passcode, salt);
      const user = {
        username,
        email,
        passcode: passcodeHash,
      };
      console.log(user);

      var flag = 1; //Declaring a flag

      //Inserting data into the database

      pool.query(
        "INSERT INTO users (username, email, passcode) VALUES ($1,$2,$3)",
        [user.username, user.email, user.passcode],
        (err) => {
          if (err) {
            flag = 0; //If user  is not inserted to database assigning flag as 0/false.
            console.error(err);
            return res.status(500).json({
              error: err.message,
            });
          } else {
            flag = 1;
            res
              .status(200)
              .send({ message: "User added to database, not verified" });
          }
        }
      );
      if (flag) {
        const token = jwt.sign(
          //Signing a jwt token
          {
            email: user.email,
          },
          process.env.SECRET_KEY
        );
        console.log(token);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registering user!", //Database connection error
    });
  }
};
