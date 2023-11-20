import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const Home = () => {
    const user = useSelector((state) => state.user)

    const Navigate = useNavigate()

    // useEffect(() => {

    //     // if(!user.user)
    //     // {

    //     //     Navigate('/loginpage')
    //     // }
       
      
    //   }, [user]);
    return (
        <>
            <Layout>
                <div>
                    {user.user ? (
                        <div>
                            <p>Welcome, {user.user.first_name + user.user.last_name}</p>
                            <p>Email: {user.user.email}</p>
                            <p>Email: {user.user.is_admin ? 'Admin' : 'Staff/User'}</p>

                            {/* <p>Status: {user.user.is_admin?'Admin':'user'}</p> */}
                        </div>
                    ) 
                    : <p>Hai hallo the user is this</p> }
                    <h1>Hello user Welcome </h1>
                </div>
            </Layout>
        </>
    )
}

export default Home