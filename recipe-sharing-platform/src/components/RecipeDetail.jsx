// src/components/RecipeDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find(r => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-700">Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
        &larr; Back to Home
      </Link>
      <div className="mt-4 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
        <p className="text-gray-700 text-lg mb-8">{recipe.summary}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          {/* Instructions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;