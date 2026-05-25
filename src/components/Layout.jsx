import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Preloader from './Preloader';
import MagicCursor from './MagicCursor';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Intercept clicks on anchor elements globally to prevent full page reloads and route internally
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href) {
          // Ignore external paths, dummy links, or JavaScript triggers
          if (href.startsWith('http') && !href.includes('demo.awaikenthemes.com/theme-medipro/')) {
            return; 
          }
          if (href === '#' || href.startsWith('javascript:')) {
            return;
          }

          let targetPath = null;

          // Normalize routes
          if (href === 'home.html' || href === '/' || href === '/home.html') {
            targetPath = '/';
          } else if (href === 'about.html' || href === '/about-us' || href === '/about.html') {
            targetPath = '/about-us';
          } else if (href === 'services.html' || href === '/services.html' || href === 'services') {
            targetPath = '/services';
          } else if (href === 'cardiology-clinic.html' || href === '/cardiology-clinic.html') {
            targetPath = '/services/cardiology-clinic';
          } else if (href === 'pathology-clinic.html' || href === '/pathology-clinic.html') {
            targetPath = '/services/pathology-clinic';
          } else if (href === 'laboratory-analysis.html' || href === '/laboratory-analysis.html') {
            targetPath = '/services/laboratory-analysis';
          } else if (href === 'pediatric-clinic.html' || href === '/pediatric-clinic.html') {
            targetPath = '/services/pediatric-clinic';
          } else if (href === 'cardiac-clinic.html' || href === '/cardiac-clinic.html') {
            targetPath = '/services/cardiac-clinic';
          } else if (href === 'neurology-clinic.html' || href === '/neurology-clinic.html') {
            targetPath = '/services/neurology-clinic';
          } else if (href === 'contactus.html' || href === '/contactus.html' || href === 'contact-us') {
            targetPath = '/contact-us';
          } else if (href === 'book-appointement.html' || href === '/book-appointement.html' || href === 'appointment') {
            targetPath = '/book-appointment';
          } else if (href.includes('demo.awaikenthemes.com/theme-medipro/')) {
            // Intercept theme reference links that point to the external wordpress demo domain
            const path = href.replace('https://demo.awaikenthemes.com/theme-medipro/', '');
            const cleanedPath = path.endsWith('/') ? path.slice(0, -1) : path;
            
            if (cleanedPath === '' || cleanedPath === '/') {
              targetPath = '/';
            } else if (cleanedPath.includes('about-us') || cleanedPath.includes('about')) {
              targetPath = '/about-us';
            } else if (cleanedPath.includes('services/cardiology-clinic') || cleanedPath.includes('cardiology-clinic')) {
              targetPath = '/services/cardiology-clinic';
            } else if (cleanedPath.includes('services/pathology-clinic') || cleanedPath.includes('pathology-clinic')) {
              targetPath = '/services/pathology-clinic';
            } else if (cleanedPath.includes('services/laboratory-analysis') || cleanedPath.includes('laboratory-analysis')) {
              targetPath = '/services/laboratory-analysis';
            } else if (cleanedPath.includes('services/pediatric-clinic') || cleanedPath.includes('pediatric-clinic')) {
              targetPath = '/services/pediatric-clinic';
            } else if (cleanedPath.includes('services/cardiac-clinic') || cleanedPath.includes('cardiac-clinic')) {
              targetPath = '/services/cardiac-clinic';
            } else if (cleanedPath.includes('services/neurology-clinic') || cleanedPath.includes('neurology-clinic')) {
              targetPath = '/services/neurology-clinic';
            } else if (cleanedPath.includes('services')) {
              targetPath = '/services';
            } else if (cleanedPath.includes('contact-us') || cleanedPath.includes('contactus')) {
              targetPath = '/contact-us';
            } else if (cleanedPath.includes('appointment')) {
              targetPath = '/book-appointment';
            }
          }

          if (targetPath) {
            e.preventDefault();
            // Scroll smoothly to top
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // Re-trigger preloader fade-in-out on client route change for standard premium animations!
            const loader = document.querySelector('.preloader');
            if (loader) {
              loader.style.display = 'block';
              loader.style.opacity = '1';
              setTimeout(() => {
                loader.style.transition = 'opacity 0.4s ease-out';
                loader.style.opacity = '0';
                setTimeout(() => {
                  loader.style.display = 'none';
                }, 400);
              }, 400);
            }
            
            navigate(targetPath);
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [navigate]);

  return (
    <>
      <Preloader />
      <MagicCursor />
      <Header />
      <main id="content" className="site-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
