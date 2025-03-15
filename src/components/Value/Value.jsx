import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import data from '../../utils/accordion'
import './Value.css'

const Value = () => {
    return (
        <div>
            <section className="v-wrapper">
                <div className="paddings innerWidth flexCenter v-container">
                    <div className="v-left">
                        <div className="image-container">
                            <img src="dist\books2.jpg" alt="value-img" />
                        </div>
                    </div>

                    <div className="flexColStart v-right">
                        <span className='orangeText'>Our Values</span>
                        <span className='primaryText'>Value We Give to You</span>
                        <span className="secondaryText">We are always here to help you find the perfect book for your journey.<br />We believe that a great story can inspire, educate, and change lives.</span>

                        <Accordion
                            className='accordian'
                            allowMultipleExpanded={false}
                            preExpanded={[0]}
                        >
                            {
                                data.map((item, i) => {

                                    const [className,setClassName] = useState(null);

                                    return (
                                        <AccordionItem className={`accordionItem ${className}`} key={i} uuid={i}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton className='flexStart accordion-btn' >

                                                    <AccordionItemState>
                                                        {({ expanded }) => expanded ? setClassName("expanded") : setClassName("collapsed")}
                                                    </AccordionItemState>

                                                    <div className="flexCenter icon">{item.icon}</div>
                                                    <span className='accordion-heading'>{item.heading}</span>
                                                    <div className="flexCenter icon">
                                                        <MdOutlineArrowDropDown size={20}></MdOutlineArrowDropDown>
                                                    </div>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>

                                            <AccordionItemPanel>
                                                <p className="secondaryText">{item.detail}</p>
                                            </AccordionItemPanel>

                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Value;