import {styled} from './utils/stitches/breakpoints';
import {GameProvider} from './services/Game/game.context';
import {Game} from './components/Game';

const Container = styled('div', {
	width: '100%',
	height: '100%',
	display: 'grid',
	placeItems: 'center',
});

export const App = () => {
	return (
		<Container>
			<GameProvider>
				<Game />
			</GameProvider>
		</Container>
	);
};
