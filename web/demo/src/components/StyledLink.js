import React from 'react';
import { Link } from 'react-router-dom';

const StyledLink = ({ children, disabled }) => {
	return (
		<Link to="/" className={ disabled ? "styled-link disabled" : "styled-link"}>
			{children}
		</Link>
	);
}

export default StyledLink;