import React from 'react'
import './About.scss';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const About = () => {
    return (
        <div>
            <Navbar/>
        <div className='about-container'>

            <div className='about-head'>
                <h1>ABOUT</h1>
            </div>

            <div className='about-text'>
                <h1>How this file can be used</h1>
                <div>
                    <span></span> 
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <h1>A note about typefaces</h1>
                <div>
                    <span></span> 
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>

            
            
        </div>
        <Footer/>
        </div>
    )
}

export default About
