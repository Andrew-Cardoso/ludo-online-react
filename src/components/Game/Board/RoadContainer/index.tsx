import {useContext} from 'react';
import {GiBorderedShield, GiDoorway, GiSecretDoor} from 'react-icons/gi';
import {GameContext} from '../../../../services/Game/game.context';
import {ColorEnum} from '../../../../services/Game/interfaces/colors';

export const RoadContainer = ({color}: {color: ColorEnum}) => {
	const {game} = useContext(GameContext);
	if (!game) return null;

	return (
		<section className={`road-container-${color}`}>
			{game.board.road
				.filter((square) => color === square.color)
				.map(({id, entrance, exit, safeZone}) => (
					<article className='road-square' id={id} key={id}>
						{entrance ? (
							<GiDoorway />
						) : exit ? (
							<GiSecretDoor />
						) : safeZone ? (
							<GiBorderedShield />
						) : (
							''
						)}
					</article>
				))}
			{game.board.finalZone[color].slice(0, 5).map((square) => (
				<article className='final-square' key={square.id} id={square.id}></article>
			))}
		</section>
	);
};
