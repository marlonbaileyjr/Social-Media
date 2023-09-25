import React from 'react';
import '../css/footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
        <div className="social-links">
          <a href="#"><i className="social-icon">FB</i></a> 
          <a href="#"><i className="social-icon">TW</i></a> 
          <a href="#"><i className="social-icon">IG</i></a> 
          {/* ... more icons ... */}
        </div>
        <div className="footer-info">
          <p>&copy; 2023 MyWebsite. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
