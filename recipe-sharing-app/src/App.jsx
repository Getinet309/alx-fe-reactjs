import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useRecipeStore } from './stores/recipeStore';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';       // New import
import RecommendationsList from './components/RecommendationsList'; // New import
import FavoriteButton from './components/FavoriteButton';     // New import (for use in RecipeList/Details if needed directly)
import './App.css'; // Assuming you might have some basic CSS

function App() {
  const setRecipes = useRecipeStore(state => state.setRecipes);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations); // Get the action

  // Initial data load and initial recommendation generation on app mount
  useEffect(() => {
    const initialRecipes = [
      { id: 1, title: 'Spicy Chicken Curry', description: 'A fiery chicken curry with coconut milk and aromatic spices. Perfect with rice.' },
      { id: 2, title: 'Vegetable Stir-fry', description: 'Quick and healthy stir-fry with seasonal vegetables and a savory soy sauce. Ready in 15 minutes.' },
      { id: 3, title: 'Classic Beef Lasagna', description: 'Layers of pasta, rich meat sauce, bechamel, and cheese, baked to golden perfection.' },
      { id: 4, title: 'Lemon Garlic Salmon', description: 'Baked salmon with a tangy lemon-garlic butter sauce. A simple yet elegant dinner.' },
      { id: 5, title: 'Tomato Basil Pasta', description: 'Simple and fresh pasta with ripe tomatoes, fresh basil, garlic, and olive oil.' },
      { id: 6, title: 'Chocolate Chip Cookies', description: 'Classic soft and chewy chocolate chip cookies, a timeless dessert favorite.' },
      { id: 7, title: 'Mushroom Risotto', description: 'Creamy Italian rice dish cooked with broth, mushrooms, and Parmesan cheese.' },
      { id: 8, title: 'Chicken Noodle Soup', description: 'Comforting chicken noodle soup, perfect for a cold day or when you need a light meal.' },
    ];
    setRecipes(initialRecipes); // This also triggers initial filterRecipes and generateRecommendations
  }, [setRecipes]);

  return (
    <Router>
      <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Recipe Sharing Application</h1>

        {/* Navigation Links */}
        <nav style={{ marginBottom: '30px', textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff', margin: '0 15px', fontSize: '1.1em', fontWeight: 'bold' }}>Home</Link>
          <Link to="/favorites" style={{ textDecoration: 'none', color: '#007bff', margin: '0 15px', fontSize: '1.1em', fontWeight: 'bold' }}>My Favorites</Link>
        </nav>

        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                 <SearchBar />
              </div>
              <AddRecipeForm />
              <hr style={{ margin: '30px 0', borderColor: '#eee' }} />
              <RecipeList />
              <RecommendationsList /> {/* Display recommendations on the home page */}
            </>
          } />

          {/* Favorites Route */}
          <Route path="/favorites" element={<FavoritesList />} />

          {/* Recipe Details Route */}
          <Route path="/recipes/:id" element={<RecipeDetails />} />

          {/* Edit Recipe Route */}
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />

          {/* Optional: A catch-all route for 404 Not Found */}
          <Route path="*" element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
              <Link to="/" style={{ textDecoration: 'none', color: '#007bff', marginTop: '20px', display: 'inline-block' }}>Go to Home</Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;