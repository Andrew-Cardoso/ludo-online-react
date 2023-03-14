import {useContext, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {GameContext} from '../../services/Game/game.context';
import {ColorEnum, colors} from '../../services/Game/interfaces/colors';
import {useResizeObserver} from '../../services/Resize/resize.hook';
import {styled} from '../../utils/stitches/breakpoints';
import {Pawn} from '../Pawn';

const OuterContainer = styled('section', {
	display: 'grid',
	gridTemplateColumns: '1fr',
	gridTemplateRows: '6rem 1fr',
	width: '100%',
	height: '100%',
	placeItems: 'center',
});

const Container = styled('section', {
	gap: '2rem',
	padding: '1rem',
	width: '100%',
	height: '100%',
	placeItems: 'center',
	display: 'grid',
	gridTemplateRows: '1fr 1fr',
	gridTemplateColumns: '1fr 1fr',
});

const Title = styled('h1', {
	marginTop: '2rem',
	fontSize: '2rem',
});

const calculateSize = (): ColorPositionSize => {
	const record = {} as ColorPositionSize;

	for (const color of colors) {
		const el = document.getElementById(`choose-pawn-container-${color}`);
		if (!el) {
			record[color] = {
				left: 0,
				size: 0,
				top: 0,
			};
			continue;
		}

		const {left, top, width, height} = el.getBoundingClientRect();
		const size = Math.min(width, height);

		const leftOffset = (width - size) / 2;
		const topOffset = (height - size) / 2;

		record[color] = {
			size,
			left: left + leftOffset,
			top: top + topOffset,
		};
	}

	return record;
};

const PawnContainer = styled('article', {
	width: '100%',
	height: '100%',
});

type ColorPositionSize = Record<ColorEnum, {size: number; top: number; left: number}>;

export const ChoosePawn = () => {
	const {game, gameEvents} = useContext(GameContext);
	const [rect, setRect] = useState<ColorPositionSize | null>(null);
	useResizeObserver(() => {
		setRect(calculateSize());
	});

	useEffect(() => {
		setRect(calculateSize());
	}, []);

	return (
		<>
			<OuterContainer>
				<Title>Choose your Pawn</Title>
				<Container>
					{colors.map((color) => (
						<PawnContainer
							key={`container-${color}`}
							id={`choose-pawn-container-${color}`}
						></PawnContainer>
					))}
				</Container>
			</OuterContainer>
			{createPortal(
				<>
					{colors.map((color) =>
						game?.players.every((p) => p.color !== color) ? (
							<Pawn
								key={`pawn-${color}`}
								color={color}
								style={{
									width: rect?.[color].size,
									height: rect?.[color].size,
									top: rect?.[color].top,
									left: rect?.[color].left,
								}}
								action={() => gameEvents.chooseColor(color)}
							/>
						) : null,
					)}
				</>,
				document.getElementById('root')!,
			)}
		</>
	);
};
