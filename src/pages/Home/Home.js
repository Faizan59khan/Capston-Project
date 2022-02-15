import React, { useEffect } from 'react';
import './Home.scss'
import Products from '../Products/Products';
import Cover from '../../components/Cover';
import Filter from '../../components/Filter';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Contact from '../Contact/Contact'
import Footer from '../../components/Footer'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext();


  useEffect(()=>{
    if (user) {
      if (user.email === "sudofyproject@gmail.com") {
        navigate('/dashboard')
      }
    }
  },[])




  return (
    <div className='Home'>

      <Cover />
      <Filter />
      <Products />
      <Contact />
      <Footer />
    </div>
  )
};

export default Home;
