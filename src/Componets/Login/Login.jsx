// import React, { useState } from 'react'
// import Layout from '../Layout/Layout'
// import './login.css'
// import { useDispatch, useSelector } from 'react-redux'
// import { userLogin } from '../../app/user/userSlice'
// import { useNavigate } from 'react-router-dom'




// const Login = () => {

//     const dispatch = useDispatch()
//     const check = useSelector((state) => state.user);


//     const Naviagate = useNavigate()

//     const [user, setUser] = useState({
//         email: '',
//         password: '',

//     })

//     const loginpage = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });

//     }

//     const login = () => {
//         dispatch(userLogin(user))
//             .then((response) => {

//                 console.log(check)
//                 console.log(check.user)

//                 // if (check.user) {

//                     Naviagate('/');
//                 // }
//             });

//     }

//     const registeredUser = useSelector((state) => state.user.user);

//     return (
//         <>
//             <Layout title='Auth | Login | Login Dashboard' content='Login Dashboard page'>
//                 <div className='alignment'>
//                     <div className='loginContainer'>
//                         <div className='success'>
//                             {registeredUser && <p>User is created Scucessfully</p>}
//                         </div>
//                         <div className='success'>
//                             {registeredUser && <p>Login</p>}
//                         </div>
//                         <div className="data">
//                             <label htmlFor="email">Email</label>
//                             <input onChange={loginpage} type="email" name="email" placeholder='Enter The email' id="email" />
//                         </div>
//                         <div className="data">
//                             <label htmlFor="email">Password</label>
//                             <input onChange={loginpage} placeholder='Enter the password' type="password" name="password" id="Password" />
//                         </div>
//                         <div>
//                             <button type='submit' onClick={login}>Login</button>
//                         </div>
//                     </div>
//                 </div>

//             </Layout>
//         </>
//     )
// }

// export default Login




import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../app/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const check = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const loginpage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const login = async () => {
    if (!user.email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }
  
    try {
      const decodedToken = await dispatch(userLogin(user));
      if (decodedToken) {
        navigate('/');
      } else {
        setErrors({ ...errors, email: 'User not found. Please check your email or register.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ ...errors, email: 'An error occurred. Please try again.' });
    }
  };
  

  return (
    <>
      <Layout title='Auth | Login | Login Dashboard' content='Login Dashboard page'>
        <div className='alignment'>
          <div className='loginContainer'>
            <div className={`data ${errors.email && 'error'}`}>
              <label htmlFor='email'>Email</label>
              <input
                onChange={loginpage}
                type='email'
                name='email'
                placeholder='Enter The email'
                id='email'
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <p className='error-message'>{errors.email}</p>}
            </div>
            <div className='data'>
              <label htmlFor='password'>Password</label>
              <input
                onChange={loginpage}
                placeholder='Enter the password'
                type='password'
                name='password'
                id='Password'
              />
            </div>
            <div>
              <button type='submit' onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
