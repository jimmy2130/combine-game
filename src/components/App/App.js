import React from 'react';
import styled from 'styled-components';
import { createPuzzle, checkSingleGuess, checkFinish } from '../../helpers';
import Shape from '../Shape';
import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';

const TOTAL_QUESTIONS = 3;

function App() {
	const [puzzle, setPuzzle] = React.useState(createPuzzle());
	const [combo, setCombo] = React.useState([]);
	const [guess, setGuess] = React.useState('');
	const [score, setScore] = React.useState(0);
	const [questionIndex, setQuestionIndex] = React.useState(1);
	const [time, setTime] = React.useState(0);
	const [finish, setFinish] = React.useState(false);

	function handleChange(event) {
		event.preventDefault();
		setGuess(event.target.value);
	}

	function handleAddNum(event, num) {
		event.preventDefault();
		const nextGuess = guess;
		if (nextGuess.length === 3) {
			return;
		}
		setGuess(`${nextGuess}${num}`);
	}

	const handleGuess = React.useCallback(
		function (event) {
			event.preventDefault();
			const result = checkSingleGuess(guess, puzzle, combo);
			if (result) {
				setScore(score + 1);
				setCombo([...combo, guess.split('').join(',')]);
				setGuess('');
			} else {
				setScore(score - 1);
				setGuess('');
			}
		},
		[guess, puzzle, combo, score],
	);

	function handleFinish(event) {
		event.preventDefault();
		if (checkFinish(puzzle, combo.length)) {
			setScore(score + 3);
			setCombo([]);
			setGuess('');
			if (questionIndex === TOTAL_QUESTIONS) {
				setFinish(true);
			} else {
				setPuzzle(createPuzzle());
				setQuestionIndex(questionIndex + 1);
			}
		} else {
			setScore(score - 1);
		}
	}

	function handleRestart(event) {
		event.preventDefault();
		setPuzzle(createPuzzle());
		setCombo([]);
		setGuess('');
		setScore(0);
		setQuestionIndex(1);
		setTime(0);
		setFinish(false);
	}

	React.useEffect(() => {
		function handleTimeout() {
			setTime(time + 1);
		}
		let timeoutId;
		if (!finish) {
			timeoutId = window.setTimeout(handleTimeout, 1000);
		}

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [finish, time]);

	React.useEffect(() => {
		function handleKeyPress(event) {
			if (event.key === 'Enter') {
				handleGuess(event);
			}
		}
		window.addEventListener('keypress', handleKeyPress);
		return () => {
			window.removeEventListener('keypress', handleKeyPress);
		};
	}, [handleGuess]);

	return (
		<Wrapper>
			<Game>
				<Board>
					{puzzle.map((id, index) => (
						<Shape
							key={index}
							id={id}
							handleAddNum={handleAddNum}
							num={index + 1}
						/>
					))}
					<Tag>第{questionIndex}題</Tag>
					<Timer>{time}</Timer>
				</Board>
				<InfoWrapper>
					<Result>
						{combo.map((c, index) => (
							<Item key={c}>{c}</Item>
						))}
					</Result>
					<ControlGroup onSubmit={event => event.preventDefault()}>
						<Input
							type="text"
							maxLength="3"
							value={guess}
							onChange={handleChange}
							disabled={finish}
						/>
						<ButtonWrapper>
							<StyledButton
								onClick={handleFinish}
								disabled={guess !== '' || finish}
							>
								結!
							</StyledButton>
							<StyledButton onClick={handleGuess} disabled={finish}>
								合!
							</StyledButton>
						</ButtonWrapper>
						{finish && (
							<IconButton onClick={handleRestart}>
								<Icon id="refresh-ccw" />
							</IconButton>
						)}
					</ControlGroup>
					<ScoreBoard>
						<Title>分數</Title>
						<Score>{score}</Score>
					</ScoreBoard>
				</InfoWrapper>
			</Game>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	height: 100%;
	display: grid;
	place-content: center;
`;

const Game = styled.div`
	display: flex;
	gap: 32px;
`;

const Board = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 8px;
`;

const Eyebrow = styled.span`
	position: absolute;
	display: block;
	transform: translateY(-100%);
	padding: 8px 24px;
	font-size: calc(24 / 16 * 1rem);
`;

const Tag = styled(Eyebrow)`
	top: 0;
	left: 0;
`;

const Timer = styled(Eyebrow)`
	top: 0;
	right: 0;
`;

const InfoWrapper = styled.div`
	position: relative;
	padding: 24px;
	border: solid;
	display: flex;
	flex-direction: column;
`;

const Result = styled.div`
	height: 180px;
	font-size: calc(32 / 16 * 1rem);
	margin-bottom: auto;

	display: flex;
	flex-direction: column;
	align-content: flex-start;
	flex-wrap: wrap;
`;

const Item = styled.p`
	padding-left: 16px;
	padding-right: 16px;
`;

const ControlGroup = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 32px;
`;

const Input = styled.input`
	padding: 8px 24px;
	font-size: calc(32 / 16 * 1rem);
	height: 80px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
`;

const StyledButton = styled(UnstyledButton)`
	width: 120px;
	height: 80px;
	background: #e6e6e6;
	border-radius: 4px;
	border: 2px solid #e6e6e6;
	font-size: calc(32 / 16 * 1rem);
	flex: 1;

	&:hover {
		border: 2px solid #777777;
	}

	&:disabled {
		cursor: not-allowed;
	}
	&:disabled&:hover {
		border: 2px solid #e6e6e6;
	}
`;

const IconButton = styled(UnstyledButton)`
	position: absolute;
	top: 32px;
	right: 32px;
`;

const ScoreBoard = styled.div`
	font-size: calc(24 / 16 * 1rem);
	text-align: center;
`;

const Title = styled.p``;

const Score = styled.p`
	font-size: calc(48 / 16 * 1rem);
`;

export default App;
