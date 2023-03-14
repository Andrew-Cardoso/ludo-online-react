import {memo} from 'react';
import {styled} from '../../utils/stitches/breakpoints';
import {ColorVariant} from '../../utils/types/color-variant';
import {ElementSize} from '../../utils/types/element-size';
import {ReactProps} from '../../utils/types/react-props';

const StyledButton = styled('button', {
	color: 'var(--text-light)',
	display: 'flex',
	placeItems: 'center',
	gap: '1rem',
	boxShadow: 'none',
	outline: 'none',
	border: 'none',
	borderRadius: 'var(--default-border-radius)',
	transition: 'filter .2s ease, color .2s ease',
	cursor: 'pointer',
	variants: {
		position: {
			left: {
				marginRight: 'auto',
			},
			right: {
				marginLeft: 'auto',
			},
			center: {
				margin: '0 auto',
			},
			default: {},
		},
		variant: {
			primary: {
				backgroundColor: 'var(--color-primary)',
			},
			info: {
				backgroundColor: 'var(--color-info)',
			},
			default: {
				backgroundColor: 'var(--color-default)',
			},
			success: {
				backgroundColor: 'var(--color-success)',
			},
			warning: {
				backgroundColor: 'var(--color-warning)',
			},
			danger: {
				backgroundColor: 'var(--color-danger)',
			},
			invert: {
				backgroundColor: '#0000',
				color: 'var(--text-light)',
				'&:hover': {
					color: 'var(--text-light-secondary)',
				},
			},
			link: {
				backgroundColor: 'transparent',
				color: 'var(--text-light-secondary)',
				display: 'inline-block',
				transition: 'color 150ms ease, transform 150ms ease',
				transformOrigin: 'left',

				'&:hover': {
					transform: 'scale(1.05)',
					color: 'var(--text-light)',
					filter: 'none',
				},
			},
		},
		size: {
			xsm: {
				padding: '.3125rem',
				display: 'inline-block',
			},
			sm: {
				fontSize: '.9rem',
				padding: '.5rem 1rem',
			},
			md: {
				fontSize: '.9rem',
				padding: '.75rem 1.88rem',
				'@smartphone': {
					padding: '.5rem 1.2rem',
				},
			},
			lg: {
				padding: '1rem 2.5rem',
			},
		},
		icon: {
			true: {
				paddingTop: '0',
				paddingBottom: '0',
				display: 'flex',
				placeItems: 'center',
			},
		},
	},
	'&:not(:disabled):hover': {
		filter: 'brightness(1.1)',
	},
	'&:disabled': {
		filter: 'brightness(.85)',
		cursor: 'not-allowed',
	},
	compoundVariants: [
		{
			icon: true,
			css: {
				paddingTop: '0',
				paddingBottom: '0',
			},
		},
		{
			icon: true,
			size: 'md',
			css: {
				padding: '0 1rem',
				'@smartphone': {
					padding: '.75rem',
				},
			},
		},
		{
			size: 'md',
			variant: 'link',
			css: {
				fontSize: '1.05rem',
			},
		},
		{
			size: 'sm',
			variant: 'link',
			css: {
				fontSize: '.95rem',
			},
		},
		{
			variant: 'link',
			css: {
				padding: '.125rem',
			},
		},
		{
			variant: 'invert',
			css: {
				fontSize: '.95rem',
			},
		},
	],
});

interface Props extends ReactProps<'button'> {
	position?: 'left' | 'right' | 'center';
	size?: ElementSize;
	icon?: boolean;
	variant?: ColorVariant | 'link' | 'invert';
	type?: 'button' | 'submit' | 'reset';
}
const ButtonComponent = ({variant, size, position, icon, type, ...props}: Props) => (
	<StyledButton
		type={type ?? 'button'}
		variant={variant ?? 'default'}
		size={size ?? 'md'}
		icon={icon}
		position={position ?? 'default'}
		{...props}
	/>
);

export const Button = memo(ButtonComponent);
