// App.jsx
import React from 'react';
import ProfilePage from './ProfilePage';
import { UserContext } from './UserContext'; // Import the UserContext
import './App.css'; // Assuming you have an App.css for styling

function App() {
  // Define the user data here, which will be provided via Context
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    // Wrap the ProfilePage component (and anything else needing user data)
    // inside UserContext.Provider.
    // Pass userData as the 'value' prop to the provider.
    <UserContext.Provider value={userData}>
      <div className="App flex items-center justify-center min-h-screen bg-gray-100 font-inter">
        {/* ProfilePage no longer needs userData as a prop */}
        <ProfilePage />
      </div>
    </UserContext.Provider>
  );
}

export default App;
