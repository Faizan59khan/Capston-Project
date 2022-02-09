import React, { useEffect } from 'react';
import {useCollection} from '../../hooks/useCollection'
import './Products.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading';
import useWebAnimations, { bounce } from "@wellyshen/use-web-animations";

const Products = () => {

  const { keyframes, animationOptions, getAnimation } = bounce;
const { ref } = useWebAnimations({
  keyframes,
  animationOptions: {
    ...animationOptions,
    delay: 1000, // Delay 1s
    duration: animationOptions.duration * 0.75, // Speed up the animation
  },
});

  const { documents, error }= useCollection("products");
  const {search,filter}=useAuthContext();

 

  // useEffect(()=>{

  //  // console.log("s"+search);
 
  //   //console.log(cart)
  // },[search])

  return (
  <div className="products-container">
      <h1 ref={ref}>Most Popular Recipes</h1>
      <p id='products-para'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      <div className='popular-items'>
           {
             !documents && <Loading/>
           }
           {
             
             documents && documents.map((item,index)=>{
               if(filter===null || filter=== undefined || filter==="all" || item.price<=filter){
               if (search === undefined || search === null || search.includes("pizza") && item.name === "Pizza"
                 || search.includes("burger") && item.name === "Burger" || search.includes("pulao") && item.name === "Pulao"
                 || search.includes("biryani") && item.name === "Biryani" || filter==="all"
               ){
               return(
                <NavLink to={`/productDetails/${item.id}`} className="card" key={index}>
                <img className="card__image" src={item.imgUrl} alt="" />
                <div className="card__content">
                  <div className="card__header">
                    <h2 className="card__title">{item.name}</h2>
                    <span className="card__price">${item.price}</span>
                  </div>
                  <p className="card__text">{item.details}</p>
                </div>
              </NavLink>
               )
             }
            }
              
             })
           }
      </div>
      {error && <h1>{error}</h1>}
  </div>
  )
};

export default Products;
