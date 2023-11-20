import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../app/user/userSlice'
import { useNavigate } from 'react-router-dom'




const Login = () => {

    const dispatch = useDispatch()
    const check = useSelector((state) => state.user);


    const Naviagate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: '',

    })

    const loginpage = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

    }

    const login = () => {
        dispatch(userLogin(user))
            .then((response) => {

                console.log(check)
                console.log(check.user)

                // if (check.user) {

                    Naviagate('/');
                // }
            });

    }

    const registeredUser = useSelector((state) => state.user.user);

    return (
        <>
            <Layout title='Auth | Login | Login Dashboard' content='Login Dashboard page'>
                <div className='alignment'>
                    <div className='loginContainer'>
                        <div className='success'>
                            {registeredUser && <p>User is created Scucessfully</p>}
                        </div>
                        <div className='success'>
                            {registeredUser && <p>Login</p>}
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
                            <button type='submit' onClick={login}>Login</button>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default Login




