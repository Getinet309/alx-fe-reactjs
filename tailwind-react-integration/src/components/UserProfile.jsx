// src/components/UserProfile.jsx

import React from 'react';

function UserProfile() {
  return (
    // Container (div.user-profile) styling
    <div className="bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg text-center">
      {/* Image (img) styling */}
      <img
        src="https://placehold.co/150x150/E0E0E0/333333?text=User" // Using a placeholder image with text
        alt="User"
        className="rounded-full w-36 h-36 mx-auto block object-cover" // Added object-cover for better image fitting
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/E0E0E0/333333?text=Error"; }} // Fallback for image loading errors
      />
      {/* Heading (h1) styling */}
      <h1 className="text-xl text-blue-800 my-4 font-semibold">John Doe</h1>
      {/* Paragraph (p) styling */}
      <p className="text-gray-600 text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
