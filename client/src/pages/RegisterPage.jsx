import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function RegisterPage() {
  const initialValues={
    username:'',
    password:'',
    phone:'',
    email:'',
    country:'',
    isAdmin: false
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
            <label htmlFor='username'>Username:</label>
            <input
              name='username'
              type='text'
              onChange={(e)=>{
                setUserData({...userData, username:e.target.value})
              }}
            ></input><br></br>
            <label htmlFor='password'>Password:</label>
            <input
              name='password'
              type={showPwd?'text':'password'}
              onChange={(e)=>{
                setUserData({...userData, password:e.target.value})
              }}
            ></input><br></br>
            <label htmlFor='confPass'>Confirm Password:</label>
            <input
              name='confPass'
              type={showPwd?'text':'password'}
              onChange={(e)=>{
                setConfPass(e.target.value)
              }}
            ></input><br></br>
            <label htmlFor='email'>Email:</label>
            <input
              name='email'
              type='email'
              onChange={(e)=>{
                setUserData({...userData, email:e.target.value})
              }}
            ></input><br></br>
            <label htmlFor='country'>Country:</label>
            <input
              name='country'
              type='text'
              onChange={(e)=>{
                setUserData({...userData, country:e.target.value})
              }}
            ></input><br></br>
            <label htmlFor='phone'>Phone:</label>
            <input
              name='phone'
              type='number'
              onChange={(e)=>{
                setUserData({...userData, phone:e.target.value})
              }}
            ></input><br></br>
            <label htmlFor='isAdmin'>Are you an admin?</label>
            <select 
              name='isAdmin' 
              onChange={(e)=>{setUserData({...userData,isAdmin:e.target.value})}}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select><br></br>
            <input name='showPass' type='checkbox' onChange={()=>{setShowPwd(!showPwd)}}></input>
            <label htmlFor='showPass'>Show Passwords</label><br></br>
            <button type='submit'>Register</button><br></br>
            <p>Already have an account? <Link to={'/'}>Login</Link></p>
        </form>
    </div>
  )
}

export default RegisterPage