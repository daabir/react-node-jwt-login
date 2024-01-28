import React, { useEffect, useState } from 'react';
import customAxiosInstance from '../utils/JwtInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/actions';
import axios from 'axios';



function Home() {
  const axiosJWT = customAxiosInstance();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.loginreducer)
  const [message, setMessage] = useState('');

  function logOutUser(e){
    e.preventDefault();
    axiosJWT.post("http://localhost:4000/logout", {token: user[0].refreshToken}, {authtoken:"Bearer "}).then((response) => {
      if(response.status === 200){
        console.log(response)
        dispatch(logOut());
      } else {
        alert("Error")
      }
    })
  }

  function fetchData(){
    const cancelToken = axios.CancelToken.source();
    axiosJWT.get("http://localhost:4000/home", {authtoken: "Bearer ", cancelToken:cancelToken.token}).then((response)=>{
      console.log(response)
    }).catch((err)=>{
      if(axios.isCancel(err)){
        console.log("Request Cancelled.")
      }else if(axios.AxiosError){
        alert("A connection error has occurred.")
      }
    })
    return () => {
      cancelToken.cancel()
    }
  }
  useEffect(fetchData,[]);

  return (
    <div>
        <p>Logged in as "{user[0].username}"</p>
        <button onClick={(e)=>{logOutUser(e)}}>Log Out</button>
        <div>
          <p>Message Data: {message}</p>
          <button onClick={() => {fetchData()}}>Fetch Manually</button>
        </div>
    </div>
  )
}

export default Home