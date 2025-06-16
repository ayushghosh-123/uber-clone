import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/Usercontex';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Userprotectedrap({ children }) {
  const { user , setUser } = useContext(UserContext);
  const [isloading, setIsloading] = useState(true)
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

   useEffect(() => {
        if (!token) {
            navigate('/user-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.user)
                setIsloading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/user-login')
            })
    }, [ token ])

  // Prevent rendering protected content if not logged in
 if (isloading) {
        return (
            <div>Loading...</div>
        )
    }

  return <>{children}</>;
}

export default Userprotectedrap