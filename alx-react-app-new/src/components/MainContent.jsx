// MainContent.jsx
import React from 'react';

function MainContent() {
  const mainContentStyle = {
    backgroundColor: '#f0f8ff', // A very light blue
    padding: '30px',            // Some space around the content
    borderRadius: '10px',       // Slightly rounded corners for a softer look
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // A subtle shadow for depth
    textAlign: 'center',        // Center the text
    fontFamily: 'Georgia, serif', // A classic, readable font
    color: '#333',              // Dark grey text for good contrast
    margin: '20px auto',        // Center the component horizontally with top/bottom margin
    maxWidth: '600px',          // Limit the width for better readability
    lineHeight: '1.5',          // Improve line spacing
    fontSize: '1.2em'           // Slightly larger font size
  };

  const paragraphStyle = {
    color: '#0056b3', // A darker blue for the text
    fontWeight: 'bold', // Make the text bold
    letterSpacing: '0.5px' // Slightly spread out letters
  };

  return (
    <main style={mainContentStyle}>
      <p style={paragraphStyle}>I love to visit New York, Paris, and Tokyo.</p>
    </main>
  );
}

export default MainContent;
