const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ================= REGISTER =================

router.post("/register", async (req, res) => {

  const {
    full_name,
    email,
    password,
    role,
    phone,
    address,
  } = req.body;

  try {

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {

      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    await db.query(

      `INSERT INTO users
      (
        full_name,
        email,
        password,
        role,
        phone,
        address
      )
      VALUES (?,?,?,?,?,?)`,

      [
        full_name,
        email,
        password,
        role,
        phone,
        address,
      ]
    );

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

  const {
    email,
    password,
  } = req.body;

  try {

    const [rows] = await db.query(

      `SELECT * FROM users
      WHERE email = ? AND password = ?`,

      [email, password]
    );

    if (rows.length === 0) {

      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // CHECK ACCOUNT STATUS

    if (rows[0].account_status !== "active") {

      return res.status(403).json({
        message: "Account Blocked or Suspended",
      });
    }

    res.status(200).json({

      message: "Login Successful",

      token: "dummy-token",

      user: rows[0],
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});


// ================= GET ALL USERS =================

router.get("/users", async (req, res) => {

  try {

    const [rows] = await db.query(
      "SELECT * FROM users"
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ================= GET SINGLE USER =================

router.get("/users/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const [rows] = await db.query(

      "SELECT * FROM users WHERE id = ?",

      [id]
    );

    if (rows.length === 0) {

      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.json(rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ================= UPDATE USER =================

router.put("/users/:id", async (req, res) => {

  const { id } = req.params;

  const {
    full_name,
    phone,
    address,
  } = req.body;

  try {

    await db.query(

      `UPDATE users
      SET
      full_name = ?,
      phone = ?,
      address = ?
      WHERE id = ?`,

      [
        full_name,
        phone,
        address,
        id,
      ]
    );

    res.json({
      message: "User Updated Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ================= DELETE USER =================

router.delete("/users/:id", async (req, res) => {

  const { id } = req.params;

  try {

    await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    res.json({
      message: "User Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


module.exports = router;