import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' or 'pages'
  const location = useLocation();

  const currentPath = location.pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (menuName, e) => {
    e.preventDefault();
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' }
  ];

  const serviceSubLinks = [
    { name: 'Cardiology Clinic', path: '/services/cardiology-clinic' },
    { name: 'Pathology Clinic', path: '/services/pathology-clinic' },
    { name: 'Laboratory Analysis', path: '/services/laboratory-analysis' },
    { name: 'Pediatric Clinic', path: '/services/pediatric-clinic' },
    { name: 'Cardiac Clinic', path: '/services/cardiac-clinic' },
    { name: 'Neurology Clinic', path: '/services/neurology-clinic' }
  ];

  const pageSubLinks = [
    { name: 'Blog', path: 'https://demo.awaikenthemes.com/theme-medipro/blog/' },
    { name: 'Our Team', path: 'https://demo.awaikenthemes.com/theme-medipro/our-team/' },
    { name: "FAQ's", path: 'https://demo.awaikenthemes.com/theme-medipro/faqs/' }
  ];

  return (
    <div className="ekit-template-content-markup ekit-template-content-header ekit-template-content-theme-support">
      <div data-elementor-type="wp-post" data-elementor-id="3430" className="elementor elementor-3430">
        <div className="elementor-element elementor-element-a11f42c e-flex e-con-boxed e-con e-parent" data-id="a11f42c" data-element_type="container" data-e-type="container">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-dcd0ed7 e-flex e-con-boxed e-con e-child" data-id="dcd0ed7" data-element_type="container" data-e-type="container">
              <div className="e-con-inner">
                {/* Site Logo */}
                <div className="elementor-element elementor-element-260fbb8 e-con-full e-flex e-con e-child" data-id="260fbb8" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-2e06a50 elementor-widget elementor-widget-ata-site-logo" data-id="2e06a50" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <div className="ata-site-logo">
                        <Link className="elementor-clickable" to="/" onClick={closeMobileMenu}>
                          <div className="ata-site-logo-set">
                            <div className="ata-site-logo-container">
                              <img className="ata-site-logo-img" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 48'><circle cx='24' cy='24' r='20' fill='%231F3F37' /><text x='24' y='31' font-family='Figtree, sans-serif' font-weight='900' font-size='20' fill='%23ffffff' text-anchor='middle'>R</text><text x='56' y='31' font-family='Figtree, sans-serif' font-weight='800' font-size='19' fill='%231F3F37'>Rapha</text><text x='118' y='31' font-family='Figtree, sans-serif' font-weight='800' font-size='19' fill='%23F7A582'>Hospital</text></svg>" alt="Rapha Hospital Logo" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className="elementor-element elementor-element-6eb95c1 e-con-full e-flex e-con e-child" data-id="6eb95c1" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-23de54a elementor-widget elementor-widget-ekit-nav-menu" data-id="23de54a" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <nav className="ekit-wid-con ekit_menu_responsive_tablet" data-hamburger-icon="icon icon-menu-11" data-hamburger-icon-type="icon" data-responsive-breakpoint="1024">
                        
                        {/* Hamburger Button */}
                        <button className="elementskit-menu-hamburger elementskit-menu-toggler" type="button" aria-label="hamburger-icon" onClick={toggleMobileMenu}>
                          <i aria-hidden="true" className="ekit-menu-icon icon icon-menu-11"></i>
                        </button>

                        {/* Menu Panel */}
                        <div id="ekit-megamenu-header-menu" className={`elementskit-menu-container elementskit-menu-offcanvas-elements elementskit-navbar-nav-default ekit-nav-menu-one-page-no ekit-nav-dropdown-hover ${isMobileMenuOpen ? 'active elementskit-menu-show' : ''}`}>
                          <ul id="menu-header-menu" className="elementskit-navbar-nav elementskit-menu-po-right submenu-click-on-">
                            
                            {/* Home & About Us */}
                            {navLinks.map(link => (
                              <li key={link.path} className={`menu-item nav-item elementskit-mobile-builder-content ${currentPath === link.path ? 'active current-menu-item' : ''}`}>
                                <Link to={link.path} className={`ekit-menu-nav-link ${currentPath === link.path ? 'active' : ''}`} onClick={closeMobileMenu}>
                                  {link.name}
                                </Link>
                              </li>
                            ))}

                            {/* Services Dropdown */}
                            <li className={`menu-item menu-item-has-children nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-default_width elementskit-mobile-builder-content ${currentPath.startsWith('/services') ? 'active' : ''} ${activeDropdown === 'services' ? 'elementskit-show-panel' : ''}`}>
                              <a href="/services" className="ekit-menu-nav-link ekit-menu-dropdown-toggle" onClick={(e) => handleDropdownToggle('services', e)}>
                                Services
                                <i className="icon icon-down-arrow1 elementskit-submenu-indicator"></i>
                              </a>
                              <ul className={`elementskit-dropdown elementskit-submenu-panel ${activeDropdown === 'services' ? 'elementskit-dropdown-open' : ''}`} style={activeDropdown === 'services' ? { display: 'block' } : {}}>
                                <li className={`menu-item nav-item elementskit-mobile-builder-content ${currentPath === '/services' ? 'active' : ''}`}>
                                  <Link to="/services" className="dropdown-item" onClick={closeMobileMenu}>All Services</Link>
                                </li>
                                {serviceSubLinks.map(subLink => (
                                  <li key={subLink.path} className={`menu-item nav-item elementskit-mobile-builder-content ${currentPath === subLink.path ? 'active' : ''}`}>
                                    <Link to={subLink.path} className="dropdown-item" onClick={closeMobileMenu}>
                                      {subLink.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>

                            {/* Pages Dropdown */}
                            <li className={`menu-item menu-item-has-children nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-default_width elementskit-mobile-builder-content ${activeDropdown === 'pages' ? 'elementskit-show-panel' : ''}`}>
                              <a href="#" className="ekit-menu-nav-link ekit-menu-dropdown-toggle" onClick={(e) => handleDropdownToggle('pages', e)}>
                                Pages
                                <i className="icon icon-down-arrow1 elementskit-submenu-indicator"></i>
                              </a>
                              <ul className={`elementskit-dropdown elementskit-submenu-panel ${activeDropdown === 'pages' ? 'elementskit-dropdown-open' : ''}`} style={activeDropdown === 'pages' ? { display: 'block' } : {}}>
                                {pageSubLinks.map(subLink => (
                                  <li key={subLink.name} className="menu-item nav-item elementskit-mobile-builder-content">
                                    <a href={subLink.path} className="dropdown-item" onClick={closeMobileMenu}>
                                      {subLink.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>

                            {/* Contact Us */}
                            <li className={`menu-item nav-item elementskit-mobile-builder-content ${currentPath === '/contact-us' ? 'active current-menu-item' : ''}`}>
                              <Link to="/contact-us" className={`ekit-menu-nav-link ${currentPath === '/contact-us' ? 'active' : ''}`} onClick={closeMobileMenu}>
                                Contact Us
                              </Link>
                            </li>

                            {/* Mobile-only Book Appointment */}
                            <li className={`mobile-menu menu-item nav-item elementskit-mobile-builder-content ${currentPath === '/book-appointment' ? 'active current-menu-item' : ''}`}>
                              <Link to="/book-appointment" className="ekit-menu-nav-link" onClick={closeMobileMenu}>
                                Book Appointment
                              </Link>
                            </li>
                          </ul>

                          {/* Close Mobile Menu Panel */}
                          <div className="elementskit-nav-identity-panel">
                            <button className="elementskit-menu-close elementskit-menu-toggler" type="button" onClick={closeMobileMenu}>X</button>
                          </div>
                        </div>

                        {/* Mobile Overlay */}
                        <div className={`elementskit-menu-overlay elementskit-menu-offcanvas-elements elementskit-menu-toggler ekit-nav-menu--overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Right Book Appointment Button */}
                <div className="elementor-element elementor-element-652c6f9 e-con-full elementor-hidden-tablet elementor-hidden-mobile e-flex e-con e-child" data-id="652c6f9" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-ed5b088 white-bg elementor-widget__width-auto elementor-widget elementor-widget-button" data-id="ed5b088" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <div className="elementor-button-wrapper">
                        <Link className="elementor-button elementor-button-link elementor-size-sm" to="/book-appointment" onClick={closeMobileMenu}>
                          <span className="elementor-button-content-wrapper">
                            <span className="elementor-button-icon">
                              <i aria-hidden="true" className="fas fa-calendar-alt"></i>
                            </span>
                            <span className="elementor-button-text">Book Appointment </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
