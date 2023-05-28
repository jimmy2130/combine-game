import React from 'react';
import styled from 'styled-components';
import { ChevronRight, RefreshCcw, Play, Pause } from 'react-feather';

const icons = {
	'chevron-right': ChevronRight,
	'refresh-ccw': RefreshCcw,
	play: Play,
	pause: Pause,
};

function Icon({ id, color, size, strokeWidth, ...delegated }) {
	const Component = icons[id];

	if (!Component) {
		throw new Error(`No icon found for ID: ${id}`);
	}

	return (
		<Wrapper strokeWidth={strokeWidth} {...delegated}>
			<Component color={color} size={size} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	& > svg {
		display: block;
		stroke-width: ${p => p.strokeWidth}px;
	}
`;

export default Icon;
