import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import { useSelector } from 'react-redux'

function App() {
  const isLoggedIn = useSelector((state)=>state.loginstatereducer)

  const ProtectRoute = ({children}) => {
    return isLoggedIn ? children : <Navigate to={"/"}/>
  }

  const PreventBack = ({children}) => {
    return isLoggedIn ? <Navigate to={"/home"}/> : children
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PreventBack><LoginPage/></PreventBack>} />
        <Route path='/register' element={<PreventBack><RegisterPage/></PreventBack>} />
        <Route path='/home' element={<ProtectRoute><Home/></ProtectRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
