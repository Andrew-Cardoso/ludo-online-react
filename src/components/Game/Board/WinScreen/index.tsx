import {useContext} from 'react';
import {GameContext} from '../../../../services/Game/game.context';
import {Winners} from '../../../../services/Game/interfaces/winners';
import {styled} from '../../../../utils/stitches/breakpoints';
import video from '../../../../../public/videos/fireworks.mp4';
import {GiBackwardTime, GiMedal, GiMedalSkull} from 'react-icons/gi';
import {Pawn} from '../../../Pawn';
import {Button} from '../../../Button';
import {ColorEnum} from '../../../../services/Game/interfaces/colors';

// const squeeze = keyframes({
// 	'0%': {transform: 'scaleX(0.8) scaleY(1.2) '},
// 	'50%': {transform: 'scaleX(1.5) scaleY(0.8)'},
// 	'100%': {transform: 'scaleX(0.8) scaleY(1.2)'},
// });

// const toggle = keyframes({
// 	'0%': {opacity: 1},
// 	'25%': {opacity: 1},
// 	'50%': {opacity: 0},
// 	'75%': {opacity: 1},
// 	'100%': {opacity: 1},
// });

const Backdrop = styled('aside', {
	position: 'fixed',
	zIndex: 9999,
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	variants: {
		winner: {
			true: {
				backgroundColor: '#0006',
			},
			false: {
				backgroundColor: '#000A',
			},
		},
	},
});

const Holder = styled('div', {
	position: 'relative',
	width: '100%',
	height: '100%',
});

const Video = styled('video', {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	opacity: 0.5,
});

const Podium = styled('div', {
	width: '100%',
	height: '100%',
	top: 0,
	left: 0,
	position: 'absolute',
	display: 'flex',
	flexFlow: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '2rem',
	padding: '3rem',
	'@smartphone': {
		gap: '1rem',
		padding: '1rem',
	},
});

const Section = styled('section', {
	fontSize: '2rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'baseline',
	textAlign: 'left',
	variants: {
		loser: {
			true: {
				marginTop: 'auto',
			},
		},
	},
	'@smartphone': {
		fontSize: '1.5rem',
	},
});

const canRender = (winners?: Winners) => {
	if (!winners) return false;

	const winnerColors = Object.values(winners);
	if (!winnerColors.length) return false;

	return winnerColors.every((c) => c !== null);
};

const colors = {
	1: '#FFD700',
	2: '#C0C0C0',
	3: '#CD7F32',
};

export const WinScreen = () => {
	const {game, playerId, backToMenu} = useContext(GameContext);
	if (!canRender(game?.winners)) return null;

	const player = game!.players.find((p) => p.socketId === playerId);
	const isWinner = game!.winners[1] === player?.color;

	const loser = game!.players.find((p) => !Object.values(game!.winners).includes(p.color!));

	return (
		<Backdrop winner={isWinner}>
			<Holder>
				{isWinner ? <Video autoPlay loop muted src={video} /> : null}
				<Podium>
					{Object.entries(game!.winners).map(([position, color]) => (
						<Section key={position}>
							<GiMedal
								size={'4rem'}
								color={colors[+position as keyof Winners]}
								data-black-shadow
							/>
							{position}º: <Pawn color={color} mini shadow />
						</Section>
					))}

					<Section loser={true}>
						<GiMedalSkull size={'3rem'} color='white' data-black-shadow />
						Loserº: <Pawn color={loser!.color!} mini shadow />
					</Section>
				</Podium>
				<Button
					icon
					variant='invert'
					size='xsm'
					style={{position: 'absolute', bottom: '1rem', right: '1rem'}}
					onClick={backToMenu}
				>
					<GiBackwardTime size='3rem' data-black-shadow />
				</Button>
			</Holder>
		</Backdrop>
	);
};
