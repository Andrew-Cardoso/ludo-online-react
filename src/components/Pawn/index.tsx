import {ColorEnum} from '../../services/Game/interfaces/colors';
import {styled} from '../../utils/stitches/breakpoints';
import {ReactProps} from '../../utils/types/react-props';

const Container = styled('section', {
	maxWidth: '100%',
	maxHeight: '100%',
	minWidth: '2.5rem',
	minHeight: '2.5rem',
	transition: 'all 250ms cubic-bezier(0.01,-0.59, 0.97, 1.33)',
});

const PawnArea = styled('article', {
	transition: 'all 250ms cubic-bezier(0.01,-0.59, 0.97, 1.33)',
	position: 'relative',
	width: '100%',
	height: '100%',
	' > header::after': {
		background: 'radial-gradient(white, currentColor)',
	},
	' > header': {
		backgroundColor: 'currentColor',
	},
	' > section': {
		backgroundColor: 'currentColor',
	},
	' > footer': {
		backgroundColor: 'currentColor',
	},
	variants: {
		shadow: {
			true: {
				filter: 'drop-shadow(0 0 .25rem black) drop-shadow(0 0 2rem black) drop-shadow(0 0 .1rem black)',
			},
			false: {},
		},
		color: {
			[ColorEnum.GREEN]: {
				color: 'var(--game-green)',
			},
			[ColorEnum.BLUE]: {
				color: 'var(--game-blue)',
			},
			[ColorEnum.RED]: {
				color: 'var(--game-red)',
			},
			[ColorEnum.YELLOW]: {
				color: 'var(--game-yellow)',
			},
		},
		highlight: {
			true: {
				scale: '1.1',
				filter: 'drop-shadow(0 0 1rem currentColor) drop-shadow(0 0 .25rem currentColor) drop-shadow(0 0 2rem currentColor) !important',
			},
			false: {
				scale: '0.9',
				filter: 'brightness(0.75) opacity(0.75)',
			},
			none: {},
		},
		clickable: {
			true: {
				cursor: 'pointer',
				'&:hover': {
					scale: '1.2',
					filter: 'drop-shadow(0 0 .25rem black) !important',
					zIndex: '1000',
				},
			},
			false: {
				cursor: 'default',
				pointerEvents: 'none',
			},
		},
		gameEventHighlight: {
			true: {
				scale: '1.1',
				zIndex: '1000',
				filter: 'drop-shadow(0 0 .5rem white) drop-shadow(0 0 .25rem white) !important',
			},
			false: {},
		},
	},
});

const Head = styled('header', {
	aspectRatio: '1/1',
	height: '33%',
	width: '33%',
	borderRadius: '50%',
	position: 'absolute',
	top: '0',
	left: 'calc(50% - 33% / 2)',
	zIndex: '1',
});

const Body = styled('section', {
	position: 'absolute',
	top: '20%',
	left: 'calc(50% - 25% / 2)',
	clipPath:
		'polygon(70% 0, 72% 40%, 76% 60%, 84% 87%, 100% 100%, 0 100%, 17% 89%, 28% 59%, 36% 20%, 35% 0)',
	height: 'calc(80% - .25rem)',
	width: '25%',
	borderRadius: '1rem',
	zIndex: '1',
});

const Footer = styled('footer', {
	position: 'absolute',
	width: '33%',
	aspectRatio: '2.5 / 1',
	borderRadius: '50%',
	bottom: '0',
	left: 'calc(50% - 33% / 2)',
	zIndex: '1',
});

const Karyogamy = styled('small', {
	position: 'absolute',
	top: 'calc(33% / 2 - .4rem)',
	left: 'calc(50%)',
	transform: 'translateX(-50%)',
	display: 'none',
	color: 'white',
	fontSize: '.8rem',
	fontWeight: '500',
});

interface Props extends ReactProps<'article'> {
	color: ColorEnum;
	shadow?: boolean;
	gameEventHighlight?: boolean;
	highlight?: boolean;
	mini?: boolean;
	action?: () => any;
}
export const Pawn = ({
	color,
	action,
	highlight,
	gameEventHighlight,
	style,
	mini,
	shadow,
	...props
}: Props) => {
	const overrideStyles = mini
		? {width: '4rem', height: '4rem', position: 'relative'}
		: {position: 'absolute'};
	return (
		<Container {...props} style={{...(style ?? {}), ...(overrideStyles as any)}}>
			<PawnArea
				color={color}
				onClick={action ? action : () => {}}
				clickable={!!action}
				highlight={typeof highlight === 'undefined' ? 'none' : highlight}
				gameEventHighlight={gameEventHighlight ?? false}
				shadow={shadow ?? false}
			>
				<Head />
				<Body />
				<Footer />
				<Karyogamy />
			</PawnArea>
		</Container>
	);
};
