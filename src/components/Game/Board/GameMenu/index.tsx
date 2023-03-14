import {useContext, useState} from 'react';
import {createPortal} from 'react-dom';
import {GiHangingSign, GiReturnArrow} from 'react-icons/gi';
import {GameContext} from '../../../../services/Game/game.context';
import {useToast} from '../../../../services/Toast/toast.hook';
import {styled} from '../../../../utils/stitches/breakpoints';
import {Backdrop} from '../WaitingPlayers';

const Button = styled('button', {
	padding: '.25rem',
	border: 'none',
	outline: 'none',
	background: 'none',
	color: 'var(--text-light)',
	cursor: 'pointer',
	filter: 'drop-shadow(0 0 0.1rem currentColor) drop-shadow(0 0 0.25rem black)',
	transition: 'all .2s ease-in-out',
	'&:hover': {
		color: 'var(--text-light-secondary)',
	},
});

const Modal = styled(Backdrop, {
	gridTemplateColumns: '1fr',
	gridTemplateRows: '1fr 6rem',
	backdropFilter: 'blur(8px)',
	backgroundColor: '#000C',
});

const ActionContainer = styled('section', {
	display: 'flex',
	flexFlow: 'column',
});
const GoBackContainer = styled('footer', {
	display: 'flex',
	width: '100%',
	height: '100%',
	justifyContent: 'flex-end',
	alignItems: 'center',
	paddingRight: '2rem',
});

const Info = styled('article', {
	color: 'var(--text-light)',
	fontWeight: 'bold',
	fontSize: '1.5rem',
	'> span': {
		fontWeight: 'normal',
		color: 'var(--text-light-secondary)',
		filter: 'drop-shadow(0 0 .05rem currentColor)',
		textTransform: 'uppercase',
	},
});
export const GameMenu = ({mini}: {mini: boolean}) => {
	const [open, toggle] = useState(false);
	const {game} = useContext(GameContext);
	const toast = useToast();
	if (!game) return null;

	const copy = async () => {
		if (!('clipboard' in navigator)) return;
		await navigator.clipboard.writeText(game.id);
		toast('info', 'Game ID copied to clipboard');
	};

	return (
		<>
			<Button onClick={() => toggle(true)}>
				<GiHangingSign size={mini ? '2.5rem' : '4rem'} />
			</Button>
			{open &&
				createPortal(
					<Modal>
						<ActionContainer>
							<Info onClick={copy}>
								Game ID: <span>{game.id}</span>
							</Info>
						</ActionContainer>
						<GoBackContainer>
							<Button onClick={() => toggle(false)}>
								<GiReturnArrow size={'3rem'} />
							</Button>
						</GoBackContainer>
					</Modal>,
					document.getElementById('root')!,
				)}
		</>
	);
};
