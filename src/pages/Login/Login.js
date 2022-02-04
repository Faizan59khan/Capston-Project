import React, { useState, useEffect } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Footer from '../../components/Footer'
import image from './images/1.png'
//styles
import './css/style.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




    const { login, error, isPending } = useLogin();


    const { user,dispatch,cart } = useAuthContext();
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
        login(email, password);
        dispatch({type: 'ADD_TO_CART', payload: null})        //mark
        console.log(email, password)

    }




    return (
        <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={image} alt="sing up image" /></figure>
                        <Link to='/Signup' className="signup-image-link">Create an account</Link>

                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <form onSubmit={handleSubmit} className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name"><i className="zmdi zmdi-account material-icons-name fas fa-envelope"></i></label>
                                <input type="email" name="your_name" id="your_name" required onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label for="your_pass"><i className="zmdi zmdi-lock fas fa-key"></i></label>
                                <input type="password" name="your_pass" id="your_pass" required onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div className="form-group form-button">
                                {isPending && <input type="submit" name="signin" id="signin" className="form-submit" value="Loading..." />}
                                {!isPending && <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />}
                                {error && <p>{error}</p>}
                            </div>



                        </form>
                        <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google fab fa-google-plus-g"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>

    )
}

export default Login