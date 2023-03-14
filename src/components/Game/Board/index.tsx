import {CSSProperties, useEffect, useState} from 'react';
import {ColorEnum} from '../../../services/Game/interfaces/colors';
import {InitialArea} from './InitialArea';
import {RoadContainer} from './RoadContainer';
import {Podium} from './Podium';
import {useResizeObserver} from '../../../services/Resize/resize.hook';
import {BoardPawns} from './BoardPawns';
import {WaitingPlayers} from './WaitingPlayers';
import {Dice} from './Dice';
import {PlayerInfo} from './PlayerInfo';
import {styled} from '../../../utils/stitches/breakpoints';
import {GameMenu} from './GameMenu';
import './index.css';
import {WinScreen} from './WinScreen';

const Container = styled('div', {
	position: 'relative',
	display: 'grid',
	width: '100%',
	height: '100%',
	variants: {
		diceOnTop: {
			true: {
				' > :last-child': {
					alignContent: 'flex-start',
				},
			},
			false: {},
		},
	},
});

const InfoContainer = styled('div', {
	display: 'grid',
	placeItems: 'center',
	width: '100%',
	height: '100%',

	variants: {
		gridVertical: {
			true: {
				gridTemplateColumns: '1fr 3rem 1fr',
				gridTemplateRows: '1fr',
				alignItems: 'flex-end',
			},
			false: {
				gridTemplateColumns: '1fr',
				gridTemplateRows: '1fr 2fr 1fr',
			},
		},
		twoColumns: {
			true: {},
			false: {},
		},
	},
	compoundVariants: [
		{
			gridVertical: true,
			twoColumns: true,
			css: {
				gridTemplateColumns: '1fr 1fr',
			},
		},
	],
});

export const Board = () => {
	const [style, setStyle] = useState<CSSProperties>({});
	const [boardSize, setBoardSize] = useState(0);
	const [diceSize, setDiceSize] = useState(0);
	const [gridVertical, setGridVertical] = useState(false);
	const [colorOrder, setColorOrder] = useState<ColorEnum[]>([]);

	const updateDiceSize = () => {
		const minSize = 80;
		const possibleHeight = boardSize / 3;
		const possibleWidth = (window.innerWidth - boardSize) / 2;

		setDiceSize(Math.max(Math.min(possibleHeight, possibleWidth), minSize));
	};

	const updateBoardSize = {
		height: () => {
			const fullHeight = window.innerHeight;
			setStyle({
				gridTemplateColumns: `1fr ${fullHeight}px 1fr`,
				gridTemplateRows: `1fr`,
			});
			setBoardSize(fullHeight);
			setColorOrder([ColorEnum.RED, ColorEnum.YELLOW, ColorEnum.BLUE, ColorEnum.GREEN]);
			setGridVertical(false);
		},
		width: () => {
			const fullWidth = window.innerWidth;
			setStyle({
				gridTemplateRows: `1fr ${fullWidth}px min-content 1fr`,
				gridTemplateColumns: `1fr`,
			});
			setBoardSize(fullWidth);
			setColorOrder([ColorEnum.RED, ColorEnum.BLUE, ColorEnum.YELLOW, ColorEnum.GREEN]);
			setGridVertical(true);
		},
	};

	useEffect(() => {
		const aspectOn = window.innerWidth < window.innerHeight ? 'width' : 'height';
		updateBoardSize[aspectOn]();
	}, []);

	useResizeObserver(() => {
		const aspectOn = window.innerWidth < window.innerHeight ? 'width' : 'height';
		updateBoardSize[aspectOn]();
	});

	useEffect(() => {
		updateDiceSize();
	}, [boardSize]);

	return (
		<>
			<Container style={style} diceOnTop={gridVertical}>
				<InfoContainer gridVertical={gridVertical}>
					<PlayerInfo color={colorOrder[0]} vertical={gridVertical} />
					<GameMenu mini={gridVertical} />
					<PlayerInfo color={colorOrder[1]} vertical={gridVertical} />
				</InfoContainer>
				<main id='board' style={{width: boardSize, height: boardSize}}>
					<section>
						<InitialArea color={ColorEnum.RED} />
						<RoadContainer color={ColorEnum.BLUE} />
						<InitialArea color={ColorEnum.BLUE} />
					</section>
					<section className='middle-road'>
						<RoadContainer color={ColorEnum.RED} />
						<Podium />
						<RoadContainer color={ColorEnum.GREEN} />
					</section>
					<section>
						<InitialArea color={ColorEnum.YELLOW} />
						<RoadContainer color={ColorEnum.YELLOW} />
						<InitialArea color={ColorEnum.GREEN} />
					</section>
					<BoardPawns />
				</main>
				<InfoContainer gridVertical={gridVertical} twoColumns={true}>
					<PlayerInfo color={colorOrder[2]} vertical={gridVertical} />
					{gridVertical ? null : <Dice size={diceSize} />}
					<PlayerInfo color={colorOrder[3]} vertical={gridVertical} />
				</InfoContainer>
				{gridVertical ? <Dice size={diceSize} /> : null}
			</Container>
			<WaitingPlayers />
			<WinScreen />
		</>
	);
};
