import React, { useState } from 'react';

export const UserContext = React.createContext();

function Usercontext({ children }) {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
    password: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default Usercontext;
