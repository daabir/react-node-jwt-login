import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { refreshTkn } from '../redux/actions/actions';

const customAxiosInstance = () => {
    const axiosJWT = axios.create();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.loginreducer);
    var accesstoken = user[0].accessToken;
    var refreshtoken = user[0].refreshToken;

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwtDecode(accesstoken);
            if(decodedToken.exp * 1000 < currentDate.getTime()){
                const data = await refreshToken();
                config.headers['authtoken'] = 'Bearer ' + data.accessToken;
            } else {
                config.headers['authtoken'] = 'Bearer ' + accesstoken;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    );

    const refreshToken = async () =>{
        try {
            const res = await axios.post("http://localhost:4000/refreshToken", { token: refreshtoken });
            refreshtoken = res.data.refreshToken;
            accesstoken = res.data.accessToken;
            dispatch(refreshTkn({accessToken: res.data.accessToken, refreshToken: res.data.refreshToken}));
            return res.data
        } catch (err){
            console.error(err);
        }
    }
    return axiosJWT;
}

export default customAxiosInstance;