import React from 'react';
import { useRecipeStore } from '../stores/recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const searchTerm = useRecipeStore(state => state.searchTerm); // To make it a controlled component

  return (
    <input
      type="text"
      placeholder="Search by recipe name or description..."
      value={searchTerm} // Make it a controlled component
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '10px 15px',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1em',
        boxSizing: 'border-box' // Include padding and border in the element's total width and height
      }}
    />
  );
};

export default SearchBar;