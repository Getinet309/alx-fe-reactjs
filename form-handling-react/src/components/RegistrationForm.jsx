import React, { useState } from 'react';

/**
 * A controlled component for a user registration form.
 * This form manages its state using a single object, which is a common and efficient pattern in React.
 */
const RegistrationForm = () => {
  // Use a single useState hook to manage all form data.
  // This object-based approach is more scalable than using a separate state variable for each input.
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State for storing validation errors.
  const [errors, setErrors] = useState({});

  /**
   * Generic handler for all input changes.
   * It uses the input's 'name' attribute to update the correct property in the formData state object.
   * @param {object} e - The event object from the input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Validates the form data and returns an object of errors.
   */
  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  /**
   * Handles the form submission.
   * Prevents default form behavior and performs validation before processing.
   * @param {object} e - The event object from the form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are no validation errors, proceed with submission logic.
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data submitted:', formData);
      // In a real application, you would send this data to an API here.
      alert('Registration Successful!');
      // Clear the form after successful submission.
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    } else {
      console.log('Validation errors:', validationErrors);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Controlled Component Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            // The value is bound to a property of the formData object,
            // not a separate state variable.
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.username && <p style={{ color: 'red', fontSize: '12px' }}>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            // The value is bound to a property of the formData object.
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            // The value is bound to a property of the formData object.
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
