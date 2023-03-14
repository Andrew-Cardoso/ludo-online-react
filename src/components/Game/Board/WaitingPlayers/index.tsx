import {keyframes} from '@stitches/react';
import {useContext, useEffect, useState} from 'react';
import {GiTemporaryShield} from 'react-icons/gi';
import {GameContext} from '../../../../services/Game/game.context';
import {colors} from '../../../../services/Game/interfaces/colors';
import {useToast} from '../../../../services/Toast/toast.hook';
import {styled} from '../../../../utils/stitches/breakpoints';
import {Pawn} from '../../../Pawn';

const squeeze = keyframes({
	'0%': {transform: 'scaleX(0.8) scaleY(1.2) '},
	'50%': {transform: 'scaleX(1.5) scaleY(0.8)'},
	'100%': {transform: 'scaleX(0.8) scaleY(1.2)'},
});

const toggle = keyframes({
	'0%': {opacity: 1},
	'25%': {opacity: 1},
	'50%': {opacity: 0},
	'75%': {opacity: 1},
	'100%': {opacity: 1},
});

export const Backdrop = styled('aside', {
	position: 'fixed',
	zIndex: 9998,
	display: 'grid',
	placeItems: 'center',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: '#000A',
	gridTemplateColumns: '1fr',
	gridTemplateRows: '2fr .5fr .5fr 2fr',
});

const IconContainer = styled('div', {
	animation: `${squeeze} 2s infinite`,
	animationDirection: 'alternate',
});

const loadingTextLetters = 'Waiting for players . . .'.split('');
const Letter = styled('span', {
	animation: `${toggle} 2s infinite`,
	variants: {
		delay: {
			...loadingTextLetters.reduce(
				(acc, _, index) => ({
					...acc,
					[index]: {animationDelay: index / 10 + 's'},
				}),
				{},
			),
		},
	},
});

const PawnContainer = styled('article', {
	width: '100%',
	height: '8rem',
	display: 'flex',
	justifyContent: 'center',
});

const MiniPawnArea = styled('div', {
	height: '100%',
});

const Info = styled('article', {
	color: 'var(--text-light)',
	fontWeight: 'bold',
	fontSize: '1.5rem',
	backgroundColor: '#0005',
	borderRadius: '1rem',
	padding: '1rem',
	'> span': {
		fontWeight: 'normal',
		color: 'var(--text-light-secondary)',
		filter: 'drop-shadow(0 0 .05rem currentColor)',
		textTransform: 'uppercase',
	},
});

export const WaitingPlayers = () => {
	const {game, playerId} = useContext(GameContext);
	if (!game || !playerId) return null;

	const toast = useToast();
	const [show, toggle] = useState(false);

	const copy = async () => {
		if (!('clipboard' in navigator)) return;
		await navigator.clipboard.writeText(game.id);
		toast('info', 'Game ID copied to clipboard');
	};

	useEffect(() => {
		toggle(game.players.length !== 4 || game.players.some((p) => !p.color));
	}, [game]);

	return (
		<>
			{show ? (
				<Backdrop>
					<Info onClick={copy}>
						Game ID: <span>{game.id}</span>
					</Info>
					<IconContainer>
						<GiTemporaryShield
							size={'10rem'}
							color={`var(--game-${
								game.players.find((x) => x.socketId === playerId)?.color
							})`}
							style={{filter: 'drop-shadow(0 0 0.5rem black)'}}
						/>
					</IconContainer>
					<article>
						{loadingTextLetters.map((letter, index) => (
							<Letter key={index} delay={index as any}>
								{letter}
							</Letter>
						))}
					</article>
					<PawnContainer>
						{colors.map((c) => (
							<MiniPawnArea key={`mini-pawn-${c}`} id={`mini-pawn-${c}`}>
								<Pawn
									color={c}
									mini
									highlight={game.players.some((x) => x.color === c)}
								/>
							</MiniPawnArea>
						))}
					</PawnContainer>
				</Backdrop>
			) : null}
		</>
	);
};
