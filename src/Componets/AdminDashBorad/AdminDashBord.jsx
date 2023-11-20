import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import './AdminDashBord.css'
import { jwtDecode } from 'jwt-decode'



const AdminDashBord = () => {

    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(token);
    console.log(token)
    console.log(decodedToken.is_admin)
  

    // useEffect(() => {
    //   const fetchUserData = async () => {
    //     try {
    //       // Fetch the JWT from wherever it's stored in your application (e.g., localStorage)
  
    //       if (token) {
    //         // Decode the JWT to access user information

    //         console.log(decodedToken.username)
  
    //         // Make a request to the Django Rest Framework endpoint to get user details
    //         const response = await axios.get('/api/user-details/');
    //         setUserData({
    //           username: decodedToken.username,
    //           is_superuser: decodedToken.is_superuser,
    //           // Add other user information as needed
    //         });
    //       }
    //     } catch (error) {
    //       console.error('Error fetching user details:', error);
    //     }
    //   };
  
    //   fetchUserData();
    // }, []);
    return (
        <>
            <Layout>
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
            </Layout>
        </>
    )
}

export default AdminDashBord
