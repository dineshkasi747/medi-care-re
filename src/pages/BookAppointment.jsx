import React, { useState, useEffect } from 'react';

export default function BookAppointment() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    department: '',
    service: '',
    doctor: '',
    date: '',
    timeSlot: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Departments List
  const departments = [
    'Cardiology Clinic',
    'Pathology Clinic',
    'Laboratory Analysis',
    'Pediatric Clinic',
    'Cardiac Clinic',
    'Neurology Clinic'
  ];

  // Services associated with Departments
  const servicesMap = {
    'Cardiology Clinic': ['Heart Rhythm Test', 'Cardiac Rehabilitation', 'Coronary Angiogram'],
    'Pathology Clinic': ['Blood Chemistries', 'Tissue Biopsy', 'Urine Pathology'],
    'Laboratory Analysis': ['Complete Blood Count (CBC)', 'Metabolic Panel', 'Urinalysis'],
    'Pediatric Clinic': ['Infant Growth Checking', 'Pediatric Vaccination', 'General Kid Checkup'],
    'Cardiac Clinic': ['Heart Echo Scanning', 'Pacemaker Consultation', 'ECG Monitoring'],
    'Neurology Clinic': ['Brain EEG Test', 'Nerve Conduction Study', 'Sleep Disorder Testing']
  };

  // Doctors associated with Departments
  const doctorsMap = {
    'Cardiology Clinic': ['Dr. Elizabeth Foster', 'Dr. David Lee'],
    'Pathology Clinic': ['Dr. Ava White', 'Dr. Daniel Brown'],
    'Laboratory Analysis': ['Dr. Sarah Jenkins', 'Dr. Michael Chang'],
    'Pediatric Clinic': ['Dr. Jessica Morgan', 'Dr. Christopher Vance'],
    'Cardiac Clinic': ['Dr. Anthony Reynolds', 'Dr. Lisa Campbell'],
    'Neurology Clinic': ['Dr. Brian O\'Connor', 'Dr. Nicole Kidman']
  };

  // Generate dynamic date slots (today + next 6 days)
  const [availableDates, setAvailableDates] = useState([]);
  useEffect(() => {
    const dates = [];
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        rawString: d.toISOString().split('T')[0],
        formatted: d.toLocaleDateString('en-US', options)
      });
    }
    setAvailableDates(dates);
  }, []);

  // Time Slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Auto-fill services and doctors when department changes
  useEffect(() => {
    if (formData.department) {
      const services = servicesMap[formData.department] || [];
      const doctors = doctorsMap[formData.department] || [];
      setFormData(prev => ({
        ...prev,
        service: services[0] || '',
        doctor: doctors[0] || ''
      }));
    }
  }, [formData.department]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSelectField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Step Navigations & Field Validations
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.department) newErrors.department = 'Please select a department.';
      if (!formData.service) newErrors.service = 'Please select a service.';
      if (!formData.doctor) newErrors.doctor = 'Please select a doctor.';
    } else if (step === 2) {
      if (!formData.date) newErrors.date = 'Please choose a date.';
      if (!formData.timeSlot) newErrors.timeSlot = 'Please pick a time slot.';
    } else if (step === 3) {
      if (!formData.name.trim()) newErrors.name = 'Patient name is required.';
      
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setActiveStep(4);
      }, 1500);
    }
  };

  const handleResetWizard = () => {
    setFormData({
      department: '',
      service: '',
      doctor: '',
      date: '',
      timeSlot: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
    setErrors({});
    setActiveStep(1);
  };

  return (
    <main id="content" className="site-main post-6813 page type-page status-publish hentry">
      
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-box">
                <h1 className="text-anime">Book an Appointment</h1>
                <div role="navigation" aria-label="Breadcrumbs" className="breadcrumb-trail breadcrumbs">
                  <ol className="trail-items">
                    <li className="trail-item trail-begin">
                      <a href="/"><span>Home</span></a>
                    </li>
                    <li className="trail-item trail-end">
                      <span><span>Book an Appointment</span></span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard Body */}
      <div className="page-single-post single-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div className="post-content">
                <div className="post-entry medipro-block-style p-4 p-md-5" style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                  
                  {/* Stepper Progress bar */}
                  <div className="row mb-5 text-center justify-content-center">
                    {[
                      { step: 1, label: 'Service & Doctor' },
                      { step: 2, label: 'Date & Time' },
                      { step: 3, label: 'Your Details' },
                      { step: 4, label: 'Confirmation' }
                    ].map(item => (
                      <div key={item.step} className="col-3 col-md-2 d-flex flex-column align-items-center">
                        <div 
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: activeStep >= item.step ? '#1F3F37' : '#eee',
                            color: activeStep >= item.step ? '#fff' : '#888',
                            fontWeight: 'bold',
                            border: activeStep === item.step ? '3px solid #F7A582' : 'none',
                            transition: 'all 0.3s'
                          }}
                        >
                          {item.step}
                        </div>
                        <span className="small mt-2 d-none d-md-inline" style={{ fontWeight: activeStep === item.step ? 'bold' : 'normal', color: activeStep >= item.step ? '#1F3F37' : '#999' }}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Select Department, Service, Doctor */}
                  {activeStep === 1 && (
                    <div className="animate-fade-in">
                      <h4 className="mb-4 text-center" style={{ color: '#1F3F37', fontWeight: '700' }}>Select Clinic, Service & Doctor</h4>
                      <div className="row">
                        
                        {/* Department Select */}
                        <div className="form-group col-md-12 mb-4">
                          <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '8px' }}>Select Department *</label>
                          <select 
                            className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                            id="department"
                            value={formData.department}
                            onChange={(e) => handleSelectField('department', e.target.value)}
                            style={{ height: '55px', borderRadius: '5px', border: '1px solid #ddd' }}
                          >
                            <option value="">-- Choose a Department --</option>
                            {departments.map(dept => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                          {errors.department && <div className="invalid-feedback text-danger mt-1">{errors.department}</div>}
                        </div>

                        {/* Service Select */}
                        {formData.department && (
                          <div className="form-group col-md-6 mb-4">
                            <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '8px' }}>Select Service *</label>
                            <select 
                              className="form-control"
                              id="service"
                              value={formData.service}
                              onChange={(e) => handleSelectField('service', e.target.value)}
                              style={{ height: '55px', borderRadius: '5px', border: '1px solid #ddd' }}
                            >
                              {(servicesMap[formData.department] || []).map(serv => (
                                <option key={serv} value={serv}>{serv}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Doctor Select */}
                        {formData.department && (
                          <div className="form-group col-md-6 mb-4">
                            <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '8px' }}>Select Doctor *</label>
                            <select 
                              className="form-control"
                              id="doctor"
                              value={formData.doctor}
                              onChange={(e) => handleSelectField('doctor', e.target.value)}
                              style={{ height: '55px', borderRadius: '5px', border: '1px solid #ddd' }}
                            >
                              {(doctorsMap[formData.department] || []).map(doc => (
                                <option key={doc} value={doc}>{doc}</option>
                              ))}
                            </select>
                          </div>
                        )}

                      </div>

                      {/* Next controls */}
                      <div className="text-center mt-4">
                        <button 
                          className="btn-default"
                          onClick={handleNextStep}
                          style={{ minWidth: '160px', height: '55px', border: 'none', background: '#F7A582', color: '#1F3F37', fontWeight: '600', borderRadius: '5px', cursor: 'pointer' }}
                        >
                          Next Step
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Date & Time Picker */}
                  {activeStep === 2 && (
                    <div className="animate-fade-in">
                      <h4 className="mb-4 text-center" style={{ color: '#1F3F37', fontWeight: '700' }}>Choose Date & Time</h4>
                      
                      {/* Date Selection */}
                      <div className="mb-4">
                        <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '12px' }}>Available Dates *</label>
                        <div className="row g-2">
                          {availableDates.map(dateObj => (
                            <div key={dateObj.rawString} className="col-4 col-md-2 mb-2">
                              <button 
                                type="button"
                                className="w-100 p-2 text-center"
                                onClick={() => handleSelectField('date', dateObj.formatted)}
                                style={{
                                  background: formData.date === dateObj.formatted ? '#1F3F37' : '#fff',
                                  color: formData.date === dateObj.formatted ? '#fff' : '#1F3F37',
                                  border: '1px solid #1F3F37',
                                  borderRadius: '5px',
                                  fontWeight: '500',
                                  fontSize: '13px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                {dateObj.formatted}
                              </button>
                            </div>
                          ))}
                        </div>
                        {errors.date && <div className="text-danger small mt-1">{errors.date}</div>}
                      </div>

                      {/* Time Slots Grid */}
                      <div className="mb-4">
                        <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '12px' }}>Available Time Slots *</label>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                          {timeSlots.map(time => (
                            <button 
                              key={time}
                              type="button"
                              className="px-3 py-2"
                              onClick={() => handleSelectField('timeSlot', time)}
                              style={{
                                background: formData.timeSlot === time ? '#F7A582' : '#fff',
                                color: '#1F3F37',
                                border: '1px solid #F7A582',
                                borderRadius: '20px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        {errors.timeSlot && <div className="text-danger small text-center mt-2">{errors.timeSlot}</div>}
                      </div>

                      {/* Navigation Buttons */}
                      <div className="d-flex justify-content-between mt-5">
                        <button 
                          className="btn-default btn-outline"
                          onClick={handlePrevStep}
                          style={{ minWidth: '130px', height: '50px', border: '1px solid #1F3F37', background: '#fff', color: '#1F3F37', fontWeight: '600', borderRadius: '5px', cursor: 'pointer' }}
                        >
                          Back
                        </button>
                        <button 
                          className="btn-default"
                          onClick={handleNextStep}
                          style={{ minWidth: '130px', height: '50px', border: 'none', background: '#F7A582', color: '#1F3F37', fontWeight: '600', borderRadius: '5px', cursor: 'pointer' }}
                        >
                          Next Step
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Patient Information Form */}
                  {activeStep === 3 && (
                    <div className="animate-fade-in">
                      <h4 className="mb-4 text-center" style={{ color: '#1F3F37', fontWeight: '700' }}>Patient Information</h4>
                      
                      <form onSubmit={handleSubmitBooking}>
                        <div className="row">
                          
                          {/* Name Input */}
                          <div className="form-group col-md-6 mb-4">
                            <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '8px' }}>Your Full Name *</label>
                            <input 
                              type="text"
                              id="name"
                              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                              placeholder="Enter Patient Full Name"
                              value={formData.name}
                              onChange={handleInputChange}
                              style={{ height: '55px', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            {errors.name && <div className="invalid-feedback text-danger mt-1">{errors.name}</div>}
                          </div>

                          {/* Email Input */}
                          <div className="form-group col-md-6 mb-4">
                            <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '8px' }}>Email Address *</label>
                            <input 
                              type="email"
                              id="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              placeholder="Enter Patient Email"
                              value={formData.email}
                              onChange={handleInputChange}
                              style={{ height: '55px', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            {errors.email && <div className="invalid-feedback text-danger mt-1">{errors.email}</div>}
                          </div>

                          {/* Phone Input */}
                          <div className="form-group col-md-12 mb-4">
                            <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '8px' }}>Phone Number *</label>
                            <input 
                              type="text"
                              id="phone"
                              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                              placeholder="Enter Patient Phone Number"
                              value={formData.phone}
                              onChange={handleInputChange}
                              style={{ height: '55px', borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                            {errors.phone && <div className="invalid-feedback text-danger mt-1">{errors.phone}</div>}
                          </div>

                          {/* Notes Textarea */}
                          <div className="form-group col-md-12 mb-4">
                            <label style={{ fontWeight: '600', color: '#1F3F37', display: 'block', marginBottom: '8px' }}>Special Request / Notes (Optional)</label>
                            <textarea 
                              id="notes"
                              className="form-control"
                              placeholder="Describe any symptoms or specific clinic needs..."
                              value={formData.notes}
                              onChange={handleInputChange}
                              rows="4"
                              style={{ borderRadius: '5px', border: '1px solid #ddd' }}
                            />
                          </div>

                        </div>

                        {/* Navigation Buttons */}
                        <div className="d-flex justify-content-between mt-5">
                          <button 
                            type="button"
                            className="btn-default btn-outline"
                            onClick={handlePrevStep}
                            style={{ minWidth: '130px', height: '50px', border: '1px solid #1F3F37', background: '#fff', color: '#1F3F37', fontWeight: '600', borderRadius: '5px', cursor: 'pointer' }}
                          >
                            Back
                          </button>
                          
                          <button 
                            type="submit"
                            className="btn-default d-inline-flex align-items-center justify-content-center"
                            disabled={isSubmitting}
                            style={{ minWidth: '160px', height: '50px', border: 'none', background: '#F7A582', color: '#1F3F37', fontWeight: '600', borderRadius: '5px', cursor: 'pointer' }}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style={{ width: '1rem', height: '1rem', border: '0.15em solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spinner-border .75s linear infinite' }}></span>
                                Confirming...
                              </>
                            ) : 'Book Appointment'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Step 4: Booking Confirmation Recap */}
                  {activeStep === 4 && (
                    <div className="animate-fade-in text-center p-3">
                      <div className="mb-4" style={{ color: '#1F3F37' }}>
                        <i className="far fa-check-circle" style={{ fontSize: '70px', color: '#F7A582' }}></i>
                      </div>
                      <h3 className="mb-3 font-weight-bold" style={{ color: '#1F3F37', fontWeight: '800' }}>Booking Confirmed!</h3>
                      <p className="lead mb-4 text-muted">Thank you, <strong>{formData.name}</strong>. Your appointment has been scheduled successfully. We have sent a confirmation email to <strong>{formData.email}</strong>.</p>
                      
                      {/* Summary Panel card */}
                      <div className="text-start mx-auto p-4 mb-5" style={{ maxWidth: '600px', background: '#f9f9f9', borderRadius: '10px', borderLeft: '5px solid #F7A582' }}>
                        <h5 className="mb-3 font-weight-bold" style={{ color: '#1F3F37' }}>Appointment Summary</h5>
                        <div className="row g-2 text-muted">
                          <div className="col-md-6"><strong>Department:</strong> {formData.department}</div>
                          <div className="col-md-6"><strong>Doctor:</strong> {formData.doctor}</div>
                          <div className="col-md-6"><strong>Service:</strong> {formData.service}</div>
                          <div className="col-md-6"><strong>Date:</strong> {formData.date}</div>
                          <div className="col-md-6"><strong>Time Slot:</strong> {formData.timeSlot}</div>
                          <div className="col-md-6"><strong>Phone:</strong> {formData.phone}</div>
                        </div>
                      </div>

                      <button 
                        className="btn-default"
                        onClick={handleResetWizard}
                        style={{ minWidth: '180px', height: '55px', border: 'none', background: '#1F3F37', color: '#fff', fontWeight: '600', borderRadius: '5px', cursor: 'pointer' }}
                      >
                        Book Another
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
