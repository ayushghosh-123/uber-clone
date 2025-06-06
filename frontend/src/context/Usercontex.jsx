import React from 'react'
export const UserContext = React.createContext()
import { useState } from 'react'

function Usercontex({children}) {

    const [user, setUser] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''    
        },
        password: '',
    })
  return (
    <div>
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    </div>
  )
}

export default Usercontex