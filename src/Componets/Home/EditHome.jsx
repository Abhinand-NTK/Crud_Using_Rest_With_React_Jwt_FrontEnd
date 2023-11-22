
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import './EditHome.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../../app/user/userApi';
import axios from 'axios';
import { updateUser } from '../../app/user/userSlice';
import { default_profile_link } from '../../assets/defaultprofile';
import toast, { Toaster } from 'react-hot-toast';

const EditHome = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('jwtToken');
  const [isLoading, setIsLoading] = useState(true);
  let decodedToken;
  const dispatch = useDispatch();
  const [passwordCheck, setPasswordCheck] = useState(false);
  const notify = () => toast('User data changed successfully');


  const [formData, updateFormData] = useState({
    first_name: user.user?.first_name,
    last_name: user.user ? user.user.last_name : '',
    email: user.user ? user.user.email : '',
    password: '',
  });

  console.log("This is the formdata", formData.password)



  if (storedToken) {
    decodedToken = jwtDecode(storedToken);
  }

  useEffect(() => {
    if (!storedToken) {
      navigate('/');
    } else {
      UserDetails();
    }
  }, [storedToken]);

  useEffect(() => {
    if (!user.user && !isLoading) {
      navigate('/loginpage');
    }
  }, [user.user, isLoading]);

  async function UserDetails() {
    try {
      const response = await axios.get(`${BASE_URL}/users/user-detail/${decodedToken.user_id}/`);
      console.log(response)
      dispatch(updateUser(response.data));
      updateFormData({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const updateUserDetails = async () => {
    try {
      const updatedUser = {
        first_name: formData.first_name,
        email: formData.email,
        last_name: formData.last_name,
        password: formData.password,
      };


      if (!formData.password) {
        setPasswordCheck(true);
        return;
      } else {
        setPasswordCheck(false);
      }


      const response = await axios.put(`${BASE_URL}/users/user-detail/${decodedToken.user_id}/`, updatedUser);

      if (response.status == 200) {
        notify()
        formData.password = ''
      }


      console.log("This is my data check this one and verify it", response.status)

      dispatch(updateUser(response.data));

      navigate('/edituser');
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };



  return (
    <>
      <Layout>
        <div className='maindivedituser'>

          {isLoading ? (
            <p>Loading...</p>
          ) : user.user ? (
            <div className='detailsedit'>
              {
                !user.user ? <p className='heading'>Your are not logged in </p> : <p className='heading'>Edit Admin</p>
              }
              <div className=''>
                <img src={default_profile_link} />
                <div className='boxfordata'>
                  <label htmlFor="firstname">Enter the firstname</label>
                  <input
                    type="text"
                    name="first_name"
                    id="firstname"
                    value={formData.first_name}
                    onChange={(e) => updateFormData({ ...formData, first_name: e.target.value })}
                  />

                  <label htmlFor="lastname">Enter the Lastname</label>
                  <input type="text"
                    name="lastname"
                    id="lastname"
                    value={formData.last_name}
                    onChange={(e) => updateFormData({ ...formData, last_name: e.target.value })}

                  />
                  <label htmlFor="email">Enter the Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => { updateFormData({ ...formData, email: e.target.value }) }}
                  />
                  <label htmlFor="lastname">Password</label>
                  <input type="password"
                    name="password"
                    id="Password"
                    onChange={(e) => { updateFormData({ ...formData, password: e.target.value }) }} />
                  {passwordCheck && (
                    <span className='error-message'>Password is required for updating user details.</span>
                  )}
                  <a onClick={updateUserDetails} className='edituser'>Submit Edit info</a>
                </div>
              </div>
            </div>
          ) : (
            <p className='errorfornotlogin'>You are not logged in. Please log in.</p>
          )}
          <Toaster
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #008000', 
                color: '#FFFFFF', 
                background: '#008000', 
              },
            }}
          />
        </div>
      </Layout>
    </>
  );
};

export default EditHome;
