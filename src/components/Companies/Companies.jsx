import React from 'react'
import './Companies.css'

const Companies = ()=>{
    return(
        <section className="c-wrapper">
            <div className='innerWidth flexCenter c-container'>
                <img src='./prologis.png' alt='c1'/>
                <img src='./tower.png' alt='c2' />
                <img src='./equinix.png' alt='c3' />
                <img src='./realty.png' alt='c4' />
            </div>
        </section>
    )
}
export default Companies