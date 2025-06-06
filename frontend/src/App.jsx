import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/user-login" element={<UserLogin />} />
    </Routes>
    </>
  )
}

export default App