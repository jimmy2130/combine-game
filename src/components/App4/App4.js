import React from 'react';
import styled from 'styled-components';
import {
	motion,
	useScroll,
	useMotionValue,
	useTransform,
	useSpring,
} from 'framer-motion';

function App4() {
	const arr = Array(80)
		.fill(null)
		.map((x, id) => id);
	let { scrollY } = useScroll();
	let diff = useMotionValue(0);
	let time = React.useRef(new Date().getTime());
	const pos = useTransform(diff, value => (value > 0 ? -180 : 0));
	const y = useSpring(pos, { stiffness: 2500, damping: 400 });

	React.useEffect(() => {
		function updateDiff(current) {
			if (new Date().getTime() - time.current > 100) {
				diff.set(current - scrollY.getPrevious());
				time.current = new Date().getTime();
			}
		}

		const unsubscribeScrollY = scrollY.on('change', updateDiff);

		return () => {
			unsubscribeScrollY();
		};
	}, [scrollY, diff, time]);

	return (
		<Wrapper>
			{/* I can only use style here. */}
			<Header style={{ y }}>
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
	height: 80px;
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

export default App4;
