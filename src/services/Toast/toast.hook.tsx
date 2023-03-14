import {GiGiftOfKnowledge, GiPodiumWinner, GiSurprisedSkull, GiTemplarShield} from 'react-icons/gi';
import {toast, ToastOptions} from 'react-toastify';

type Seconds = number;

type ToastVariants = 'info' | 'warning' | 'error' | 'success';
type ToastFunction = (
	type: ToastVariants,
	message: string | JSX.Element,
	overrideCloseTime?: Seconds,
) => void;
type ToastHook = () => Toast;

const IconsEnum: Record<ToastVariants, JSX.Element> = {
	info: <GiGiftOfKnowledge size='2rem' />,
	warning: <GiTemplarShield size='2rem' />,
	error: <GiSurprisedSkull size='2rem' />,
	success: <GiPodiumWinner size='2rem' />,
};

export type Toast = ToastFunction;

export const useToast: ToastHook = () => (type, message, overrideCloseTime) => {
	const options: ToastOptions = {
		className: `toast ${type}`,
		icon: IconsEnum[type],
		progressClassName: 'progress',
		toastId: type + message.toString().replace(/\s/g, '_'),
	};

	if (overrideCloseTime) options.autoClose = overrideCloseTime * 1000;
	toast(message, options);
};
