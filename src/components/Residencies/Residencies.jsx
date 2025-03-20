import React, { useEffect, useState } from 'react'
import './Residencies.css'
import { sliderSettings } from '../../utils/common'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import "swiper/css"
import { useNavigate } from 'react-router-dom'

import data from '../../utils/slider.json'



const Residencies = () => {

    const navigate = useNavigate();
    // const [books, setBooks] = useState([]);
    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
    //             const response = await axios.get(
    //                 "http://localhost:8080/api/books",
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );
    //             console.log(response.data.content);
    //             setBooks(response.data.content);
    //         } catch (error) {
    //             console.error("Error fetching books:", error);
    //         }
    //     };
    //     fetchBooks();


    // }, []);

    function handleClick() {
        navigate('/books');
    }

    return (
        <section className="r-wrapper">
            <div className="innerWidth paddings r-container">
                <div className="flexColStart r-head">
                    <span className='orangeText'>Best Choices</span>
                    <span className='primaryText'>Popular Recommendations</span>
                </div>

                <Swiper {...sliderSettings}>
                    <SliderButtons />
                    {
                        data.map((card, i) => (
                            <SwiperSlide key={i}>
                                <div className='flexColStart r-card' onClick={() => handleClick()}>
                                    <img src={card.image}></img>

                                    <span className="secondaryText r-price">
                                        <span style={{ color: 'orange' }}>₹</span>
                                        <span style={{ fontWeight: 'bold' }}>{card.price}</span>
                                    </span>

                                    <span className='primaryText'>{card.name}</span>
                                    <span className='secondaryText' style={{ width: '15rem' }}>{card.detail}</span>

                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>



            </div>
        </section>
    )
}
export default Residencies;

const SliderButtons = () => {
    const swiper = useSwiper();

    return (
        <div className="flexCenter r-button">
            <button onClick={() => swiper.slidePrev()}>&lt;</button>
            <button onClick={() => swiper.slideNext()}>&gt;</button>
        </div>
    )
}