import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const socialLinks = [
    { name: 'Linkedin-in', iconClass: 'fab fa-linkedin-in', href: '#' },
    { name: 'Icon-youtube-v', iconClass: 'icon icon-youtube-v', href: '#' },
    { name: 'X-twitter', iconClass: 'fab fa-x-twitter', href: '#' },
    { name: 'Instagram', iconClass: 'fab fa-instagram', href: '#' },
    { name: 'Facebook-f', iconClass: 'fab fa-facebook-f', href: '#' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Doctors', path: '/about-us#doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact-us' }
  ];

  const contactDetails = [
    { iconClass: 'fas fa-map-marker-alt', text: 'Visakhapatnam, Andhra Pradesh, India' },
    { iconClass: 'fas fa-envelope-open-text', text: 'applescans@gmail.com' },
    { iconClass: 'fas fa-phone-alt', text: '0891-2577110 / +91 88868 60530' },
    { iconClass: 'fas fa-clock', text: '8 AM - 5 PM , Monday - Saturday' }
  ];

  return (
    <div className="ekit-template-content-markup ekit-template-content-footer ekit-template-content-theme-support">
      <div data-elementor-type="wp-post" data-elementor-id="3789" className="elementor elementor-3789">
        <div className="elementor-element elementor-element-991ff1a e-flex e-con-boxed e-con e-parent" data-id="991ff1a" data-element_type="container" data-e-type="container">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-3fc3866 e-flex e-con-boxed e-con e-child" data-id="3fc3866" data-element_type="container" data-e-type="container">
              <div className="e-con-inner">
                
                {/* Brand & Description & Socials */}
                <div className="elementor-element elementor-element-9baf448 e-con-full e-flex e-con e-child" data-id="9baf448" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-d52ca1d at-image-animation at-animation-image-none elementor-widget elementor-widget-image" data-id="d52ca1d" data-element_type="widget" data-e-type="widget">
                       <Link to="/" style={{ display: 'inline-block', height: '60px', overflow: 'hidden', borderRadius: '8px', background: '#ffffff', padding: '4px' }}>
                        <img className="ata-site-logo-img" src="/clinic-logo.png" alt="Apple Scans and Diagnostics Logo" style={{ height: '110px', width: '110px', objectFit: 'contain', margin: '-25px 0' }} />
                      </Link>
                  </div>
                  <div className="elementor-element elementor-element-b539dfe elementor-widget elementor-widget-text-editor" data-id="b539dfe" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <p>Our family-centered approach to healthcare ensures that each member of your family receives personalized attention.</p>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-9474e9e e-grid-align-left elementor-shape-rounded elementor-grid-0 elementor-widget elementor-widget-social-icons" data-id="9474e9e" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <div className="elementor-social-icons-wrapper elementor-grid" role="list">
                        {socialLinks.map(social => (
                          <span key={social.name} className="elementor-grid-item" role="listitem">
                            <a className={`elementor-icon elementor-social-icon elementor-social-icon-${social.name.toLowerCase()}`} href={social.href} target="_blank" rel="noreferrer">
                              <span className="elementor-screen-only">{social.name}</span>
                              <i aria-hidden="true" className={social.iconClass}></i>
                            </a>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="elementor-element elementor-element-b1a6d09 e-con-full e-flex e-con e-child" data-id="b1a6d09" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-249dbfc at-heading-animation at-animation-heading-none elementor-widget elementor-widget-heading" data-id="249dbfc" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <h3 className="elementor-heading-title elementor-size-default">Quick Links</h3>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-a57be49 elementor-widget elementor-widget-ekit-vertical-menu" data-id="a57be49" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <div className="ekit-wid-con">
                        <div className="ekit-vertical-main-menu-wraper badge-position-left">
                          <div className="ekit-vertical-menu-container">
                            <ul id="menu-footer-menu" className="ekit-vertical-navbar-nav submenu-click-on-icon">
                              {quickLinks.map(link => (
                                <li key={link.name} className="menu-item nav-item elementskit-mobile-builder-content">
                                  <Link to={link.path} className="ekit-menu-nav-link">
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="elementor-element elementor-element-fbfe656 e-con-full e-flex e-con e-child" data-id="fbfe656" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-beed0e8 at-heading-animation at-animation-heading-none elementor-widget elementor-widget-heading" data-id="beed0e8" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <h3 className="elementor-heading-title elementor-size-default">Contact Details</h3>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-297b1a3 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="297b1a3" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <div className="elementor-icon-list-items">
                        {contactDetails.map((detail, index) => (
                          <li key={index} className="elementor-icon-list-item">
                            <span className="elementor-icon-list-icon">
                              <i aria-hidden="true" className={detail.iconClass}></i>
                            </span>
                            <span className="elementor-icon-list-text">{detail.text}</span>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Newsletter Form */}
                <div className="elementor-element elementor-element-8dfe20e e-con-full e-flex e-con e-child" data-id="8dfe20e" data-element_type="container" data-e-type="container">
                  <div className="elementor-element elementor-element-1601901 at-heading-animation at-animation-heading-none elementor-widget elementor-widget-heading" data-id="1601901" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <h3 className="elementor-heading-title elementor-size-default">Newsletter</h3>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-3758c24 elementor-widget elementor-widget-image-box" data-id="3758c24" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <div className="elementor-image-box-wrapper">
                        <div className="elementor-image-box-content">
                          <h3 className="elementor-image-box-title">Subscribe To Our Newsletter</h3>
                          <p className="elementor-image-box-description">Stay informed and never miss out on the latest news, health tips.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-52eb752 footer-newsletter-form elementor-widget elementor-widget-elementskit-contact-form7" data-id="52eb752" data-element_type="widget" data-e-type="widget">
                    <div className="elementor-widget-container">
                      <div className="ekit-wid-con">
                        <div className="ekit-form">
                          <div className="wpcf7 no-js">
                            {isSubscribed ? (
                              <div className="wpcf7-response-output text-center p-3 alert alert-success" style={{ background: '#1F3F37', color: '#fff', borderRadius: '5px' }}>
                                Thank you for subscribing!
                              </div>
                            ) : (
                              <form onSubmit={handleSubscribe} className="wpcf7-form init">
                                <div className="footer-form">
                                  <div className="row">
                                    <div className="form-group col-md-8 col-8">
                                      <p>
                                        <span className="wpcf7-form-control-wrap">
                                          <input 
                                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email form-control" 
                                            placeholder="Enter Your Email" 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                          />
                                        </span>
                                      </p>
                                    </div>
                                    <div className="form-group col-md-4 col-4">
                                      <p>
                                        <input className="wpcf7-form-control wpcf7-submit has-spinner btn-default" type="submit" value="Send" />
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Copyright Statement */}
            <div className="elementor-element elementor-element-edcbd33 e-flex e-con-boxed e-con e-child" data-id="edcbd33" data-element_type="container" data-e-type="container">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-f128ba3 footer-copyright-text elementor-widget elementor-widget-text-editor" data-id="f128ba3" data-element_type="widget" data-e-type="widget">
                  <div className="elementor-widget-container">
                    <p>Copyright 2026 ©<strong> Apple Scans & Diagnostics </strong>All Right Reserved.</p>
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
