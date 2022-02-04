import React from 'react';
import './Footer.scss'
const Footer = () => {
  return <div>
      
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h4>About</h4>
    
            <p className="text-justify">HALAL FOODS Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem cupiditate commodi illum, aspernatur repudiandae quo vero doloribus rerum enim totam nostrum ut fuga animi maiores laborum a facere, fugit mollitia! </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><a >Desi</a></li>
              <li><a >Fast Food</a></li>
             
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a >About Us</a></li>
              <li><a >Contact Us</a></li>
              <li><a >Privacy Policy</a></li>
              <li><a >Services</a></li>
            </ul>
          </div>
        </div>
        
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
         <a href="#"> HALAL FOODS</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" ><i className="fab fa-facebook-f"></i></a></li>
              <li><a className="twitter" ><i className="fab fa-twitter"></i></a></li>
              <li><a className="dribbble" ><i className="fab fa-dribbble"></i></a></li>
              <li><a className="linkedin" ><i className="fab fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
  </div>;
};

export default Footer;
