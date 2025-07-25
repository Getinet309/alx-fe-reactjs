import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton'; // Import the FavoriteButton

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === parseInt(id))
  );

  if (!recipe) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Recipe Not Found</h2>
        <p>The recipe you are looking for does not exist.</p>
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
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '600px', margin: '20px auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>{recipe.title}</h1>
      <p style={{ color: '#555', lineHeight: '1.6' }}>{recipe.description}</p>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}> {/* Position favorite button */}
        <FavoriteButton recipeId={recipe.id} />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Edit Recipe
        </button>
        <DeleteRecipeButton recipeId={recipe.id} />
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;