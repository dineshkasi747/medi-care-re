import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    // Clear errors when user types
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else {
      const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number.';
      }
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission delay
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div data-elementor-type="wp-page" data-elementor-id="1997" className="elementor elementor-1997">
      
      {/* Contact Us Page Header banner */}
      <div className="elementor-element elementor-element-53644c8 e-flex e-con-boxed e-con e-parent" data-id="53644c8" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-282b1b0 e-flex e-con-boxed e-con e-child" data-id="282b1b0" data-element_type="container" data-e-type="container">
            <div className="e-con-inner">
              <div className="elementor-element elementor-element-b566959 at-heading-animation at-animation-heading-style-3 elementor-widget elementor-widget-heading" data-id="b566959" data-element_type="widget" data-e-type="widget">
                <div className="elementor-widget-container">
                  <h1 className="elementor-heading-title elementor-size-default">Contact Us</h1>
                </div>
              </div>
              <div className="elementor-element elementor-element-7e636bc elementor-invisible elementor-widget elementor-widget-elementskit-breadcrumb" data-id="7e636bc" data-element_type="widget" data-e-type="widget">
                <div className="elementor-widget-container">
                  <div className="ekit-wid-con">
                    <ol className="ekit-breadcrumb">
                      <li className="ekit_breadcrumbs_start">
                        <a href="/">Home</a>
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

      {/* Map Embed Section */}
      <div className="elementor-element elementor-element-9f3cd3d e-con-full e-flex e-con e-parent" data-id="9f3cd3d" data-element_type="container" data-e-type="container">
        <div className="elementor-element elementor-element-11a143a e-con-full e-flex e-con e-child" data-id="11a143a" data-element_type="container" data-e-type="container">
          <div className="elementor-element elementor-element-9ec0b16 elementor-invisible elementor-widget elementor-widget-google_maps" data-id="9ec0b16" data-element_type="widget" data-e-type="widget">
            <div className="elementor-widget-container">
              <div className="elementor-custom-embed">
                <iframe loading="lazy" src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&t=m&z=10&output=embed&iwloc=near" title="London Eye, London, United Kingdom" aria-label="London Eye, London, United Kingdom"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards Block */}
      <div className="elementor-element elementor-element-ad7cc00 e-flex e-con-boxed elementor-invisible e-con e-parent" data-id="ad7cc00" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-ecee70f e-con-full e-flex e-con e-child" data-id="ecee70f" data-element_type="container" data-e-type="container">
            
            {/* Help Line Card */}
            <div className="elementor-element elementor-element-cc48c64 e-con-full e-flex e-con e-child" data-id="cc48c64" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-d395129 elementor-position-inline-start elementor-mobile-position-inline-start elementor-view-default elementor-widget elementor-widget-icon-box" data-id="d395129" data-element_type="widget" data-e-type="widget">
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
                      <p className="elementor-icon-box-description">(+0) 123 456 789</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="elementor-element elementor-element-47dc00a e-con-full e-flex e-con e-child" data-id="47dc00a" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-9819183 elementor-position-inline-start elementor-mobile-position-inline-start elementor-view-default elementor-widget elementor-widget-icon-box" data-id="9819183" data-element_type="widget" data-e-type="widget">
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
                      <p className="elementor-icon-box-description">Jl. Raya Kuta No.70, Kuta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Address Card */}
            <div className="elementor-element elementor-element-8be89f2 e-con-full e-flex e-con e-child" data-id="8be89f2" data-element_type="container" data-e-type="container">
              <div className="elementor-element elementor-element-ba7a956 elementor-position-inline-start elementor-mobile-position-inline-start elementor-view-default elementor-widget elementor-widget-icon-box" data-id="ba7a956" data-element_type="widget" data-e-type="widget">
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
                      <p className="elementor-icon-box-description">healthcare@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Contact Form block */}
      <div className="elementor-element elementor-element-cc37794 e-flex e-con-boxed e-con e-parent" data-id="cc37794" data-element_type="container" data-e-type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-81f6828 e-con-full e-flex e-con e-child" data-id="81f6828" data-element_type="container" data-e-type="container">
            <div className="elementor-element elementor-element-17c1fdd at-heading-animation at-animation-heading-none elementor-invisible elementor-widget elementor-widget-heading" data-id="17c1fdd" data-element_type="widget" data-e-type="widget">
              <div className="elementor-widget-container">
                <h3 className="elementor-heading-title elementor-size-default">Fill The Form</h3>
              </div>
            </div>
            <div className="elementor-element elementor-element-a2ea23d at-heading-animation at-animation-heading-style-3 elementor-widget elementor-widget-heading" data-id="a2ea23d" data-element_type="widget" data-e-type="widget">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">Contact Form</h2>
              </div>
            </div>
          </div>
          <div className="elementor-element elementor-element-d2b5c47 e-flex e-con-boxed elementor-invisible e-con e-child" data-id="d2b5c47" data-element_type="container" data-e-type="container">
            <div className="e-con-inner">
              <div className="elementor-element elementor-element-9d64c08 contact-us-form elementor-widget elementor-widget-elementskit-contact-form7" data-id="9d64c08" data-element_type="widget" data-e-type="widget">
                <div className="elementor-widget-container">
                  <div className="ekit-wid-con">
                    <div className="ekit-form">
                      <div className="wpcf7">
                        
                        {/* Success notification overlay */}
                        {submitSuccess && (
                          <div className="wpcf7-response-output text-center p-3 mb-4" style={{ background: '#1F3F37', color: '#fff', borderRadius: '5px', fontWeight: 'bold' }}>
                            Your message has been sent successfully! We will get back to you shortly.
                          </div>
                        )}

                        <form onSubmit={handleSubmit} className="wpcf7-form">
                          <div className="row">
                            
                            {/* Full Name input */}
                            <div className="form-group col-md-6 mb-4">
                              <span className="wpcf7-form-control-wrap">
                                <input 
                                  className={`wpcf7-form-control wpcf7-text form-control ${errors.name ? 'is-invalid' : ''}`}
                                  id="name" 
                                  placeholder="Enter Your Full Name" 
                                  type="text" 
                                  value={formData.name}
                                  onChange={handleInputChange}
                                />
                                {errors.name && <div className="invalid-feedback text-danger mt-1">{errors.name}</div>}
                              </span>
                            </div>

                            {/* Email Address input */}
                            <div className="form-group col-md-6 mb-4">
                              <span className="wpcf7-form-control-wrap">
                                <input 
                                  className={`wpcf7-form-control wpcf7-email wpcf7-text form-control ${errors.email ? 'is-invalid' : ''}`}
                                  id="email" 
                                  placeholder="Enter Your Email" 
                                  type="email" 
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                                {errors.email && <div className="invalid-feedback text-danger mt-1">{errors.email}</div>}
                              </span>
                            </div>

                            {/* Phone Number input */}
                            <div className="form-group col-md-6 mb-4">
                              <span className="wpcf7-form-control-wrap">
                                <input 
                                  className={`wpcf7-form-control wpcf7-text form-control ${errors.phone ? 'is-invalid' : ''}`}
                                  id="phone" 
                                  placeholder="Enter Your Phone Number" 
                                  type="text" 
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                />
                                {errors.phone && <div className="invalid-feedback text-danger mt-1">{errors.phone}</div>}
                              </span>
                            </div>

                            {/* Subject input */}
                            <div className="form-group col-md-6 mb-4">
                              <span className="wpcf7-form-control-wrap">
                                <input 
                                  className={`wpcf7-form-control wpcf7-text form-control ${errors.subject ? 'is-invalid' : ''}`}
                                  id="subject" 
                                  placeholder="Your Subject" 
                                  type="text" 
                                  value={formData.subject}
                                  onChange={handleInputChange}
                                />
                                {errors.subject && <div className="invalid-feedback text-danger mt-1">{errors.subject}</div>}
                              </span>
                            </div>

                            {/* Message textarea */}
                            <div className="form-group col-md-12 mb-4">
                              <span className="wpcf7-form-control-wrap">
                                <textarea 
                                  cols="40" 
                                  rows="10" 
                                  className={`wpcf7-form-control wpcf7-textarea form-control ${errors.message ? 'is-invalid' : ''}`}
                                  id="message" 
                                  placeholder="Type Your Message" 
                                  value={formData.message}
                                  onChange={handleInputChange}
                                />
                                {errors.message && <div className="invalid-feedback text-danger mt-1">{errors.message}</div>}
                              </span>
                            </div>

                            {/* Submit Button */}
                            <div className="col-md-12 form-btn text-center">
                              <button 
                                className="wpcf7-form-control wpcf7-submit btn-default d-inline-flex align-items-center justify-content-center" 
                                type="submit" 
                                disabled={isSubmitting}
                                style={{ minWidth: '160px', height: '55px', border: 'none', background: '#F7A582', color: '#1F3F37', fontWeight: '600', cursor: 'pointer', borderRadius: '5px' }}
                              >
                                {isSubmitting ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style={{ width: '1rem', height: '1rem', border: '0.15em solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spinner-border .75s linear infinite' }}></span>
                                    Sending...
                                  </>
                                ) : 'Book Now'}
                              </button>
                            </div>

                          </div>
                        </form>
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
