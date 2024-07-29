import axios from 'axios';
import React, { useState } from 'react'

const Fpwd = () => {

const [username,setUserName]=useState('')
const submit=async ()=>{
console.log(username);
const res=await axios.post("http://localhost:3000/api/fpwd",{username:username})
console.log(res);
}

  return (
    <div>
 Enter your username
 <input type="text" onChange={(e)=>setUserName(e.target.value)} name='' />
 <button onClick={submit}>Submit</button>
    </div>
  )
}

export default Fpwd
