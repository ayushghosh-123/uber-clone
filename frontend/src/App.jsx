import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import Start from './pages/Start'
import Userprotectedrap from './pages/Userprotectedrap'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import CaptainProtectWrapper from './pages/Captainprotectedwrapper'

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/riding" element={<Riding />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/home" element={<Userprotectedrap><Home /></Userprotectedrap>} />
      <Route path="/user/logout" element={<Userprotectedrap>
        <UserLogout/>
      </Userprotectedrap>} />
      <Route path='/captain-home' element={<CaptainProtectWrapper> <CaptainHome /> </CaptainProtectWrapper>} />
      <Route  path='/captain-riding' element={<CaptainRiding/>}/>
    </Routes>
    </>
  )
}

export default App