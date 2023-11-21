import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import './AdminDashBord.css'
import { jwtDecode } from 'jwt-decode'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const AdminDashBord = () => {

    const [userData, setUserData] = useState(null);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    useEffect(() => {
        if (!user.user) {
          setTimeout(() => navigate('/admin'), 5000);
        }
      }, [user, navigate]);
  

    return (
        <>
            <Layout>
                {
                    user.user ?(
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

                    ):( <p className='errorfornotlogin'>Your not Logged In Please Login in first</p>
                        )
                }
                
            </Layout>
        </>
    )
}

export default AdminDashBord

