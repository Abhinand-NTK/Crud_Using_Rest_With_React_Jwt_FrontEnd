
import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import './EditHome.css';
import { NavLink,useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../../app/user/userApi';
import axios from 'axios';
import { updateUser } from '../../app/user/userSlice';
import { default_profile_link } from '../../assets/defaultprofile';

const EditHome = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('jwtToken');
  const [isLoading, setIsLoading] = useState(true);
  let decodedToken;
  const dispatch = useDispatch();

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
      dispatch(updateUser(response.data));
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const edituser = () => {
    navigate('/edituser')
  }


  return (
    <>
      <Layout>
        <div className='maindivedituser'>

          {isLoading ? (
            <p>Loading...</p>
          ) : user.user ? (
            <div className='detailsedit'>
              {
                !user.user ? <p className='heading'>Your are not logged in </p> : <p className='heading'>Login in</p>
              }
              <div className=''>
                <img src={default_profile_link} />
                <div className='boxfordata'>
                  <label htmlFor="firstname">Enter the firstname</label>
                  <input type="text" name="" id="firstname" />
                  <label htmlFor="lastname">Enter the Lastname</label>
                  <input type="text" name="" id="lastname" />
                  <label htmlFor="email">Enter the Email</label>
                  <input type="text" name="" id="email" />
                  <label htmlFor="lastname">Password</label>
                  <input type="text" name="" id="Password" />
                  <label htmlFor="repeatpassword">Repeat Password</label>
                  <input type="text" name="" id="repeatpassword" />
                  <a href="" className='edituser d'>Submit Edit info</a>
                </div>
              </div>
            </div>
          ) : (
            <p className='errorfornotlogin'>You are not logged in. Please log in.</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default EditHome;
