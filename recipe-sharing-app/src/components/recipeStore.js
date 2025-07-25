import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],         // All recipes
  searchTerm: '',      // Current search term entered by the user
  filteredRecipes: [], // Recipes that match the search term
  favorites: [],       // Array of recipe IDs that are favorited
  recommendations: [], // Array of recommended recipes

  // Action to add a new recipe
  addRecipe: (newRecipe) => {
    set(state => ({ recipes: [...state.recipes, newRecipe] }));
    get().filterRecipes();
    get().generateRecommendations(); // Re-generate recommendations after adding
  },

  // Action to delete a recipe by its ID
  deleteRecipe: (idToDelete) => {
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== idToDelete),
      favorites: state.favorites.filter(id => id !== idToDelete) // Also remove from favorites
    }));
    get().filterRecipes();
    get().generateRecommendations(); // Re-generate recommendations after deleting
  },

  // Action to update an existing recipe
  updateRecipe: (updatedRecipe) => {
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    }));
    get().filterRecipes();
    get().generateRecommendations(); // Re-generate recommendations after updating
  },

  // Action to set the entire recipes array (e.g., for initial data load)
  setRecipes: (recipes) => {
    set({ recipes });
    get().filterRecipes();
    get().generateRecommendations(); // Generate initial recommendations
  },

  // Action to update the search term and trigger filtering
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  // Action to compute filtered recipes based on the current search term
  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    if (!searchTerm) {
      set({ filteredRecipes: recipes });
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      recipe.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
    set({ filteredRecipes: results });
  },

  // Action to add a recipe to favorites
  addFavorite: (recipeId) => {
    set(state => {
      // Prevent adding duplicates
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] };
      }
      return state; // No change if already favorited
    });
    get().generateRecommendations(); // Re-generate recommendations after favorite change
  },

  // Action to remove a recipe from favorites
  removeFavorite: (recipeId) => {
    set(state => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    }));
    get().generateRecommendations(); // Re-generate recommendations after favorite change
  },

  // Action to generate personalized recommendations
  generateRecommendations: () => {
    const { recipes, favorites } = get();

    // Simple Recommendation Logic:
    // 1. Get recipes not in favorites.
    // 2. Prioritize recipes with similar keywords from favorited recipes (mocked here).
    // 3. Or, just show a few random non-favorited recipes.
    const nonFavoriteRecipes = recipes.filter(recipe => !favorites.includes(recipe.id));

    // A more sophisticated recommendation would analyze common keywords, categories,
    // or user interactions. For this example, we'll pick some random non-favorites
    // and maybe prioritize those that share a word from existing favorites.

    let recommended = [];
    const favoriteTitles = favorites.map(favId => recipes.find(r => r.id === favId)?.title.toLowerCase() || '');
    const favoriteWords = [...new Set(favoriteTitles.flatMap(title => title.split(' ')))];

    // Try to find recipes with keywords from favorites first
    for (const word of favoriteWords) {
      if (word.length > 2) { // Ignore very short words
        const matchingRecipes = nonFavoriteRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(word) ||
          recipe.description.toLowerCase().includes(word)
        );
        recommended.push(...matchingRecipes);
      }
    }

    // Remove duplicates and limit recommendations
    recommended = [...new Set(recommended)].slice(0, 5); // Max 5 recommendations

    // If we don't have enough, fill with random non-favorites
    while (recommended.length < 5 && nonFavoriteRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * nonFavoriteRecipes.length);
      const randomRecipe = nonFavoriteRecipes[randomIndex];
      if (!recommended.includes(randomRecipe)) {
        recommended.push(randomRecipe);
      }
      // Remove from nonFavoriteRecipes to avoid re-picking
      nonFavoriteRecipes.splice(randomIndex, 1);
    }
    recommended = recommended.slice(0, 5); // Ensure max 5 if initial non-favorites were plentiful

    set({ recommendations: recommended });
  },
}));

export { useRecipeStore };