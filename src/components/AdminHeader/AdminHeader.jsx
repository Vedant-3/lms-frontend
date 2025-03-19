import React from 'react'
import './AdminHeader.css'
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <section className="h-wrapper">
            <div className="flexCenter  innerWidth h-container">
                <img src="./logo5.png" alt="logo" width={'80px'}></img>
                <div className="flexCenter h-menu">
                    <Link to='/'>Home</Link>
                    <Link to='/books'>Books</Link>
                    <Link to='/contactUs'>Contact us</Link>
                    <Link to='/login'><button className='button'><a>Login</a></button></Link>
                </div>

            </div>
        </section>
    )
}
export default AdminHeader;