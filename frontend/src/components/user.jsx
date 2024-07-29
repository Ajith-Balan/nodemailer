import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const user = () => {


const  [user,setUser]=useState({
  username:"",
  password:"",
  cpassword:""
})
const  [loginuser,setLoginUser]=useState({
  username:"",
  password:""
})

const signUp=async ()=>{
  console.log(user);

  const res=await axios.post("http://localhost:3000/api/user",user)
  console.log(res);
}


const signIn=async()=>{
  console.log(loginuser);
  const res=await axios.post("http://localhost:3000/api/login",loginuser)
  console.log(res);
}



  const handleChange=(e)=>{
setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const handleChange2=(e)=>{
    setLoginUser((pre)=>({...pre,[e.target.name]:e.target.value}))
      }
  return (
    <div>
      
<input type="text" name='username' onChange={handleChange} placeholder='username' />
<input type="text" name='password' onChange={handleChange} placeholder='password' />
<input type="text" name='cpassword' onChange={handleChange} placeholder='confirm password' />
<button onClick={signUp}>Sign up</button>

<hr />


<input type="text" name='username' onChange={handleChange2} placeholder='username' />
<input type="text" name='password' onChange={handleChange2} placeholder='password' />
<button onClick={signIn}>Sign in</button>
<Link to={`/fpwd`}>forget password?</Link>
    </div>
  )
}

export default user
