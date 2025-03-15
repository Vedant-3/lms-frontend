import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <section className="h-wrapper">
            <div className="flexCenter  innerWidth h-container">
                <img src="./logo.png" alt="logo" width={'100px'}></img>
                <div className="flexCenter h-menu">
                    <Link to='/'>Home</Link>
                    <Link to='/books'>Books</Link>
                    <Link to='/contactUs'>Contact us</Link>
                    <Link to ='/login'><button className='button'><a>Login</a></button></Link>
                </div>
                
            </div>
        </section>
    )
}
export default Header;