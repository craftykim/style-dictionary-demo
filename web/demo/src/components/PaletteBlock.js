import React from 'react';

const PaletteBlock = ({ children, color, textColor }) => (
  <div
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: textColor,
      padding: '1rem',
			marginBottom: '1rem'
    }}>
    {children}
  </div>
);

export default PaletteBlock;