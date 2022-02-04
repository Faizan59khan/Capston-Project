import React, { useState, useEffect } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import cover from './images/1.png'
import Footer from '../../components/Footer'

import './css/style.css'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const { signup, error, isPending } = useSignup();


    const { user,dispatch } = useAuthContext();
    const Navigate = useNavigate();


    useEffect(() => {
      if(user){
        if(user.email==="sudofyproject@gmail.com"){
          Navigate('/dashboard')
        }
        else if(user.email!=="sudofyproject@gmail.com"){
          Navigate('/')
        }
      }
     
   }, [user,Navigate])


    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName,thumbnail)
        dispatch({type: 'ADD_TO_CART', payload: null})
        console.log(email, password, displayName, thumbnail)
        if (!error) {
            setEmail('')
            setPassword('')
            setDisplayName('')
        }

    }


    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
        //selected obj contain all these type,size ....
        if (!selected) {
            setThumbnailError("Please select a File")
            return
        }
        if (!selected.type.includes("image")) {
            setThumbnailError("Selected file must be an image");
            return
        }
        if (selected > 100000) {
            setThumbnailError("File size must be less than 100kb");
            return
        }

        setThumbnailError(null);
        setThumbnail(selected);
        console.log("Thumbnail Updated")
    }

    return (
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form onSubmit={handleSubmit} className="register-form" id="register-form">
                            <div className="form-group">
                                <label for="name"><i className="zmdi zmdi-account material-icons-name fas fa-user"></i></label>
                                <input type="text" name="name" id="name" required onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter Username" />
                            </div>
                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email fas fa-envelope"></i></label>
                                <input type="email" name="email" id="email" required onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label for="pass"><i className="zmdi zmdi-lock fas fa-key"></i></label>
                                <input type="password" name="pass" id="pass" required onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="Enter Password" />
                            </div>
                            <div className="form-group">
                                <label for="name"><i className="zmdi zmdi-account material-icons-name fas fa-image"></i></label>
                                <input type="file" name="img" id="img" required onChange={handleFileChange}/>
                                {thumbnailError && <div classNameName="error">{thumbnailError}</div>} 
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                            </div>

                            <div className="form-group form-button">
                                {isPending && <input type="submit" name="signup" id="signup" className="form-submit" value="Loading..." />}
                                {!isPending && <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />}
                                {error && <p>{error}</p>}

                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={cover} alt="sing up image" /></figure>
                        <Link className="signup-image-link" to='/Login'>I am already member</Link>

                    </div>
                </div>
            </div>
            <Footer/>
        </section>
       
    )
}

export default Signup
