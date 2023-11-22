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
    


        if(tokenAdmin) {
            decodedAdminToken = jwtDecode(tokenAdmin)
        }
    useEffect(() => {
        if (!tokenAdmin) {
            navigate('/admindashboard');
        } else {
            adminUserDetails();
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

    useEffect(()=>{
        try{
            const response = await axios.get(`${BASE_URL}/users/user-detail/`)
        }catch(error){
            console.error('Error fetcing user details':error)
        }
        finally{
            setIsLoading(false)
        }
    })


    return (
        <>
            <Layout>
                {isLoading ? <p>Loading....</p> : <p>Admin</p>}
                {
                    user.superuser ? (
                        <div className='tablealignement'>
                            <div className="table-responsive">
                                <table className="table table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">FirstName</th>
                                            <th scope="col">LastName</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className=''>
                                            <td>1</td>
                                            <td><img src="" alt="NO PROFILE PIC" /></td>
                                            <td>Abhinand</td>
                                            <td>Ntk</td>
                                            <td>Email</td>
                                            <td><a href="">Block</a></td>
                                        </tr>

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

