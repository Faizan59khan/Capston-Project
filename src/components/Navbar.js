import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'



//styles
import './Navbar.scss'
import Search from './Search'


const Navbar = () => {

  const [active, setActive] = useState(true);
  const { user, cart } = useAuthContext();
  const { logout, error, isPending } = useLogout();
  const navigate = useNavigate();


  // useEffect(()=>{
  //    if(!user){
  //      navigate("/login")
  //    }
  // },[user,navigate])

  // const logoutUser = () => {
  //   logout();
  //   if (!isPending) {
  //     navigate("/login");
  //   }
  // }


  return (


    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><i className="fa-solid fa-burger"></i>Halal Foods</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id='nav'>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" activeClassName="active">Cart</NavLink>
            </li>
            {!user && <li className="nav-item">
              <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
            </li>}
            {!user && <li className="nav-item">
              <NavLink to="/Signup" className="nav-link" activeClassName="active">Signup</NavLink>
            </li>}
            <li className="nav-item">
              <NavLink to="/track" className="nav-link" activeClassName="active">My Orders</NavLink>
            </li>
            {user && <li className="nav-item">
              <a onClick={logout} className="nav-link">Log out</a>
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
