// src/components/UserProfile.jsx
import React from 'react';


const UserProfile = (props) => {
  return (
     <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
   <h2 style={{ color: 'blue' }}>{props.name}</h2>
   <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
   <p>Bio: {props.bio}</p>
 </div>
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto my-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{props.name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Age:</span> {props.age}
      </p>
      <p className="text-gray-700 leading-relaxed">
        <span className="font-medium">Bio:</span> {props.bio}
      </p>
    </div>
  );
};

export default UserProfile;
