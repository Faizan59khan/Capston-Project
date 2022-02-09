import React from 'react';
import './Contact.scss'
const Contact = () => {

    return <div>
        <div className='Contact'>
            <h1 className='contact-us'>Contact Us</h1>
            <div className='Icons'>
                
                    <div className='icon'>
                <span className="fa fa-lg fa-map-marker"></span>
                <p><b>Address:</b><br/>Sudofy, Karachi, Sindh, Pakistan</p>
                </div>

                
                
                
                <div className='icon'>
                    <span className="fa fa-lg fa-phone"></span>
                    <p><b>Phone:</b><br/>+923008090100</p>
                    </div>

                
                
                
                <div className='icon'>
                    <span className="fa fa-lg fa-paper-plane"></span>
                    <p><b>Email:</b><br/> sudofyproject@gmail.com</p>
                    </div>
                    

               
                
                
                <div className='icon'>
                    <span className="fa fa-lg fa-globe contact-icon"></span>
                    <p><b>Website:</b><br/> www.sample.com</p>       
                    </div>
                
                
                
               
            </div>
            <div className='from-map'>
            <form className='Contact-from' onSubmit={(e)=>{e.preventDefault()}}>
                <input type="text" placeholder='Full Name' required></input>
                <input type="email" placeholder='Email' required></input>
                <input type="text" placeholder='Subject' required></input>
                <textarea placeholder='Message' required></textarea>
                <button>Send Message</button>
            </form>
            <div className='Contact-map'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14470.423087003439!2d67.115382!3d24.9454965!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x396c11bf227c8d35!2sUBIT%20-%20Umaer%20Basha%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2s!4v1643874812582!5m2!1sen!2s"  ></iframe>
            </div>
            </div>
        </div>









        </div>;
};

export default Contact;
