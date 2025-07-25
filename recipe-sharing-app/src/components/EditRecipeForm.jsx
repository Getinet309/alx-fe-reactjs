import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const recipes = useRecipeStore(state => state.recipes); // Get all recipes to find the current one

  // Find the recipe to edit
  const currentRecipe = recipes.find(r => r.id === parseInt(id));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Populate form fields when the component mounts or currentRecipe changes
  useEffect(() => {
    if (currentRecipe) {
      setTitle(currentRecipe.title);
      setDescription(currentRecipe.description);
    } else {
      // If recipe not found, navigate back or show error
      navigate('/');
    }
  }, [currentRecipe, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please enter both a title and description for the recipe.');
      return;
    }
    // Call the updateRecipe action with the modified data
    updateRecipe({ id: currentRecipe.id, title, description });
    navigate(`/recipes/${currentRecipe.id}`); // Navigate back to recipe details after saving
  };

  if (!currentRecipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe Not Found</h2>
        <p>Cannot edit a recipe that does not exist.</p>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Edit Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        rows="6"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        required
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <button type="submit" style={{ flex: 1, padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate(`/recipes/${currentRecipe.id}`)}
          style={{ flex: 1, padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;