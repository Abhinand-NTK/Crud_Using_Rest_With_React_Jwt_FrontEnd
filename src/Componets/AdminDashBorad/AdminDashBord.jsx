import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import './AdminDashBord.css'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../app/user/userApi'
import { updateSuperUser } from '../../app/user/userSlice'





const AdminDashBord = () => {

    const [userData, setUserData] = useState(null);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const tokenAdmin = localStorage.getItem('jwtToken')
    const [isLoading, setIsLoading] = useState(true);
    let decodedAdminToken;
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [searchTerm,setSerchTerm] = useState('')



    if (tokenAdmin) {
        decodedAdminToken = jwtDecode(tokenAdmin)
    }
    useEffect(() => {
        if (!tokenAdmin) {
            navigate('/admindashboard');
        } else {
            adminUserDetails();
            getUserlist();
        }
    }, [tokenAdmin]);

    useEffect(() => {
        if (!user.superuser && !isLoading) {
            setTimeout(() => navigate('/admin'));
        }
    }, [user.superuser, isLoading]);

    async function adminUserDetails() {
        try {
            const response = await axios.get(`${BASE_URL}/users/user-detail/${decodedAdminToken.user_id}/`);
            dispatch(updateSuperUser(response.data));
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setIsLoading(false);
        }
    }


    async function getUserlist() {
        const request = await axios.get(`${BASE_URL}/users/user-list/`);
        setUsers(request.data);
    }
    async function getData()
    {
        const request = await axios.get(`${BASE_URL}/users/user-list/?search=${searchTerm}`);
        setUsers(request.data);
        console.log("This is the search term",request.data)

    }



  
    return (
        <>
            <Layout>
                {isLoading ? <p>Loading....</p> : <p>Admin</p>}
                {
                    user.superuser ? (
                        <div className='tablealignement'>
                            <div className="table-responsive">
                                <div className='searchBox'>
                                    <input value={searchTerm} placeholder='Enter the search input' onChange={(e)=>{setSerchTerm(e.target.value); getData()}} type="text" name="" id="" />
                                    {/* <a>Search</a> */}
                                </div>
                                <table className="table table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">FirstName</th>
                                            <th scope="col">LastName</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Change Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr className=''>
                                                <td>{index + 1}</td>
                                                <td><img src="" alt="NO PROFILE PIC" /></td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.is_active ? 'True' : 'False'}</td>
                                                <td><a className='block'>Block/UnBlock</a></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                        </div>

                    ) : (<p className='errorfornotlogin'>Your not Logged In Please Login in first</p>
                    )
                }

            </Layout>
        </>
    )
}

export default AdminDashBord

