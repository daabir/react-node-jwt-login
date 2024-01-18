import React from 'react';
import customAxiosInstance from '../utils/JwtInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/actions';



function Home() {
  const axiosJWT = customAxiosInstance();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.loginreducer)
  function logOutUser(e){
    e.preventDefault();
    axiosJWT.post("http://localhost:4000/logout", {token: user.refreshToken}, {authtoken:"Bearer "}).then((response) => {
      if(response.status === 200){
        dispatch(logOut());
      } else {
        alert("Error")
      }
    })
  }
  return (
    <div>
        <p>Logged in as "{user.username}"</p>
        <button onClick={(e)=>{logOutUser(e)}}>Log Out</button>
    </div>
  )
}

export default Home