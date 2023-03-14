import {useContext} from 'react';
import {GameContext} from '../../../../services/Game/game.context';
import {ColorEnum} from '../../../../services/Game/interfaces/colors';
import {Player} from '../../../../services/Game/interfaces/player';
import {styled} from '../../../../utils/stitches/breakpoints';

const Container = styled('aside', {
	width: '100%',
	height: '100%',
	display: 'flex',
	gap: '1rem',
	padding: '1rem',
	flexFlow: 'column',
	variants: {
		playerColor: {
			[ColorEnum.RED]: {
				alignItems: 'flex-end',
				p: {
					color: 'var(--text-light)',
				},
				span: {
					color: 'var(--game-red)',
				},
			},
			[ColorEnum.BLUE]: {
				p: {
					color: 'var(--text-light)',
				},
				span: {
					color: 'var(--game-blue)',
				},
			},
			[ColorEnum.GREEN]: {
				justifyContent: 'flex-end',
				p: {
					color: 'var(--text-light)',
				},
				span: {
					color: 'var(--game-green)',
				},
			},
			[ColorEnum.YELLOW]: {
				alignItems: 'flex-end',
				justifyContent: 'flex-end',
				p: {
					color: 'var(--text-light)',
				},
				span: {
					color: 'var(--game-yellow)',
				},
			},
		},
		vertical: {
			true: {
				padding: '.25rem',
				gap: '.25rem',
			},
			false: {},
		},
	},
	compoundVariants: [
		{
			playerColor: ColorEnum.RED,
			vertical: true,
			css: {
				alignItems: 'flex-start',
				justifyContent: 'flex-end',
			},
		},
		{
			playerColor: ColorEnum.BLUE,
			vertical: true,
			css: {
				alignItems: 'flex-end',
				justifyContent: 'flex-end',
			},
		},
		{
			playerColor: ColorEnum.YELLOW,
			vertical: true,
			css: {
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
			},
		},
		{
			playerColor: ColorEnum.GREEN,
			vertical: true,
			css: {
				alignItems: 'flex-end',
				justifyContent: 'flex-start',
			},
		},
	],
});

const Text = styled('p', {
	fontSize: '1.5rem',
	fontWeight: 'bold',
	margin: 0,
	padding: 0,
	textTransform: 'capitalize',
});

interface Props {
	color?: ColorEnum;
	vertical: boolean;
}
export const PlayerInfo = ({color, vertical}: Props) => {
	// const {game} = useContext(GameContext);
	if (!color) return null;
	return (
		<Container playerColor={color} vertical={vertical}>
			<Text>
				player: <span>{color}</span>
			</Text>
		</Container>
	);
};
