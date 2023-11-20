import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { userApi } from '../../app/user/userApi'
import { userRegistation } from '../../app/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import './Register.css'
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const registrationError = useSelector((state) => state.user.error);
    const registeredUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const [formData, setFormdata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        // repeatpassword: '',
    })
    const handleinputchange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });

    }



    const RegisterUser = () => {
        console.log("The button is working in proper way")

        dispatch(userRegistation(formData))
            .then(() => {
                navigate('/loginpage');
            });



    }

    console.log(formData)

    return (
        <>
            <Layout>

                <div className='alignment'>
                    <div className='signContainer'>
                        <div className='registration'>
                            {registeredUser && (
                                <div className='reg'>
                                    <p>User successfully registered:</p>
                                    {/* <p>First Name: {registeredUser.first_name}</p>
                            <p>Last Name: {registeredUser.last_name}</p>
                            <p>Email: {registeredUser.email}</p> */}
                                </div>
                            )}
                        </div>
                        <div className='data'>
                            <label id='email' htmlFor="">Enter the Email Address</label>
                            <input type="text" onChange={handleinputchange} placeholder='Enter the email' name="email" id="email" />
                        </div>
                        <div className='data'>
                            <label id='first_name' htmlFor="">Enter the firstname</label>
                            <input type="text" onChange={handleinputchange} name="first_name" placeholder='Enter the firstname' id="first_name" />
                        </div>
                        <div className='data'>
                            <label id='last_name' htmlFor="">Enter the lastname</label>
                            <input type="text" onChange={handleinputchange} name="last_name" placeholder='Enter the lastname' id="last_name" />
                        </div>
                        <div className='data'>
                            <label id='password' htmlFor="">Enter the password</label>
                            <input type="password" onChange={handleinputchange} name="password" placeholder='Enter the password' id="password" />
                        </div>
                        <div className='data'>
                            <label id='repeatpassword' htmlFor="">Enter the repeatpassword</label>
                            <input type="password" name="repeatpassword" placeholder='Enter the repeatpassword' id="repeatpassword" />
                        </div>
                        <div>
                            <button onClick={RegisterUser}>Register</button>
                            {registrationError && <p>Error: {registrationError}</p>}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Register
