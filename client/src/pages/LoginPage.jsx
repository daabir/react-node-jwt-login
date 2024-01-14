import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logIn } from '../redux/actions/actions'

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        userId: '',
        password: ''
    }
    const [loginData, setLoginData] = useState(initialValues);
    const [showPwd, setShowPwd] = useState(false);

    function submitData(e){
        e.preventDefault();
        axios.post("http://localhost:4000/login", {userData:loginData}).then((response)=>{
            if(response.message){
                alert(response.message);
            }else{
                dispatch(logIn(response.data));
                navigate("/home");
            }
        })
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
            <button type='submit'>Login</button><br></br>
            <p>Don't have an account? <Link to={'/register'}>Register Here</Link></p>
        </form>
    </div>
  )
}

export default LoginPage