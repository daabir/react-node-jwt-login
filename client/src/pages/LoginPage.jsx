import React, { useState } from 'react'
import axios from 'axios'

function LoginPage() {
    const initialValues = {
        userId: '',
        password: ''
    }
    const [loginData, setLoginData] = useState(initialValues);
    const [showPwd, setShowPwd] = useState(false);

    function submitData(e){
        e.preventDefault();
        console.log(loginData)
    }
  return (
    <div>
        <h3>LoginPage</h3>
        <form onSubmit={(e)=>{submitData(e)}}>
            <label htmlFor='userid'>User ID:</label><br></br>
            <input 
                type='text'
                name='userid'
                onChange={(e)=>{
                    setLoginData({ ...loginData, userId : e.target.value })
                }}
            ></input><br></br>
            <label htmlFor='password'>Password:</label><br></br>
            <input 
                type={showPwd?'text':'password'}
                name='password'
                onChange={(e)=>{
                    setLoginData({ ...loginData, password : e.target.value })
                }}
            ></input><br></br>
            <input 
                type='checkbox' 
                name='showpwd' 
                onChange={()=>{
                    setShowPwd(!showPwd)
                }}
            ></input>
            <label htmlFor='showpwd'>Show Password</label><br></br>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage