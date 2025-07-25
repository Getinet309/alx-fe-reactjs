// src/components/UserProfile.jsx
import React, { useContext } from 'react'; // Import useContext from React
import UserContext from './UserContext';    // Import your UserContext

const UserProfile = () => { // No 'props' parameter needed here
  const user = useContext(UserContext); // Get user data from context

  // Handle case where user data might not be available (e.g., no Provider, or null data)
  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto my-8 border border-gray-200 text-center text-gray-600">
        No user data available. Please ensure a UserContext.Provider is active.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto my-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Age:</span> {user.age}
      </p>
      <p className="text-gray-700 leading-relaxed">
        <span className="font-medium">Bio:</span> {user.bio}
      </p>
    </div>
  );
};

export default UserProfile;
