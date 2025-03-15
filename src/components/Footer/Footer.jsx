import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <section className="f-wrapper">
            <div className="paddings innerWidth  f-container">
                <div className="flexColStart f-left">
                    <img src="./logo2.png" alt="" width={120} />
                    <span className='secondaryText'>Our vision is to make all people<br />the best place to live for them</span>   
                </div>

                <div className="flexColStart f-right">
                    <span className="primaryText">Information</span>
                    <span className="secondaryText">145 New York, FL 5467, USA</span>

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