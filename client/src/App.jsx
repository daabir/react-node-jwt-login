import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';

function App() {
  const isLoggedIn = false;

  const ProtectRoute = ({children}) => {
    return isLoggedIn ? children : <Navigate to={"/"}/>
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/home' element={<ProtectRoute><Home/></ProtectRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
