import React from 'react';
import styled from 'styled-components';
import UnstyledButton from '../UnstyledButton';

const SHAPES = [Circle, Square, Triangle];
const COLORS = ['red', 'yellow', 'blue'];

const BACKGROUND_COLORS = ['#e0e0e0', '#858585', 'black'];

function Shape({ id = '021', num, handleAddNum }) {
	const Pattern = SHAPES[id[0]];
	const color = COLORS[id[1]];
	const backgroundColor = BACKGROUND_COLORS[id[2]];
	return (
		<Wrapper onClick={event => handleAddNum(event, num)}>
			<svg
				width="200"
				viewBox="0 0 200 200"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Background fill={backgroundColor} />
				<Pattern fill={color} />
			</svg>
		</Wrapper>
	);
}

const Wrapper = styled(UnstyledButton)`
	border: solid;
	aspect-ratio: 1 / 1;
`;

function Background({ fill = 'black' }) {
	return <rect width="200" height="200" fill={fill} />;
}

function Circle({ fill = 'red' }) {
	return <circle cx="100" cy="100" r="60" fill={fill} />;
}

function Square({ fill = 'red' }) {
	const size = 130;
	const distance = (200 - size) / 2;
	return (
		<rect width={size} height={size} x={distance} y={distance} fill={fill} />
	);
}

function Triangle({ fill = 'red' }) {
	const cx = 100;
	const cy = 115;
	const r = 70;
	const x1 = cx - (r * Math.sqrt(3)) / 2;
	const y1 = cy + r / 2;
	const x2 = cx + 1;
	const y2 = cy - r;
	const x3 = cx + (r * Math.sqrt(3)) / 2;
	const y3 = cy + r / 2;
	const d = `M${x1} ${y1}L${x2} ${y2}L${x3} ${y3}H${x1}Z`;
	return <path d={d} fill={fill} />;
}

export default Shape;
