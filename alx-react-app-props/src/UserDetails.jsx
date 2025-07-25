// UserDetails.jsx
import React, { useContext } from 'react'; // Import the useContext hook
import { UserContext } from './UserContext'; // Import the UserContext

// Modify UserDetails.jsx to consume UserContext using the useContext hook
// instead of receiving userData as a prop.
function UserDetails() {
  // Use the useContext hook to access the userData from the UserContext.
  // This hook reads the current context value from the nearest UserContext.Provider above it in the tree.
  const userData = useContext(UserContext);

  return (
    <div className="user-details bg-blue-50 p-4 rounded-md border border-blue-200">
      <p className="text-gray-900 mb-1">
        <span className="font-medium">Name:</span> {userData ? userData.name : 'N/A'}
      </p>
      <p className="text-gray-900">
        <span className="font-medium">Email:</span> {userData ? userData.email : 'N/A'}
      </p>
    </div>
  );
}

export default UserDetails;
