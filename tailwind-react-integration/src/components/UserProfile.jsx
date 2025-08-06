// src/components/UserProfile.jsx

import React from 'react';

function UserProfile() {
  return (
    // Container (div.user-profile) styling with responsive adjustments
    // Padding: p-4 on small screens, p-8 on medium and larger screens
    // Max Width: max-w-xs on small screens, max-w-sm on medium and larger screens
    <div className="bg-gray-100 sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg text-center">
      {/* Image (img) styling with responsive adjustments */}
      {/* Width/Height: w-24 h-24 on small screens, w-36 h-36 on medium and larger screens */}
      <img
        src="https://placehold.co/150x150/E0E0E0/333333?text=User" // Using a placeholder image with text
        alt="User"
        className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto block object-cover" // Added object-cover for better image fitting
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/E0E0E0/333333?text=Error"; }} // Fallback for image loading errors
      />
      {/* Heading (h1) styling with responsive adjustments */}
      {/* Font Size: text-lg on small screens, text-xl on medium and larger screens */}
      <h1 className="sm:text-lg md:text-xl text-blue-800 my-4 font-semibold">John Doe</h1>
      {/* Paragraph (p) styling with responsive adjustments */}
      {/* Font Size: text-sm on small screens, text-base on medium and larger screens */}
      <p className="text-gray-600 sm:text-sm md:text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
