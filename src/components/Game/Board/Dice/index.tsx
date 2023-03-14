import {useContext, useEffect, useRef} from 'react';
import ReactDice from 'react-dice-roll';
import {GameContext} from '../../../../services/Game/game.context';
import {styled} from '../../../../utils/stitches/breakpoints';

const Container = styled('div', {
	width: '100%',
	height: '100%',
	display: 'grid',
	placeItems: 'center',
	transition: 'all .25s ease',
});

interface Props {
	size: number;
}
export const Dice = ({size}: Props) => {
	const {game, gameEvents} = useContext(GameContext);
	if (!game) return null;

	const ref = useRef(null);

	const roll = () => {
		const dice = ref.current;
		if (!dice || !game.dice.ableToRoll) return;
		gameEvents.roll();
	};

	useEffect(() => {
		if (!game.dice.rollAnimation) return;
		const dice = ref.current as any;
		dice.rollDice();
	}, [game]);

	return (
		<Container
			className={`dice-${
				game.players.find(({socketId}) => socketId === game.current)?.color
			}`}
			onClick={roll}
		>
			<ReactDice
				ref={ref}
				disabled={true}
				onRoll={() => gameEvents.rollResult()}
				size={size}
				rollingTime={2000}
				cheatValue={game.dice?.result ?? undefined}
			/>
		</Container>
	);
};
