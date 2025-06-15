import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/Usercontex.jsx' // Assuming UserContext is default export
import { CaptainContext } from './context/CaptainContex.jsx' // Assuming CaptainContext is named export

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext> {/* UserContext is now outside CaptainContext */}
        <CaptainContext>
          <App />
        </CaptainContext>
      </UserContext>
    </BrowserRouter>
  </StrictMode>,
)