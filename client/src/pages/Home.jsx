import React, { useEffect, useState } from 'react';
import customAxiosInstance from '../utils/JwtInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/actions';
import axios from 'axios';

function Home() {
  const axiosJWT = customAxiosInstance();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginreducer)
  const [message, setMessage] = useState('');
  const [newMsg, setNewmsg] = useState('');
  const [updMsg, setUpdmsg] = useState('');
  const [msgExists, setMsgexists] = useState(false)

  function logOutUser(e) {
    e.preventDefault();
    axiosJWT.post("http://localhost:4000/logout", { token: user[0].refreshToken }, { authtoken: "Bearer " }).then((response) => {
      if (response.status === 200) {
        console.log(response)
        dispatch(logOut());
      } else {
        alert("Error")
      }
    })
  }

  function fetchData() {
    const cancelToken = axios.CancelToken.source();
    axiosJWT.post("http://localhost:4000/home", { userId: user[0].username }, { authtoken: "Bearer ", cancelToken: cancelToken.token }).then((response) => {
      if (response.data[0].data) {
        setMsgexists(true);
        setMessage(response.data[0].data)
      } else {
        setMsgexists(false)
      }
    }).catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request Cancelled.")
      } else {
        console.log(err)
      }
    })
    return () => {
      cancelToken.cancel()
    }
  }
  useEffect(fetchData, []);

  function updateMsg(e) {
    e.preventDefault();
    if (updMsg == '') {
      alert("Message can't be empty!")
    } else {
      axiosJWT.post("http://localhost:4000/updateData", { userId: user[0].username, data: updMsg }, { authtoken: "Bearer " }).then((res) => {
        if (res.status == 200) {
          fetchData();
        }
      }).catch((err) => {
        alert("Error");
        console.log(err)
      })
    }
  }

  function saveData() {
    if (newMsg == '') {
      alert("Message can't be empty!")
    } else {
      axiosJWT.post("http://localhost:4000/createData", { userId: user[0].username, data: newMsg }, { authtoken: "Bearer " }).then((res) => {
        if (res.status == 200) {
          fetchData();
        }
      }).catch((err) => {
        alert("Error");
        console.log(err)
      })
    }
  }

  return (
    <div>
      <p>Logged in as "{user[0].username}"</p>
      <button onClick={(e) => { logOutUser(e) }}>Log Out</button>
      {msgExists ? (
        <div>
          <p>Message Data: {message}</p>
          <button onClick={() => { fetchData() }}>Fetch Manually</button>
          <br />
          <label htmlFor='updateData'>Want to update message?</label>
          <input
            type='text'
            placeholder='Type new message here...'
            onChange={(e) => { setUpdmsg(e.target.value) }}
          ></input>
          <button onClick={(e) => { updateMsg(e) }}>Update</button>
        </div>
      ) : (
        <div>
          <p>You have not saved any message data yet.</p><br />
          <p>Please save some data first:</p>
          <input
            type='text'
            placeholder='Type message data to save.'
            onChange={(e) => { setNewmsg(e.target.value) }}
          ></input><br />
          <button onClick={(e) => {
            e.preventDefault();
            saveData();
          }}>Save Data</button>

        </div>
      )}
    </div>
  )
}

export default Home