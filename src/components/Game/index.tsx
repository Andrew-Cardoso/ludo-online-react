import {Menu} from '../Menu';
import {useContext} from 'react';
import {GameContext} from '../../services/Game/game.context';
import {ChoosePawn} from '../ChoosePawn';
import {Board} from './Board';

export const Game = () => {
	const {game, playerId} = useContext(GameContext);
	return !game ? (
		<Menu />
	) : game.players.some(({color, socketId}) => socketId === playerId && !color) ? (
		<ChoosePawn />
	) : (
		<Board />
	);
};
