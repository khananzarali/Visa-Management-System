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

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  // Middleware function. 'next()' tells Express to continue to the next middleware or route.
  const authHeader = req.headers["authorization"];

  // Get the JWT from the Authorization header.
  // The header looks like: "Bearer <token>"
  // split(" ")[1] extracts only the token.
  const token = authHeader && authHeader.split(" ")[1];

  // If no token was sent, stop the request and return a 401 Unauthorized response.
  if (!token) return res.status(401).json({ message: "Access token missing" });

  // Verify the token using the server's secret key.
  // If valid, 'user' contains the decoded payload from the JWT.
  jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key", (err, user) => {

    // If verification fails (invalid, modified, or expired token), return a 403 Forbidden response.
    if (err) return res.status(403).json({ message: "Invalid or expired token" });

    // Store the decoded user information on the request object
    // so the next middleware or route can access it.
    req.user = user;

    // Authentication succeeded, continue to the next middleware or route.
    next();
  });
};
app.post('api/writing',(res,req)=>{
    if(user=="user"){
      const result='SELECT stories FROM user'
    }
    else if(user='author'){
      const result='SELECT stories FROM user WHERE role is author, admin=$1',[user_name];
    }
    else if(user=='admin'){
      const result = 'SELECT * FROM users'
    }
});
app.listen(5000,()=>{
    console.log("server running at port 5000");
})
