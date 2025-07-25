import React, { useState } from 'react';
import { useRecipeStore } from '../stores/recipeStore'; // Adjust path if needed

const AddRecipeForm = () => {
  // Select the 'addRecipe' action from your Zustand store
  const addRecipe = useRecipeStore(state => state.addRecipe);

  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please enter both a title and description for the recipe.');
      return;
    }
    // Call the addRecipe action from the store
    addRecipe({ id: Date.now(), title, description }); // Use Date.now() for a simple unique ID
    setTitle(''); // Clear the form fields
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px 0' }}>
      <h2>Add New Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        rows="4"
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        required
      />
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;