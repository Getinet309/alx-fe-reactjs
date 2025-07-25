import React from 'react';
import { useRecipeStore } from '../stores/recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  const isFavorited = favorites.includes(recipeId);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigating if this is inside a link
    e.stopPropagation(); // Stop event propagation to parent elements

    if (isFavorited) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.8em', // Larger star icon
        color: isFavorited ? '#ffc107' : '#e0e0e0', // Gold if favorited, grey if not
        padding: '0',
        lineHeight: '1',
        transition: 'color 0.2s ease-in-out',
        display: 'flex', // To ensure icon sits well
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorited ? '★' : '☆'} {/* Filled star vs. outline star */}
    </button>
  );
};

export default FavoriteButton;