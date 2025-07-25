// ProfilePage.jsx
import React from 'react';
import UserInfo from './UserInfo';

// Remove the 'userData' prop from the component's destructuring,
// as it will now be accessed via Context by its children.
function ProfilePage() {
  return (
    <div className="profile-page p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h1>
      {/* UserInfo no longer needs userData as a prop */}
      <UserInfo />
    </div>
  );
}

export default ProfilePage;
