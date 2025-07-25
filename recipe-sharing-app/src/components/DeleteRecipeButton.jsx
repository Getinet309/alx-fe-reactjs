import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    // Using a custom confirmation message instead of alert()
    const isConfirmed = window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.');
    if (isConfirmed) {
      deleteRecipe(recipeId);
      navigate('/'); // Redirect to home page after deletion
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;