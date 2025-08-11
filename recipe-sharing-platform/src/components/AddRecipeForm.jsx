// src/components/AddRecipeForm.jsx
import { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  // Corrected: using 'steps' instead of 'instructions'
  const [steps, setSteps] = useState(''); 
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required.';
    }
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    }
    // Corrected: checking for 'steps' instead of 'instructions'
    if (!steps.trim()) {
      newErrors.steps = 'Preparation steps are required.'; 
    }

    // Set errors and check if the form is valid
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, process the data
      console.log('Form submitted:', { title, ingredients, steps });

      // Clear the form fields after successful submission
      setTitle('');
      setIngredients('');
      setSteps(''); // Corrected: resetting 'steps'
      setErrors({});
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Add a New Recipe</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              rows="4"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter each ingredient on a new line."
            ></textarea>
            {errors.ingredients && <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>}
          </div>

          <div>
            {/* Corrected: Label and htmlFor for 'steps' */}
            <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">
              Preparation Steps
            </label>
            <textarea
              // Corrected: id for 'steps'
              id="steps"
              rows="6"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter each step on a new line."
            ></textarea>
            {/* Corrected: displaying errors for 'steps' */}
            {errors.steps && <p className="mt-1 text-sm text-red-500">{errors.steps}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
