import React, { useState } from 'react';

export default function BookAppointment() {
  const categories = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Neurology' },
    { id: 3, name: 'Pediatrician' },
    { id: 4, name: 'Gastrology' }
  ];

  const doctors = [
    { 
      id: 1, 
      categoryId: 3, 
      name: 'Dr. Elizabeth Foster', 
      price: '$50.00', 
      priceNum: 50,
      duration: '30 Mins', 
      specialty: 'Pediatrician',
      img: 'https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/author-1.JPG'
    },
    { 
      id: 2, 
      categoryId: 1, 
      name: 'Dr. David Lee', 
      price: '$100.00', 
      priceNum: 100,
      duration: '30 Mins', 
      specialty: 'Cardiology',
      img: 'https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/author-2.JPG'
    },
    { 
      id: 3, 
      categoryId: 2, 
      name: 'Dr. Ava White', 
      price: '$100.00', 
      priceNum: 100,
      duration: '30 Mins', 
      specialty: 'Neurology',
      img: 'https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/author-3.JPG'
    },
    { 
      id: 4, 
      categoryId: 4, 
      name: 'Dr. Daniel Brown', 
      price: '$80.00', 
      priceNum: 80,
      duration: '30 Mins', 
      specialty: 'Gastrology',
      img: 'https://demo.awaikenthemes.com/theme-medipro/wp-content/uploads/2024/05/author-4.JPG'
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  // States
  const [currentTab, setCurrentTab] = useState('service'); // service -> datetime -> details -> summary -> success
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors.find(d => d.categoryId === 1));
  const [selectedDate, setSelectedDate] = useState('2026-05-27');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    note: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const matchedDoc = doctors.find(d => d.categoryId === catId);
    if (matchedDoc) {
      setSelectedDoctor(matchedDoc);
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setErrorMsg('');

    if (currentTab === 'service') {
      if (!selectedDoctor) {
        setErrorMsg('Please select a doctor/service to proceed.');
        return;
      }
      setCurrentTab('datetime');
    } else if (currentTab === 'datetime') {
      if (!selectedDate) {
        setErrorMsg('Please choose a valid date.');
        return;
      }
      if (!selectedTime) {
        setErrorMsg('Please select a time slot.');
        return;
      }
      setCurrentTab('details');
    } else if (currentTab === 'details') {
      if (!patientDetails.firstName || !patientDetails.lastName || !patientDetails.email || !patientDetails.phone) {
        setErrorMsg('Please fill in all required fields (First Name, Last Name, Email, Phone Number).');
        return;
      }
      // Simple Email Check
      if (!/\S+@\S+\.\S+/.test(patientDetails.email)) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      setCurrentTab('summary');
    } else if (currentTab === 'summary') {
      setBookingLoading(true);
      setTimeout(() => {
        setBookingLoading(false);
        setCurrentTab('success');
      }, 1500);
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentTab === 'datetime') {
      setCurrentTab('service');
    } else if (currentTab === 'details') {
      setCurrentTab('datetime');
    } else if (currentTab === 'summary') {
      setCurrentTab('details');
    }
  };

  const handleReset = () => {
    setCurrentTab('service');
    setSelectedCategory(1);
    setSelectedDoctor(doctors.find(d => d.categoryId === 1));
    setSelectedDate('2026-05-27');
    setSelectedTime('');
    setPatientDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      note: ''
    });
    setErrorMsg('');
  };

  return (
    <>
      <main id="content" className="site-main post-6813 page type-page status-publish hentry">
        <div className="page-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="page-header-box">
                  <h1 className="text-anime">Book an Appointment</h1>
                  <div role="navigation" aria-label="Breadcrumbs" className="breadcrumb-trail breadcrumbs">
                    <ol className="trail-items">
                      <li className="trail-item trail-begin">
                        <a href="home.html"><span>Home</span></a>
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

        <div className="page-single-post single-page">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="post-content">
                  <div className="post-entry medipro-block-style">
                    
                    <div className="bpa-frontend-main-container bpa-frontend-main-booking-calendar" id="bookingpress_booking_form_react">
                      
                      {currentTab !== 'success' && (
                        <div id="bpa-front-tabs" className="bpa-front-tabs bpa-front-tabs--vertical-left bpa-front-tabs--left" style={{ display: 'flex' }}>
                          
                          {/* Sidebar Tabs Navigation */}
                          <div className="bpa-front-tab-menu">
                            <button 
                              className={`bpa-front-tab-menu--item bpa_focusable ${currentTab === 'service' ? '__bpa-is-active' : ''}`}
                              onClick={() => currentTab !== 'success' && setCurrentTab('service')}
                              style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                            >
                              <span className="bpa-front-tm--item-icon material-icons-round">
                                <i className="fas fa-user-md" style={{ fontSize: '18px' }}></i>
                              </span>
                              <div className="bpa-front-tm--item-label">Service</div>
                            </button>

                            <button 
                              className={`bpa-front-tab-menu--item bpa_focusable ${currentTab === 'datetime' ? '__bpa-is-active' : ''}`}
                              disabled={!selectedDoctor}
                              onClick={() => selectedDoctor && setCurrentTab('datetime')}
                              style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                            >
                              <span className="bpa-front-tm--item-icon material-icons-round">
                                <i className="fas fa-calendar-alt" style={{ fontSize: '18px' }}></i>
                              </span>
                              <div className="bpa-front-tm--item-label">Date & Time</div>
                            </button>

                            <button 
                              className={`bpa-front-tab-menu--item bpa_focusable ${currentTab === 'details' ? '__bpa-is-active' : ''}`}
                              disabled={!selectedTime}
                              onClick={() => selectedTime && setCurrentTab('details')}
                              style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                            >
                              <span className="bpa-front-tm--item-icon material-icons-round">
                                <i className="fas fa-user" style={{ fontSize: '18px' }}></i>
                              </span>
                              <div className="bpa-front-tm--item-label">Basic Details</div>
                            </button>

                            <button 
                              className={`bpa-front-tab-menu--item bpa_focusable ${currentTab === 'summary' ? '__bpa-is-active' : ''}`}
                              disabled={!patientDetails.firstName || !patientDetails.lastName || !patientDetails.email || !patientDetails.phone}
                              onClick={() => patientDetails.firstName && patientDetails.lastName && setCurrentTab('summary')}
                              style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                            >
                              <span className="bpa-front-tm--item-icon material-icons-round">
                                <i className="fas fa-check-circle" style={{ fontSize: '18px' }}></i>
                              </span>
                              <div className="bpa-front-tm--item-label">Summary</div>
                            </button>
                          </div>

                          {/* 1. Step: Service Selection */}
                          {currentTab === 'service' && (
                            <div className="bpa-front-tabs--panel-body __bpa-is-active">
                              <div className="bpa-front-default-card">
                                {errorMsg && (
                                  <div className="bpa-front-toast-notification --bpa-error mb-4" role="alert">
                                    <div className="bpa-front-tn-body">{errorMsg}</div>
                                  </div>
                                )}

                                <div className="bpa-front-dc--body">
                                  {/* Categories filter */}
                                  <div className="bpa-front-module-container bpa-front-module--category">
                                    <div className="bpa-front-module-heading">Select Category</div>
                                    <div className="bpa-front-cat-items-wrapper">
                                      <div className="bpa-front-cat-items">
                                        {categories.map((cat) => (
                                          <span 
                                            key={cat.id}
                                            className={`bpa-front-ci-pill el-tag el-tag--light bpa_focusable ${selectedCategory === cat.id ? '__bpa-is-active' : ''}`}
                                            onClick={() => handleCategorySelect(cat.id)}
                                            role="button"
                                            style={{ cursor: 'pointer' }}
                                          >
                                            <div className="bpa-front-ci-item-title">{cat.name}</div>
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Doctor List */}
                                  <div className="bpa-front-module-container bpa-front-module--service" style={{ marginTop: '30px' }}>
                                    <div className="bpa-front-module-heading">Select Doctor & Consultation</div>
                                    <div className="bpa-front-module--service-items-row" role="list">
                                      {doctors
                                        .filter((doc) => doc.categoryId === selectedCategory)
                                        .map((doc) => (
                                          <div 
                                            key={doc.id}
                                            role="listitem" 
                                            className={`bpa-front-module--service-item ${selectedDoctor?.id === doc.id ? '__bpa-is-selected' : ''}`}
                                            onClick={() => handleDoctorSelect(doc)}
                                            style={{ cursor: 'pointer', display: 'block', width: '100%', marginBottom: '15px' }}
                                          >
                                            <div className="bpa-front-si-card bpa_focusable" style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
                                              <div className="bpa-front-si-card__left" style={{ marginRight: '20px' }}>
                                                <img 
                                                  src={doc.img} 
                                                  alt={doc.name} 
                                                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-color)' }} 
                                                />
                                              </div>
                                              <div className="bpa-front-si__card-body" style={{ flexGrow: 1 }}>
                                                <div className="bpa-front-si__card-body--heading" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)' }}>
                                                  {doc.name}
                                                </div>
                                                <div className="bpa-front-si-cb__specs" style={{ display: 'flex', gap: '15px', marginTop: '5px', color: '#666' }}>
                                                  <div className="bpa-front-si-cb__specs-item">
                                                    <i className="far fa-clock" style={{ marginRight: '5px' }}></i>
                                                    {doc.duration}
                                                  </div>
                                                  <div className="bpa-front-si-cb__specs-item">
                                                    <i className="fas fa-tags" style={{ marginRight: '5px' }}></i>
                                                    {doc.price}
                                                  </div>
                                                </div>
                                              </div>
                                              {selectedDoctor?.id === doc.id && (
                                                <div className="bpa-front-si-card--checkmark-icon" style={{ marginLeft: 'auto' }}>
                                                  <i className="fas fa-check-circle" style={{ color: 'var(--primary-color)', fontSize: '24px' }}></i>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="bpa-front-dc--footer">
                                  <div className="bpa-front-tabs--foot" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button 
                                      className="bpa-front-btn bpa-front-btn__medium bpa-front-btn--primary bpa_focusable"
                                      onClick={handleNext}
                                      style={{ padding: '12px 30px', fontWeight: '600' }}
                                    >
                                      Next: Date & Time
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 2. Step: Date & Time Selection */}
                          {currentTab === 'datetime' && (
                            <div className="bpa-front-tabs--panel-body __bpa-is-active">
                              <div className="bpa-front-default-card">
                                {errorMsg && (
                                  <div className="bpa-front-toast-notification --bpa-error mb-4" role="alert">
                                    <div className="bpa-front-tn-body">{errorMsg}</div>
                                  </div>
                                )}

                                <div className="bpa-front-dc--body">
                                  <div className="bpa-front-module-container bpa-front-module--date-and-time">
                                    <div className="bpa-front-module-heading">Select Date & Time Slot</div>
                                    
                                    <div className="row mt-4">
                                      {/* Date Picker Input */}
                                      <div className="col-md-6 mb-4">
                                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block', color: 'var(--primary-color)' }}>
                                          Choose Date
                                        </label>
                                        <input 
                                          type="date" 
                                          className="form-control"
                                          style={{
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            fontSize: '16px',
                                            width: '100%',
                                            background: '#fff'
                                          }}
                                          value={selectedDate}
                                          onChange={(e) => setSelectedDate(e.target.value)}
                                          min="2026-05-26"
                                        />
                                      </div>

                                      {/* Time Slots grid */}
                                      <div className="col-md-6 mb-4">
                                        <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block', color: 'var(--primary-color)' }}>
                                          Available Time Slots
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                          {timeSlots.map((slot) => (
                                            <button
                                              key={slot}
                                              className={`btn ${selectedTime === slot ? 'btn-primary' : 'btn-outline-secondary'}`}
                                              style={{
                                                padding: '10px 5px',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                background: selectedTime === slot ? 'var(--primary-color)' : '#fff',
                                                color: selectedTime === slot ? '#fff' : '#444',
                                                borderColor: selectedTime === slot ? 'var(--primary-color)' : '#ddd',
                                                transition: 'all 0.2s'
                                              }}
                                              onClick={() => setSelectedTime(slot)}
                                            >
                                              {slot}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bpa-front-dc--footer">
                                  <div className="bpa-front-tabs--foot" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button 
                                      className="bpa-front-btn bpa-front-btn__medium bpa-front-btn--secondary bpa_focusable"
                                      onClick={handleBack}
                                      style={{ padding: '12px 30px', background: '#f5f5f5', border: '1px solid #ddd', color: '#444' }}
                                    >
                                      Back
                                    </button>
                                    <button 
                                      className="bpa-front-btn bpa-front-btn__medium bpa-front-btn--primary bpa_focusable"
                                      onClick={handleNext}
                                      style={{ padding: '12px 30px' }}
                                    >
                                      Next: Basic Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. Step: Basic Details */}
                          {currentTab === 'details' && (
                            <div className="bpa-front-tabs--panel-body __bpa-is-active">
                              <div className="bpa-front-default-card">
                                {errorMsg && (
                                  <div className="bpa-front-toast-notification --bpa-error mb-4" role="alert">
                                    <div className="bpa-front-tn-body">{errorMsg}</div>
                                  </div>
                                )}

                                <div className="bpa-front-dc--body">
                                  <div className="bpa-front-module-heading" style={{ marginBottom: '20px' }}>Patient Details</div>
                                  
                                  <div className="row">
                                    <div className="form-group col-md-6 mb-4">
                                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>First Name <span style={{ color: 'red' }}>*</span></label>
                                      <input 
                                        type="text" 
                                        name="firstName" 
                                        className="form-control" 
                                        placeholder="Enter First Name"
                                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={patientDetails.firstName}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                    <div className="form-group col-md-6 mb-4">
                                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Last Name <span style={{ color: 'red' }}>*</span></label>
                                      <input 
                                        type="text" 
                                        name="lastName" 
                                        className="form-control" 
                                        placeholder="Enter Last Name"
                                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={patientDetails.lastName}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                    <div className="form-group col-md-6 mb-4">
                                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Email Address <span style={{ color: 'red' }}>*</span></label>
                                      <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Enter Email Address"
                                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={patientDetails.email}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                    <div className="form-group col-md-6 mb-4">
                                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                                      <input 
                                        type="tel" 
                                        name="phone" 
                                        className="form-control" 
                                        placeholder="Enter Phone Number"
                                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={patientDetails.phone}
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                    <div className="form-group col-md-12 mb-4">
                                      <label style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>Notes (Optional)</label>
                                      <textarea 
                                        name="note" 
                                        className="form-control" 
                                        rows="4" 
                                        placeholder="Enter any medical concerns, symptoms, or special requests..."
                                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        value={patientDetails.note}
                                        onChange={handleInputChange}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>

                                <div className="bpa-front-dc--footer">
                                  <div className="bpa-front-tabs--foot" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button 
                                      className="bpa-front-btn bpa-front-btn__medium bpa-front-btn--secondary bpa_focusable"
                                      onClick={handleBack}
                                      style={{ padding: '12px 30px', background: '#f5f5f5', border: '1px solid #ddd', color: '#444' }}
                                    >
                                      Back
                                    </button>
                                    <button 
                                      className="bpa-front-btn bpa-front-btn__medium bpa-front-btn--primary bpa_focusable"
                                      onClick={handleNext}
                                      style={{ padding: '12px 30px' }}
                                    >
                                      Next: Summary
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 4. Step: Booking Summary */}
                          {currentTab === 'summary' && (
                            <div className="bpa-front-tabs--panel-body __bpa-is-active">
                              <div className="bpa-front-default-card">
                                <div className="bpa-front-dc--body">
                                  <div className="bpa-front-module-heading" style={{ marginBottom: '20px' }}>Review Appointment Summary</div>

                                  <div 
                                    style={{
                                      background: '#FFF7F4',
                                      borderRadius: '10px',
                                      padding: '25px',
                                      border: '1px dashed var(--primary-color, #00565b)',
                                      marginBottom: '25px'
                                    }}
                                  >
                                    <div className="row mb-3" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                                      <div className="col-md-6">
                                        <span style={{ color: '#666', fontSize: '14px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Consultant / Specialty</span>
                                        <strong style={{ fontSize: '18px', color: 'var(--primary-color, #00565b)', display: 'block', marginTop: '4px' }}>
                                          {selectedDoctor?.name}
                                        </strong>
                                        <span style={{ color: '#555', fontSize: '15px', fontWeight: '500' }}>
                                          Specialty: {selectedDoctor?.specialty}
                                        </span>
                                      </div>
                                      <div className="col-md-6 text-md-end" style={{ marginTop: '10px', marginTop: '0' }}>
                                        <span style={{ color: '#666', fontSize: '14px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date & Time</span>
                                        <strong style={{ fontSize: '18px', color: 'var(--primary-color, #00565b)', display: 'block', marginTop: '4px' }}>
                                          {selectedDate} at {selectedTime}
                                        </strong>
                                        <span style={{ color: '#555', fontSize: '15px', fontWeight: '500' }}>
                                          Duration: {selectedDoctor?.duration}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="row mb-3" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                                      <div className="col-md-12">
                                        <span style={{ color: '#666', fontSize: '14px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Patient Info</span>
                                        <strong style={{ fontSize: '16px', color: '#333', display: 'block', marginTop: '4px' }}>
                                          {patientDetails.firstName} {patientDetails.lastName}
                                        </strong>
                                        <span style={{ color: '#555', display: 'block', fontSize: '14px' }}>
                                          Email: {patientDetails.email} | Phone: {patientDetails.phone}
                                        </span>
                                        {patientDetails.note && (
                                          <p style={{ marginTop: '10px', fontSize: '14px', fontStyle: 'italic', color: '#666', background: '#fff', padding: '10px', borderRadius: '5px' }}>
                                            Note: "{patientDetails.note}"
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <div className="row pt-2 align-items-center">
                                      <div className="col-8">
                                        <strong style={{ fontSize: '18px', color: '#333' }}>Total Amount Payable (On Site):</strong>
                                      </div>
                                      <div className="col-4 text-end">
                                        <strong style={{ fontSize: '24px', color: 'var(--primary-color, #00565b)' }}>{selectedDoctor?.price}</strong>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-center p-3" style={{ background: '#e6f1f2', borderRadius: '8px', color: 'var(--primary-color, #00565b)', fontWeight: '600' }}>
                                    <i className="fas fa-info-circle me-2" style={{ marginRight: '8px' }}></i>
                                    Payment will be collected at the hospital counter during your visit.
                                  </div>
                                </div>

                                <div className="bpa-front-dc--footer">
                                  <div className="bpa-front-tabs--foot" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button 
                                      className="bpa-front-btn bpa-front-btn__medium bpa-front-btn--secondary bpa_focusable"
                                      onClick={handleBack}
                                      disabled={bookingLoading}
                                      style={{ padding: '12px 30px', background: '#f5f5f5', border: '1px solid #ddd', color: '#444' }}
                                    >
                                      Back
                                    </button>
                                    <button 
                                      className="bpa-front-btn bpa-front-btn__medium bpa-front-btn--primary bpa_focusable d-inline-flex align-items-center justify-content-center"
                                      onClick={handleNext}
                                      disabled={bookingLoading}
                                      style={{ padding: '12px 40px', fontWeight: '700', minWidth: '220px' }}
                                    >
                                      {bookingLoading ? (
                                        <>
                                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style={{ width: '1.2rem', height: '1.2rem', borderRightColor: 'transparent', marginRight: '8px' }}></span>
                                          Confirming Booking...
                                        </>
                                      ) : 'Confirm & Book Now'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                        </div>
                      )}

                      {/* 5. Step: Booking Success */}
                      {currentTab === 'success' && (
                        <div 
                          className="text-center p-5 animated fadeInUp" 
                          style={{
                            background: '#FFF7F4',
                            border: '3px solid var(--primary-color, #00565b)',
                            borderRadius: '12px',
                            boxShadow: '0px 15px 40px rgba(0,0,0,0.06)',
                            maxWidth: '700px',
                            margin: '40px auto'
                          }}
                        >
                          <div style={{
                            width: '90px',
                            height: '90px',
                            background: 'var(--primary-color, #00565b)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 25px',
                            boxShadow: '0 8px 20px rgba(0,86,91,0.2)'
                          }}>
                            <i className="fas fa-check" style={{ fontSize: '40px', color: '#ffffff' }}></i>
                          </div>
                          
                          <h2 style={{ color: 'var(--primary-color, #00565b)', fontWeight: '800', marginBottom: '15px', fontSize: '28px' }}>
                            Appointment Confirmed!
                          </h2>
                          
                          <p style={{ color: '#444', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
                            Dear <strong>{patientDetails.firstName} {patientDetails.lastName}</strong>, your appointment with <strong>{selectedDoctor?.name}</strong> has been successfully booked for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>. 
                            A confirmation receipt has been sent to your email (<strong>{patientDetails.email}</strong>).
                          </p>

                          <div 
                            style={{
                              background: '#fff',
                              borderRadius: '8px',
                              padding: '20px',
                              border: '1px dashed #ddd',
                              textAlign: 'left',
                              marginBottom: '35px'
                            }}
                          >
                            <h4 style={{ color: '#333', fontWeight: '700', marginBottom: '15px', borderBottom: '1px solid #f2f2f2', paddingBottom: '10px' }}>
                              Booking Details
                            </h4>
                            <div className="row">
                              <div className="col-sm-6 mb-2">
                                <strong>Doctor:</strong> {selectedDoctor?.name}
                              </div>
                              <div className="col-sm-6 mb-2">
                                <strong>Specialty:</strong> {selectedDoctor?.specialty}
                              </div>
                              <div className="col-sm-6 mb-2">
                                <strong>Date:</strong> {selectedDate}
                              </div>
                              <div className="col-sm-6 mb-2">
                                <strong>Time Slot:</strong> {selectedTime}
                              </div>
                              <div className="col-sm-6 mb-2">
                                <strong>Consultation Fee:</strong> {selectedDoctor?.price} (Pay on Site)
                              </div>
                              <div className="col-sm-6 mb-2">
                                <strong>Duration:</strong> {selectedDoctor?.duration}
                              </div>
                            </div>
                          </div>

                          <button 
                            className="btn-default" 
                            style={{ padding: '14px 40px', borderRadius: '30px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                            onClick={handleReset}
                          >
                            Book Another Appointment
                          </button>
                        </div>
                      )}

                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
