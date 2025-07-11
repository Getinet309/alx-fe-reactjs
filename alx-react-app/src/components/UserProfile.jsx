// src/components/UserProfile.jsx
import React from 'react';


const UserProfile = ({ name, age, bio }) => { // Destructuring props for cleaner access
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto my-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Age:</span> {age}
      </p>
      <p className="text-gray-700 leading-relaxed">
        <span className="font-medium">Bio:</span> {bio}
      </p>
    </div>
  );
};

export default UserProfile;
