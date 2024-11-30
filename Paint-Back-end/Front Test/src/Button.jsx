// Button.jsx
import React from 'react';

const Button = ({ symbol, color, onClick }) => {
  return (
    <button
      className="calc-button"
      style={{ backgroundColor: color }}
      onClick={() => onClick(symbol)}
    >
      {symbol}
    </button>
  );
};

export default Button;
