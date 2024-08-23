import { useState } from 'react';
import './App.css';
import * as yup from 'yup';

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "", 
    queryType: "", 
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); 

  const userSchema = yup.object().shape({
    firstName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name is required.'),
    secondName: yup.string().required('Last name is required.'),
    email: yup.string().email('Invalid email').required('Email address is required.'),
    message: yup.string().required('Message is required enter it please.'),
    consent: yup.boolean().oneOf([true], 'Consent is required.'),
  });

  async function handleOnFormSubmit(event) {
    event.preventDefault();
    
    try {
      await userSchema.validate(formData, { abortEarly: false });
      setSuccessMessage("Message Sent!Thanks for completing the form. We'll be in touch soon.");
      setErrors({}); 
      setFormData({
        firstName: "",
        secondName: "",
        email: "", 
        queryType: "", 
        message: "",
        consent: false,
      });
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  }

  function handleOnChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <div className="form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleOnFormSubmit} className="contact-form">
        <h2 className='contact'>Contact Us</h2>

        <div className="name-fields">
          <div>
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleOnChange}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="secondName">Last Name *</label>
            <input
              type="text"
              id="secondName"
              name="secondName"
              value={formData.secondName}
              onChange={handleOnChange}
              className={errors.secondName ? 'error' : ''}
            />
            {errors.secondName && <p className="error-text">{errors.secondName}</p>}
          </div>
        </div>

        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label>Query Type *</label>
        <div className="query-type">
          <div>
            <input
              type="radio"
              id="general"
              name="queryType"
              value="general"
              checked={formData.queryType === "general"}
              onChange={handleOnChange}
            />
            <label htmlFor="general">General Enquiry</label>
          </div>

          <div>
            <input
              type="radio"
              id="support"
              name="queryType"
              value="support"
              checked={formData.queryType === "support"}
              onChange={handleOnChange}
            />
            <label htmlFor="support">Support Request</label>
          </div>
        </div>

        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleOnChange}
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <p className="error-text">{errors.message}</p>}

        <div className="consent">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleOnChange}
            className={errors.consent ? 'error' : ''}
          />
          <label htmlFor="consent">
            I consent to being contacted by the team *
          </label>
        </div>
        {errors.consent && <p className="error-text">{errors.consent}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
