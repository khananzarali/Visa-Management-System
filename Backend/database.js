const { configDotenv } = require('dotenv');
const express= require('express');
const app=express();
const {Pool}=require('pg');

const Pool = new Pool({
user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
})

app.post("/login", async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_name = $1",
      [user_name]
    );

    const row = result.rows[0];

    if (!row) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (row.password !== password) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: row.id, user_name: row.user_name, role: row.role },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token,
      role: row.role,
      user_id: row.id
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(5000,()=>{
    console.log("server running at port 5000");
    
})
