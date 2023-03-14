import {useContext} from 'react';
import {GiLaurelCrown} from 'react-icons/gi';
import {GameContext} from '../../../../services/Game/game.context';
import {ColorEnum, colors} from '../../../../services/Game/interfaces/colors';
import {styled} from '../../../../utils/stitches/breakpoints';

const FinalPlace = styled('div', {
	variants: {
		color: {
			[ColorEnum.RED]: {
				right: '-25%',
				bottom: 0,
				width: '100%',
			},
			[ColorEnum.BLUE]: {
				left: '-25%',
				bottom: 0,
				width: '100%',
			},
			[ColorEnum.GREEN]: {
				left: '-25%',
				top: 0,
				width: '100%',
			},
		},
	},
});

const colorsOrdered = [ColorEnum.RED, ColorEnum.BLUE, ColorEnum.YELLOW, ColorEnum.GREEN];

export const Podium = () => {
	const {game} = useContext(GameContext);
	if (!game) return null;
	return (
		<article className='podium-container'>
			{colorsOrdered.map((color) => (
				<section className={`podium-${color}`} key={`podium-${color}`}>
					<FinalPlace id={`final-${color}-5`} />
					<GiLaurelCrown
						style={{
							filter: 'drop-shadow(0 0 0.25rem #000)',
							transition: 'opacity 0.5s',
							opacity:
								game.board.pawns[color].filter((p) => p.endReached).length * 0.25,
						}}
					/>
				</section>
			))}
		</article>
	);
};
