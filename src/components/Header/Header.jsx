
import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    }

    return (
        <section className="h-wrapper">
            <div className="flexCenter innerWidth h-container">
                <img src="./logo5.png" alt="logo" />
                <div className="flexCenter h-menu">
                    <Link to='/'>Home</Link>
                    <Link to='/books'>Books</Link>
                    <Link to='/contactUs'>Contact us</Link>
                    {
                        isLoggedIn ? (
                            <div className='profile-dropdown'>
                                <button className="button">
                                    <a>Profile ▾</a>
                                </button>
                                <div className="dropdown-content">
                                    <Link to="/profile">My Profile</Link>
                                    <a onClick={handleLogout}>Logout</a>
                                </div>
                            </div>
                        ) : (
                            <Link to={"/login"}>
                                <button className='button'>
                                    <a>Login</a>
                                </button>
                            </Link>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
export default Header;