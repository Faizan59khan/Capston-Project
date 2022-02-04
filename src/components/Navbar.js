import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'



//styles
import './Navbar.scss'
import Search from './Search'


const Navbar = () => {


    const {user,cart}=useAuthContext();
    const {logout,error,isPending}=useLogout();
    const navigate=useNavigate();

   const logoutUser=()=>{
     logout();
     if(!isPending){
       navigate("/login");
     }
   }


    return (


        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><i class="fa-solid fa-burger"></i>Halal Foods</a>
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <Link  to="/" className="nav-link active" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link cart-link" >Cart</Link>
              </li>
              {!user &&<li className="nav-item">
                <Link to="/login" className="nav-link" >Login</Link>
              </li>}
              {!user &&<li className="nav-item">
                <Link to="/Signup" className="nav-link" >Signup</Link>
              </li>}
              <li className="nav-item">
                <Link to="/track" className="nav-link" >My Orders</Link>
              </li>
              {user && <li className="nav-item">
                  <a  onClick={logoutUser} className="nav-link">Log out</a>
              </li>
              }
            </ul>
            <Search />
          </div>
          
        </div>
      </nav>









       
    )
}

export default Navbar
