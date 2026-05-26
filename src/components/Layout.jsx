import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Preloader from './Preloader';
import MagicCursor from './MagicCursor';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const handleAnimations = () => {
      // 1. Re-initialize Elementor frontend if it exists
      if (window.elementorFrontend && typeof window.elementorFrontend.init === 'function') {
        try {
          window.elementorFrontend.init();
        } catch (e) {
          console.warn('elementorFrontend.init failed:', e);
        }
      }

      // 2. Safe custom observer to handle elementor-invisible elements (in case elementor frontend doesn't process them)
      const invisibles = document.querySelectorAll('.elementor-invisible');
      
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            obs.unobserve(el);

            // Extract animation settings
            let animName = 'fadeInUp'; // default premium animation
            let delay = 0;

            try {
              const settingsStr = el.getAttribute('data-settings');
              if (settingsStr) {
                const settings = JSON.parse(settingsStr);
                animName = settings._animation || settings.animation || animName;
                delay = settings._animation_delay || settings.animation_delay || delay;
              }
            } catch (err) {}

            setTimeout(() => {
              el.classList.remove('elementor-invisible');
              el.classList.add('animated', animName);
            }, delay);
          }
        });
      }, observerOptions);

      invisibles.forEach(el => {
        observer.observe(el);
      });

      // 3. Re-initialize GSAP text animations from function.js!
      if (window.gsap && window.SplitText) {
        const gsap = window.gsap;
        const SplitText = window.SplitText;
        const ScrollTrigger = window.ScrollTrigger;
        
        if (ScrollTrigger) {
          try {
            gsap.registerPlugin(ScrollTrigger);
            
            // Clear any active ScrollTriggers on re-mount to avoid duplicates
            ScrollTrigger.getAll().forEach(t => t.kill());
          } catch (e) {
            console.warn('ScrollTrigger plugin registration failed:', e);
          }
        }

        // Heading Style 1
        const elementsStyle1 = document.querySelectorAll('.at-animation-heading-style-1 .elementor-heading-title, .at-animation-heading-style-1 .ekit-heading--title');
        elementsStyle1.forEach(element => {
          try {
            const split = new SplitText(element, { type: "chars, words" });
            gsap.from(split.words, {
              duration: 1,
              delay: 0.5,
              x: 20,
              autoAlpha: 0,
              stagger: 0.05,
              scrollTrigger: { trigger: element, start: "top 85%" }
            });
          } catch (e) {}
        });

        // Heading Style 2
        const elementsStyle2 = document.querySelectorAll('.at-animation-heading-style-2 .elementor-heading-title, .at-animation-heading-style-2 .ekit-heading--title');
        elementsStyle2.forEach(element => {
          try {
            const split = new SplitText(element, { type: "chars, words" });
            gsap.from(split.chars, {
              duration: 1,
              delay: 0.5,
              x: 20,
              autoAlpha: 0,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 85%" }
            });
          } catch (e) {}
        });

        // Heading Style 3
        const elementsStyle3 = document.querySelectorAll('.at-animation-heading-style-3 .elementor-heading-title, .at-animation-heading-style-3 .ekit-heading--title');
        elementsStyle3.forEach(element => {
          try {
            // Reset if previously animated
            if (element.animation) {
              element.animation.progress(1).kill();
              element.split.revert();
            }

            element.split = new SplitText(element, {
              type: "lines,words,chars",
              linesClass: "split-line",
            });
            gsap.set(element, { perspective: 400 });

            gsap.set(element.split.chars, {
              opacity: 0,
              x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
              scrollTrigger: { trigger: element, start: "top 90%" },
              x: "0",
              y: "0",
              rotateX: "0",
              opacity: 1,
              duration: 1,
              ease: "back.out",
              stagger: 0.02,
            });
          } catch (e) {}
        });

        // 4. Image Reveal Animation Style 1
        const revealContainers = document.querySelectorAll(".at-animation-image-style-1");
        revealContainers.forEach(container => {
          try {
            const image = container.querySelector("img");
            if (image) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: container,
                  toggleActions: "play none none none"
                }
              });
              tl.set(container, { autoAlpha: 1 });
              tl.from(container, 1, {
                xPercent: -100,
                ease: "power2.out"
              });
              tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: "power2.out"
              });
            }
          } catch (e) {}
        });
      }
    };

    // Use a small delay to make sure React has rendered the DOM nodes
    const timer = setTimeout(handleAnimations, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

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
