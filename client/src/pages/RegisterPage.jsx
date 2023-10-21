import React, { useState } from 'react'
import axios from 'axios'

function RegisterPage() {
  const initialValues={
    username:'',
    password:'',
    phone:'',
    email:'',
    country:''
  }
  const [userData, setUserData] = useState(initialValues);
  const [confPass, setConfPass] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  function submitData(e){
    e.preventDefault();
    console.log(userData)
  }
  return (
    <div>
        <h3>RegisterPage</h3>
        <p>This is the page where you collect all the data you need for registration</p>
        <br></br>
        <form onSubmit={(e)=>{submitData(e)}}>
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              type='text'
              onChange={(e)=>{
                setUserData({...userData, username:e.target.value})
              }}
            ></input>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type={showPwd?'text':'password'}
              onChange={(e)=>{
                setUserData({...userData, password:e.target.value})
              }}
            ></input>
            <label htmlFor='confPass'>Confirm Password</label>
            <input
              name='confPass'
              type={showPwd?'text':'password'}
              onChange={(e)=>{
                setConfPass(e.target.value)
              }}
            ></input>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='email'
              onChange={(e)=>{
                setUserData({...userData, email:e.target.value})
              }}
            ></input>
            <label htmlFor='country'>Country</label>
            <input
              name='country'
              type='text'
              onChange={(e)=>{
                setUserData({...userData, country:e.target.value})
              }}
            ></input>
            <label htmlFor='phone'>Phone</label>
            <input
              name='phone'
              type='number'
              onChange={(e)=>{
                setUserData({...userData, phone:e.target.value})
              }}
            ></input>
            <input name='showPass' type='checkbox' onChange={()=>{setShowPwd(!showPwd)}}></input>
            <label htmlFor='showPass'>Show Passwords</label>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage