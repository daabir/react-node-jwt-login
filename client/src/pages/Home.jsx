import React from 'react';
import customAxiosInstance from '../utils/JwtInterceptor';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/actions/actions';



function Home() {
  const axiosJWT = customAxiosInstance();
  const dispatch = useDispatch();
  function logOutUser(e){
    e.preventDefault();
    dispatch(logOut());
  }
  return (
    <div>
        HomePage. We will fetch some data later here.
        We will also use interceptors here.
        AccessTokens and Refresh Tokens will be used.  
        <button onClick={(e)=>{logOutUser(e)}}>Log Out</button>
    </div>
  )
}

export default Home