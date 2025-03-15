import React from 'react'
import './Hero.css'
import { FiSearch } from "react-icons/fi";
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
const Hero = () => {
    return (
        <section className="hero-wrapper">
            <div className='paddings innerWidth flexCenter hero-container'>
                <div className="flexColStart hero-left">
                    <div className="hero-title">
                        <div className="orange-circle"></div>
                        <motion.h1
                            initial={{ y: "2rem", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 2,
                                type: "spring"
                            }}
                        >Discover <br />
                            Your Next <br />
                            Favorite Book
                        </motion.h1>
                    </div>

                    <div className="flexColStart hero-desc">
                        <span className='secondaryText'>Find a variety of books that suit your taste with ease...</span>
                        <span className='secondaryText'>Forget all difficulties in discovering your next great read..!</span>
                    </div>

                    <div className="search-bar">
                        <div className="search-bar-search">
                            <FiSearch color="var(--blue)" size={25} className="search-icon" />
                            <input type="text" placeholder="Enter" className="search-input" />
                        </div>
                        <button className="button">Search</button>
                    </div>


                    <div className="flexCenter stats">
                        <div className="flexColCenter stat">
                            <span><CountUp start={800} end={900} duration={3.5} /><span className='plus'>+</span></span>
                            <span className='secondaryText'>Wide Variety</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span><CountUp start={1950} end={2000} duration={3.5} /><span className='plus'>+</span></span>
                            <span className='secondaryText'>Happy Customers</span>
                        </div>
                        <div className="flexColCenter stat">
                            <span><CountUp start={0} end={28} duration={3.5} /><span className='plus'>+</span></span>
                            <span className='secondaryText'>Awards winnings</span>
                        </div>
                    </div>

                </div>
                <div className="right-hero">
                    <motion.div
                        initial={{ x: "7rem", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 3,
                            type: "spring"
                        }}
                        className="image-container1">
                        <img src='public\two-people-reading-books-are-reading-books-concept-flat-illustration-vector.jpg' alt='hero-img'></img>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
export default Hero;