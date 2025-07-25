 // Footer.jsx
import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#333', // Dark background
    color: '#fff',            // White text
    textAlign: 'center',      // Center the text
    padding: '20px 0',        // 20px padding top/bottom, 0 left/right
    position: 'fixed',        // Makes the footer stick to the bottom of the viewport
    bottom: '0',              // Aligns it to the very bottom
    width: '100%',            // Ensures it spans the full width
    boxShadow: '0 -2px 5px rgba(0,0,0,0.2)', // A subtle shadow above the footer
    fontFamily: 'Verdana, sans-serif', // A sans-serif font
    fontSize: '0.9em',        // Slightly smaller font size
    // You can add more styles here!
  };

  const paragraphStyle = {
    margin: '0', // Remove default paragraph margin to center text perfectly
  };

  return (
    <footer style={footerStyle}>
      <p style={paragraphStyle}>© 2023 City Lovers</p>
    </footer>
  );
}

export default Footer;
