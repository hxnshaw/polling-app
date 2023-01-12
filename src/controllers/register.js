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
      return res.status(400).json({ error: "Email already exists!" });
    } else {
      bcrypt.hash(passcode, 10, (err, hash) => {
        if (err) return res.status(err).json({ error: "Server Error" });
      });
      const user = {
        username,
        email,
        passcode,
      };
      var flag = 1;

      pool.query(
        "INSERT INTO users (username, email, passcode) VALUES ($1, $2, $3)",
        [user.username, user.email, user.passcode],
        (err) => {
          if (err) {
            flag = 0;
            console.log(err);
            return res.status(500).json({ error: "Database Error" });
          } else {
            flag = 1;
            res
              .status(200)
              .json({ message: "User added to database, not verified" });
          }
        }
      );
      if (flag) {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error while registering user" });
  }
};
