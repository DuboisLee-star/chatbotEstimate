import React from 'react';

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none ${className}`}
  >
    {children}
  </button>
);

export default Button;