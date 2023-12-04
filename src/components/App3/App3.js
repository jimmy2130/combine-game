import React from 'react';
import styled from 'styled-components';

function App3() {
	const arr = Array(10)
		.fill(null)
		.map((_, id) => id);
	const scrollPosition = React.useRef({ now: null, prev: null });
	const height = React.useRef(80);
	const headerRef = React.useRef();
	console.log('fire');

	React.useEffect(() => {
		function handleScroll() {
			scrollPosition.current.prev = scrollPosition.current.now;
			scrollPosition.current.now = window.scrollY;
			let diff = 0;
			if (
				scrollPosition.current.now !== null &&
				scrollPosition.current.prev !== null
			) {
				diff = scrollPosition.current.now - scrollPosition.current.prev;
			}
			height.current = Math.min(Math.max(0, height.current - diff), 80);
			headerRef.current.style.height = `${height.current}px`;
		}
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<Wrapper>
			<Header ref={headerRef} style={{ height: `${height}px` }}>
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

const Header = styled.div`
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

export default App3;
