import React from 'react';
import cover from '../images/cover2.jpg'
import biryani from '../images/br1.png'
import burger from '../images/b2.png'
import pizza from '../images/p1.png'
import './Cover.scss'
import { useEffect, useState } from 'react/cjs/react.development';

const Cover = () => {

  const [isCancelled, setIsCancelled] = useState(false)

  useEffect(()=>{

   var myIndex = 0;
   if(!isCancelled){
    carousel();
    
    function carousel() {
      var i;
      var x = document.getElementsByClassName("biryani-img");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}    
      x[myIndex-1].style.display = "block";  
      setTimeout(carousel, 3000); // Change image every 2 seconds
    }
  }
   
   return () => setIsCancelled(true)
    
  },[])


  return (
  <div className='cover'>
      <div>
        <img src={biryani} id='biryani' className='biryani-img'  />
        <img src={burger} className='biryani-img'  />
        <img src={pizza} className='biryani-img'  />
     
      </div>
      <img src={cover} id='cover-img' alt='cover-img'/>
  </div>
  )
};

export default Cover;
