// UserInfo.jsx
import React from 'react';
import UserDetails from './UserDetails';

// Remove the 'userData' prop from the component's destructuring.
function UserInfo() {
  return (
    <div className="user-info mb-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Information Summary</h2>
      {/* UserDetails no longer needs userData as a prop */}
      <UserDetails />
    </div>
  );
}

export default UserInfo;
