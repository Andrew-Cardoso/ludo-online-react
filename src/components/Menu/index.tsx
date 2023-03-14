import {useContext, useState} from 'react';
import {createPortal} from 'react-dom';
import {GiDiceFire, GiKeyCard, GiReturnArrow} from 'react-icons/gi';
import InputMask from 'react-input-mask';
import {GameContext} from '../../services/Game/game.context';
import {styled} from '../../utils/stitches/breakpoints';
import {Backdrop} from '../Game/Board/WaitingPlayers';

const Container = styled('article', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	padding: '1rem',
});

const Item = styled('a', {
	width: '100%',
	height: 'auto',
	display: 'grid',
	gridTemplateColumns: '4rem 1fr',
	gridTemplateRows: '1fr',
	alignContent: 'center',
	alignItems: 'center',
	justifyContent: 'flex-start',
	justifyItems: 'flex-start',
	transition: 'color 150ms ease, transform 150ms ease',
	color: 'var(--text-light-secondary)',
	textDecoration: 'none',
	padding: '1rem 2rem',
	borderRadius: '19% 81% 10% 90% / 86% 19% 81% 14% ',
	backgroundColor: 'var(--background-secondary)',

	'&:hover': {
		color: 'var(--text-light)',
		transform: 'scale(1.1)',
	},
});

const Modal = styled(Backdrop, {
	gridTemplateColumns: '1fr',
	gridTemplateRows: '1fr',
	backdropFilter: 'blur(2px)',
});

const ModalContainer = styled('div', {
	display: 'flex',
	flexFlow: 'column',
	gap: '2rem',
	paddingTop: '4rem',
});

const Label = styled('label', {
	color: 'var(--text-light-secondary)',
	textAlign: 'center',
	fontSize: '1.5rem',
	filter: 'drop-shadow(0 0 .05urem currentColor)',
});

const Button = styled('button', {
	color: 'var(--text-light-secondary)',
	backgroundColor: 'transparent',
	width: '4rem',
	height: '4rem',
	display: 'grid',
	placeItems: 'center',
	borderRadius: '50%',
	cursor: 'pointer',
	'> svg': {
		transition: 'color 150ms ease, transform 150ms ease',
	},
	'&:hover > svg': {
		color: 'var(--text-light)',
		transform: 'scale(1.1)',
	},
});

export const Menu = () => {
	const {gameEvents} = useContext(GameContext);
	const [show, toggle] = useState(false);

	const verifyId = async (id: string) => {
		if (id.length !== 36) return;
		gameEvents.join(id);
	};
	return (
		<Container>
			<Item role='button' onClick={() => gameEvents.start()}>
				<GiDiceFire size={48} />
				Create Game Room
			</Item>
			<Item role='button' onClick={() => toggle(true)}>
				<GiKeyCard size={48} />
				Enter Game Room
			</Item>
			{show
				? createPortal(
						<Modal>
							<ModalContainer>
								<Label>Enter the Room Id</Label>
								<InputMask
									className='input'
									mask='********-****-****-****-************'
									maskChar={null}
									onChange={({currentTarget}) => verifyId(currentTarget.value)}
								/>
								<Button onClick={() => toggle(false)}>
									<GiReturnArrow size={'2rem'} />
								</Button>
							</ModalContainer>
						</Modal>,
						document.getElementById('root')!,
				  )
				: null}
		</Container>
	);
};

/* 
GiCycle
GiDiceFire
*/
