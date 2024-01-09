import React from 'react';
import customAxiosInstance from '../utils/JwtInterceptor';


function Home() {
  const axiosJWT = customAxiosInstance();
  
  return (
    <div>
        HomePage. We will fetch some data later here.
        We will also use interceptors here.
        AccessTokens and Refresh Tokens will be used.
    </div>
  )
}

export default Home