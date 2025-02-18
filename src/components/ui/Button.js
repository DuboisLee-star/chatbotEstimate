import React from 'react';

const Button = ({ onClick, children, className, disabled }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg focus:outline-none 
      ${disabled 
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'  // Disabled state
        : 'bg-green-500 text-white hover:bg-green-600'}   // Active state color
      ${className}`}
    disabled={disabled} // Native HTML disabled attribute to prevent clicking
  >
    {children}
  </button>
);

export default Button;