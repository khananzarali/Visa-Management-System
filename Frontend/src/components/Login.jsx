import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login (){
    const {username,setusername}=useState();
    const {password,setpassword}=useState();
    const handlesubmit=async(e)=>{
        const Navigate=useNavigate()
        e.prevent.default()
        try {
            const response=await axios.post('https:localhost/5000',{
                username,
                password
            })
             Navigate('/home')
        } catch (error) {
            console.log(error)
            alert('this is fucked up')
        }
       
    }
    return(
        <>
        <form action="submit">
            <input type="text" placeholder="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}
export default Login