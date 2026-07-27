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

app.post('\login',(req,res)=>{
    const {username,password}=req.body;
    

})

app.listen(5000,()=>{
    console.log("server running at port 5000");
    
})
