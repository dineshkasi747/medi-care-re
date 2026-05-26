import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    // Simulate sending message with a premium feel
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <>
      <div data-elementor-type="wp-page" data-elementor-id="1997" className="elementor elementor-1997">
        <div className="elementor-element elementor-element-53644c8 e-flex e-con-boxed e-con e-parent" data-id="53644c8" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-282b1b0 e-flex e-con-boxed e-con e-child" data-id="282b1b0" data-element_type="container" data-e-type="container">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-b566959 at-heading-animation at-animation-heading-style-3 elementor-widget elementor-widget-heading" data-id="b566959" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="heading.default">
                  <div className="elementor-widget-container">
                    <h1 className="elementor-heading-title elementor-size-default">Contact Us</h1>
                  </div>
                </div>
                <div className="elementor-element elementor-element-7e636bc elementor-invisible elementor-widget elementor-widget-elementskit-breadcrumb" data-id="7e636bc" data-element_type="widget" data-e-type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;_animation_delay&quot;:100,&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="elementskit-breadcrumb.default">
                  <div className="elementor-widget-container">
                    <div className="ekit-wid-con">
                      <ol className="ekit-breadcrumb">
                        <li className="ekit_breadcrumbs_start">
                          <a href="home.html">Home</a>
                        </li>
                        <li className="brd_sep"> » </li>
                        <li>Contact Us</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="elementor-element elementor-element-9f3cd3d e-con-full e-flex e-con e-parent" data-id="9f3cd3d" data-element_type="container" data-e-type="container">
          <div className="elementor-element elementor-element-11a143a e-con-full e-flex e-con e-child" data-id="11a143a" data-element_type="container" data-e-type="container">
            <div className="elementor-element elementor-element-9ec0b16 elementor-invisible elementor-widget elementor-widget-google_maps" data-id="9ec0b16" data-element_type="widget" data-e-type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeIn&quot;,&quot;_animation_delay&quot;:100,&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="google_maps.default">
              <div className="elementor-widget-container">
                <div className="elementor-custom-embed">
                  <iframe loading="lazy" src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=10&output=embed&iwloc=near" title="London Eye, London, United Kingdom" aria-label="London Eye, London, United Kingdom"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="elementor-element elementor-element-ad7cc00 e-flex e-con-boxed elementor-invisible e-con e-parent" data-id="ad7cc00" data-element_type="container" data-e-type="container" data-settings="{&quot;animation&quot;:&quot;fadeInUp&quot;,&quot;animation_delay&quot;:100}">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-ecee70f e-con-full e-flex e-con e-child" data-id="ecee70f" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
              <div className="elementor-element elementor-element-cc48c64 e-con-full e-flex e-con e-child" data-id="cc48c64" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-d395129 elementor-position-inline-start elementor-mobile-position-inline-start elementor-view-default elementor-widget elementor-widget-icon-box" data-id="d395129" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="icon-box.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-icon-box-wrapper">
                      <div className="elementor-icon-box-icon">
                        <span className="elementor-icon">
                          <i aria-hidden="true" className="fas fa-phone-alt"></i>
                        </span>
                      </div>
                      <div className="elementor-icon-box-content">
                        <h3 className="elementor-icon-box-title">
                          <span>Help Line</span>
                        </h3>
                        <p className="elementor-icon-box-description">
                          (+0) 123 456 789
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-47dc00a e-con-full e-flex e-con e-child" data-id="47dc00a" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-9819183 elementor-position-inline-start elementor-mobile-position-inline-start elementor-view-default elementor-widget elementor-widget-icon-box" data-id="9819183" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="icon-box.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-icon-box-wrapper">
                      <div className="elementor-icon-box-icon">
                        <span className="elementor-icon">
                          <i aria-hidden="true" className="fas fa-map-marker-alt"></i>
                        </span>
                      </div>
                      <div className="elementor-icon-box-content">
                        <h3 className="elementor-icon-box-title">
                          <span>Location</span>
                        </h3>
                        <p className="elementor-icon-box-description">
                          Jl. Raya Kuta No.70, Kuta
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-8be89f2 e-con-full e-flex e-con e-child" data-id="8be89f2" data-element_type="container" data-e-type="container">
                <div className="elementor-element elementor-element-ba7a956 elementor-position-inline-start elementor-mobile-position-inline-start elementor-view-default elementor-widget elementor-widget-icon-box" data-id="ba7a956" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="icon-box.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-icon-box-wrapper">
                      <div className="elementor-icon-box-icon">
                        <span className="elementor-icon">
                          <i aria-hidden="true" className="fas fa-envelope-open-text"></i>
                        </span>
                      </div>
                      <div className="elementor-icon-box-content">
                        <h3 className="elementor-icon-box-title">
                          <span>Email Address</span>
                        </h3>
                        <p className="elementor-icon-box-description">
                          healthcare@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="elementor-element elementor-element-cc37794 e-flex e-con-boxed e-con e-parent" data-id="cc37794" data-element_type="container" data-e-type="container">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-81f6828 e-con-full e-flex e-con e-child" data-id="81f6828" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-17c1fdd at-heading-animation at-animation-heading-none elementor-invisible elementor-widget elementor-widget-heading" data-id="17c1fdd" data-element_type="widget" data-e-type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;,&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h3 className="elementor-heading-title elementor-size-default">Fill The Form</h3>
                </div>
              </div>
              <div className="elementor-element elementor-element-a2ea23d at-heading-animation at-animation-heading-style-3 elementor-widget elementor-widget-heading" data-id="a2ea23d" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">Contact Form</h2>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-d2b5c47 e-flex e-con-boxed elementor-invisible e-con e-child" data-id="d2b5c47" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;animation&quot;:&quot;fadeInUp&quot;,&quot;animation_delay&quot;:200}">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-9d64c08 contact-us-form elementor-widget elementor-widget-elementskit-contact-form7" data-id="9d64c08" data-element_type="widget" data-e-type="widget" data-settings="{&quot;ekit_we_effect_on&quot;:&quot;none&quot;}" data-widget_type="elementskit-contact-form7.default">
                  <div className="elementor-widget-container">
                    <div className="ekit-wid-con">
                      <div className="ekit-form">
                        <div className="wpcf7" id="wpcf7-f6843-p1997-o1" lang="en-US" dir="ltr" data-wpcf7-id="6843">
                          {submitted ? (
                            <div className="wpcf7-mail-sent-ok text-center p-5" style={{
                              background: '#FFF7F4',
                              border: '2px solid var(--primary-color, #00565b)',
                              borderRadius: '10px',
                              boxShadow: '0px 10px 30px rgba(0,0,0,0.05)'
                            }}>
                              <div style={{
                                width: '70px',
                                height: '70px',
                                background: 'var(--primary-color, #00565b)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                color: '#white'
                              }}>
                                <i className="fas fa-check" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                              </div>
                              <h4 style={{ color: 'var(--primary-color, #00565b)', fontWeight: '700', marginBottom: '10px' }}>Thank You!</h4>
                              <p style={{ color: '#555', fontSize: '16px' }}>Your message has been sent successfully. We will get back to you shortly.</p>
                              <button 
                                className="btn-default" 
                                style={{ marginTop: '20px', padding: '10px 25px', borderRadius: '5px' }}
                                onClick={() => setSubmitted(false)}
                              >
                                Send Another Message
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={handleSubmit} className="wpcf7-form init" aria-label="Contact form" noValidate="novalidate">
                              {errorMsg && (
                                <div className="wpcf7-response-output alert alert-danger mb-4" role="alert">
                                  {errorMsg}
                                </div>
                              )}
                              <div className="row">
                                <div className="form-group col-md-6 mb-4">
                                  <p>
                                    <span className="wpcf7-form-control-wrap" data-name="your-name">
                                      <input 
                                        size="40" 
                                        maxLength="400" 
                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control" 
                                        id="name" 
                                        aria-required="true" 
                                        placeholder="Enter Your Full Name" 
                                        type="text" 
                                        name="name" 
                                        value={formData.name}
                                        onChange={handleChange}
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="form-group col-md-6 mb-4">
                                  <p>
                                    <span className="wpcf7-form-control-wrap" data-name="email">
                                      <input 
                                        size="40" 
                                        maxLength="400" 
                                        className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email form-control" 
                                        id="email" 
                                        aria-required="true" 
                                        placeholder="Enter Your Email" 
                                        type="email" 
                                        name="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="form-group col-md-6 mb-4">
                                  <p>
                                    <span className="wpcf7-form-control-wrap" data-name="phone">
                                      <input 
                                        size="40" 
                                        maxLength="400" 
                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control" 
                                        id="phone" 
                                        aria-required="true" 
                                        placeholder="Enter Your Phone Number" 
                                        type="text" 
                                        name="phone" 
                                        value={formData.phone}
                                        onChange={handleChange}
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="form-group col-md-6 mb-4">
                                  <p>
                                    <span className="wpcf7-form-control-wrap" data-name="subject">
                                      <input 
                                        size="40" 
                                        maxLength="400" 
                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control" 
                                        id="subject" 
                                        aria-required="true" 
                                        placeholder="Your Subject" 
                                        type="text" 
                                        name="subject" 
                                        value={formData.subject}
                                        onChange={handleChange}
                                      />
                                    </span>
                                  </p>
                                </div>
                                <div className="form-group col-md-12 mb-4">
                                  <p>
                                    <span className="wpcf7-form-control-wrap" data-name="message">
                                      <textarea 
                                        cols="40" 
                                        rows="10" 
                                        maxLength="2000" 
                                        className="wpcf7-form-control wpcf7-textarea form-control" 
                                        id="msg" 
                                        placeholder="Type Your Message" 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                      ></textarea>
                                    </span>
                                  </p>
                                </div>
                                <div className="col-md-12 form-btn text-center">
                                  <p>
                                    <button 
                                      className="wpcf7-form-control wpcf7-submit btn-default d-inline-flex align-items-center justify-content-center" 
                                      id="msgSubmit" 
                                      type="submit" 
                                      disabled={submitting}
                                      style={{ minWidth: '150px' }}
                                    >
                                      {submitting ? (
                                        <>
                                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style={{ width: '1rem', height: '1rem', borderRightColor: 'transparent' }}></span>
                                          Sending...
                                        </>
                                      ) : 'Send Message'}
                                    </button>
                                  </p>
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
        </div>
      </div>
    </>
  );
}
