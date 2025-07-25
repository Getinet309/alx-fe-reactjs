import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';
import FavoriteButton from './FavoriteButton'; // Import the FavoriteButton

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  return (
    <div>
      <h2 style={{ color: '#333', marginBottom: '15px' }}>All Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1em', marginTop: '20px' }}>
          {useRecipeStore.getState().searchTerm ? 'No recipes match your search.' : 'No recipes added yet. Add some below!'}
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'relative' }}>
              <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#007bff', fontSize: '1.2em' }}>{recipe.title}</h3>
              </Link>
              <p style={{ color: '#555', fontSize: '0.95em', marginBottom: '10px' }}>
                {recipe.description.length > 120 ? recipe.description.substring(0, 120) + '...' : recipe.description}
              </p>
              <Link to={`/recipes/${recipe.id}`} style={{ display: 'inline-block', marginTop: '5px', padding: '8px 12px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9em' }}>
                View Details
              </Link>
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}> {/* Position favorite button */}
                <FavoriteButton recipeId={recipe.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;