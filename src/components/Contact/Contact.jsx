import React from 'react'

import { MdCall } from 'react-icons/md'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';

import './Contact.css'
const Contact = () => {
    return (
        <section className="c-wrapper">
            <div className="paddings innerWidth flexCenter c-container">
                <div className="flexColStart c-left">
                    <span className='orangeText'>Our Contacts</span>
                    <span className='primaryText'>Easy to contact us</span>
                    <span className="secondaryText">We always ready to help by providing the best services for you. We beleive a good blace to live can make your life better</span>
                    <div className="flexColStart contactModes">
                        <div className="flexStart row r1">
                            <div className="flexColCenter mode c1">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <MdCall size={25}/>
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Call</span>
                                        <span className='secondaryText'>021 123 145 14</span>
                                    </div>
                                </div>
                                <div className="flexCenter c-button">Call Now</div>
                            </div>
                            <div className="flexColCenter mode c1">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <BsFillChatDotsFill size={25}/>
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Chat</span>
                                        <span className='secondaryText'>021 123 145 14</span>
                                    </div>
                                </div>
                                <div className="flexCenter c-button">Chat Now</div>
                            </div>
                        </div>
                        <div className="flexStart row c1">
                            <div className="flexColCenter mode">
                                <div className="flexStart">
                                    <div className="flexCenter icon">
                                        <MdCall size={25}/>
                                    </div>
                                    <div className="flexColStart detail">
                                        <span className='primaryText'>Mail</span>
                                        <span className='secondaryText'>abc@gmail.com</span>
                                    </div>
                                </div>
                                <div className="flexCenter c-button">Email Now</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="c-right">
                    <div className="image-container">
                        <img src="./cc1.jpg" alt="contact" />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Contact