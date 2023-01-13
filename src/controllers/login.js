const bcrypt = require("bcryptjs");
const pool = require("../db");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, passcode } = req.body;
  try {
    const data = await pool.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);
    const user = data.rows;
    console.log(user);

    if (user.length === 0) {
      res.status(400).json({ error: "User not found" });
    } else {
      bcrypt.compare(passcode, user[0].passcode, (err, result) => {
        if (err) {
          res.status(err).json({ error: "Server Error" });
        } else if (result === true) {
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({ message: "User signed in successfully" });
        } else {
          if (result != true) {
            res.status(400).json({ error: "Email or password incorrect" });
          }
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Database error while signing in" });
  }
};
