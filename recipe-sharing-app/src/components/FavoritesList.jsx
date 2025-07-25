import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';
import FavoriteButton from './FavoriteButton'; // We'll create this next

const FavoritesList = () => {
  // Get all recipes and then map favorite IDs to actual recipe objects
  const recipes = useRecipeStore(state => state.recipes);
  const favoriteIds = useRecipeStore(state => state.favorites);

  const favorites = favoriteIds
    .map(id => recipes.find(recipe => recipe.id === id))
    .filter(Boolean); // Filter out any undefined if a favorited recipe no longer exists

  return (
    <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>🌟 My Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>You haven't favorited any recipes yet. Start adding some!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {favorites.map(recipe => (
            <div key={recipe.id} style={{ border: '1px solid #f0f0f0', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#007bff', fontSize: '1.2em' }}>{recipe.title}</h3>
              </Link>
              <p style={{ color: '#555', fontSize: '0.95em', marginBottom: '10px' }}>
                {recipe.description.length > 100 ? recipe.description.substring(0, 100) + '...' : recipe.description}
              </p>
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <FavoriteButton recipeId={recipe.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;