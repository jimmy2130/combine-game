import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValue } from 'framer-motion';

function App2() {
	const arr = Array(10)
		.fill(null)
		.map((x, id) => id);
	let { scrollY } = useScroll();
	let height = useMotionValue(80);

	React.useEffect(() => {
		function udpateHeight(current) {
			const diff = current - scrollY.getPrevious();
			let newHeight = height.get() - diff;
			if (diff > 0) {
				height.set(Math.max(50, newHeight));
			} else {
				height.set(Math.min(80, newHeight));
			}
		}

		const unsubscribeScrollY = scrollY.on('change', udpateHeight);

		return () => {
			unsubscribeScrollY();
		};
	}, [scrollY, height]);

	return (
		<Wrapper>
			<Header style={{ height }}>
				<NavLinks>
					<Link>Home</Link>
					<Link>About</Link>
					<Link>Contact</Link>
				</NavLinks>
			</Header>
			{arr.map(x => (
				<Paragraph key={x}></Paragraph>
			))}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	background: #131313;
	padding: 160px 80px 80px 80px;
`;

const Header = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: #979797;
	display: grid;
	place-content: center;
`;

const NavLinks = styled.ul`
	display: flex;
	gap: 32px;
`;

const Link = styled.li`
	list-style-type: none;
	font-size: calc(19 / 16 * 1rem);
	color: #131313;
`;

function Paragraph() {
	return (
		<ParagraphWrapper>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			Lorem Ipsum has been the industry's standard dummy text ever since the
			1500s, when an unknown printer took a galley of type and scrambled it to
			make a type specimen book. It has survived not only five centuries, but
			also the leap into electronic typesetting, remaining essentially
			unchanged. It was popularised in the 1960s with the release of Letraset
			sheets containing Lorem Ipsum passages, and more recently with desktop
			publishing software like Aldus PageMaker including versions of Lorem
			Ipsum.
		</ParagraphWrapper>
	);
}

const ParagraphWrapper = styled.p`
	color: white;
	margin-bottom: 24px;
`;

export default App2;
