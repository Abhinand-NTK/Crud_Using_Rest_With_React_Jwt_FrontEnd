import React from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/user/userSlice';

const Navbar = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        dispatch(logout());
        console.log("Hai  i am back to the panel")
        console.log("Hai  i am back to the panel")
        console.log("Hai  i am back to the panel")
        console.log("Hai  i am back to the panel")
        // Navigate('/registerpage');
        console.log("Hai i am ready to navigate")
        console.log("Hai i am ready to navigate")
        console.log("Hai i am ready to navigate")
        console.log("Hai i am ready to navigate")
    };

    const guestLinks = (
        <>
            <li>
                <NavLink className='linkli' to='/loginpage'>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink className='linkli' to='/registerpage'>
                    Register
                </NavLink>
            </li>
        </>
    );

    const userLinks = (
        <>
            <li>
                <NavLink className='linkli' to='/profile'>
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink onClick={handleLogout} className='linkli'>
                    Logout
                </NavLink>
            </li>
        </>
    );

    const adminLinks = (
        <>
            <li>
                <NavLink className='linkli' to='/admindashboard'>
                    Admin Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink className='linkli' to='/admin'>
                    Admin Login
                </NavLink>
            </li>
        </>
    );

    return (
        <div className='nav'>
            <div className='navbar'>
                <div>
                    <h1>Navbar</h1>
                </div>
                <div className='lists'>
                    {user.user ? (
                        user.is_admin ? (
                            <>
                                {adminLinks}
                                {userLinks}
                            </>
                        ) : (
                            userLinks
                        )
                    ) : (
                        guestLinks
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
