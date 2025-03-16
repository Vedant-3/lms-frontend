import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <section className="f-wrapper">
            <div className="paddings innerWidth  f-container">
                <div className="flexColStart f-left">
                    <img src="./logo5.png" alt="" width={120} />
                    <span className='secondaryText'>Our vision is to make all people<br />find their best read</span>   
                </div>

                <div className="flexColStart f-right">
                    <span className="primaryText">Information</span>
                    <span className="secondaryText">BookHive Library, Viman Nagar, Pune</span>

                    <div className="f-menu">
                        <span><Link to='/'>Home</Link></span>
                        <span><Link to='/books'>Catalogue</Link></span>
                        <span><Link to='/contactUs'>Contact us</Link></span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer