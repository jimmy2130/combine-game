// import React from 'react';
import styled from 'styled-components';

const UnstyledButton = styled.button`
	display: ${props => props.display || 'block'};
	margin: 0;
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
	text-align: center;
	font: inherit;
	color: inherit;

	&:focus {
		outline-offset: 8px;
	}

	&:focus:not(:focus-visible) {
		outline: none;
	}
`;

export default UnstyledButton;
