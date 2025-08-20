import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// The main App component that renders the FormikForm.
const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <FormikForm />
    </div>
  );
};

// Define the validation schema using Yup.
// This schema will be used by Formik to validate the form fields.
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// The core FormikForm component.
// It uses Formik's components to handle the form state and validation automatically.
const FormikForm = () => {
  // Define the initial values for the form fields.
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // The onSubmit function is called when the form is submitted and validation passes.
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    // Log the form data to the console.
    console.log('Form submitted successfully!');
    console.log('Values:', values);

    // In a real application, you would send this data to a backend API.
    // Simulating an API call with a timeout.
    setTimeout(() => {
      // Set submitting to false to enable the submit button again.
      setSubmitting(false);
      // Reset the form fields to their initial values.
      resetForm();
    }, 400);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register with Formik</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username" // The 'name' prop must match the key in initialValues and validationSchema.
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
              {/* ErrorMessage component automatically displays the validation error for the specified field. */}
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting} // The button is disabled while the form is submitting.
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 w-full disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Register'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
