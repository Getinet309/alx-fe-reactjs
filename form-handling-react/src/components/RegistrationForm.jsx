import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/**
 * A Formik-based component for a user registration form.
 * This version uses Formik's built-in components for a more declarative and streamlined approach.
 */
const FormikForm = () => {
  // Define the validation schema using Yup.
  // This schema enforces that fields are required, and the email is a valid format.
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  // Define the initial values for the form fields.
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  /**
   * Handles the form submission.
   * Formik passes the form values and helper functions automatically.
   * @param {object} values - An object containing the current form values.
   * @param {object} actions - Formik actions, including `setSubmitting` and `resetForm`.
   */
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Formik form submitted:', values);
    alert('Registration with Formik Successful!');
    
    // Simulate an API call with a delay.
    setTimeout(() => {
      setSubmitting(false); // Set submitting to false to re-enable the button.
      resetForm(); // Reset the form fields to their initial values.
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Formik Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
              {/* ErrorMessage component automatically displays the error for the given field. */}
              <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                style={{ width: '100%', padding: '8px', margin: '5px 0' }}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <button
              type="submit"
              // The button is disabled while the form is submitting.
              disabled={isSubmitting}
              style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
