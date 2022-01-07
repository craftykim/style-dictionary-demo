import React from 'react';

const Button = ({ children, disabledButton }) => (
  <button type="button" disabled={disabledButton ? true : false} className="styled-button">
    {children}
  </button>
);

export default Button;