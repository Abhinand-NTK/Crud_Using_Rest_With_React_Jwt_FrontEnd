import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import './Admin.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../app/user/userSlice'
import { jwtDecode } from 'jwt-decode'




const Admin = () => {

    const [err,setErr]=useState()

    const dispatch = useDispatch()

    const Navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: '',

    })

    console.log(user)
    const loginpage = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

    }

    setTimeout(() => {
        setErr('')
    }, 8000);

    const adminLogin = () => {
        dispatch(userLogin(user))
            .then(() => {
                const token = localStorage.getItem('jwtToken');
                const decodedToken = jwtDecode(token);
                console.log(token);
                const check = decodedToken.is_admin;

                if (check) {
                    Navigate('/admindashboard');
                }
                else if(!check)
                {
                    setErr("Invalid Credentials")

                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                // You can handle the error here, e.g., display an error message to the user
            });
    }
    return (
        <>
            <Layout>
                <div className='alignment'>
                    <div className='loginContainer'>
                        <div>
                            <p>Admin Login</p>
                        </div>
                        <div className='errmessage'>
                            <p>{err}</p>
                        </div>
                        <div className="data">
                            <label htmlFor="email">Email</label>
                            <input onChange={loginpage} type="email" name="email" placeholder='Enter The email' id="email" />
                        </div>
                        <div className="data">
                            <label htmlFor="email">Password</label>
                            <input onChange={loginpage} placeholder='Enter the password' type="password" name="password" id="Password" />
                        </div>
                        <div>
                            <button onClick={adminLogin} type='submit' >Login</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Admin
