import React, { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.querySelector('.preloader');
      if (loader) {
        loader.style.transition = 'opacity 0.5s ease-out';
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preloader">
      <div className="loading-container">
        <div className="loading"></div>
        <div id="loading-icon">
          <img 
            src="https://demo.awaikenthemes.com/theme-medipro/wp-content/themes/medipro/assets/images/loader.svg" 
            alt="Preloader" 
          />
        </div>
      </div>
    </div>
  );
}
