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

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    try {
        const result="SELECT * from user WHERE username=$1",[username];
        const row=result.rows[0];
        if(!row){
            console.log('user not found');
        }
        if(row.password!=password){
            console.log('incorrect password');
        }
    } catch (error) {
        
    }
})

app.listen(5000,()=>{
    console.log("server running at port 5000");
    
})
