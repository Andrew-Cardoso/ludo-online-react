import {useEffect} from 'react';

export const useResizeObserver = (fn: () => any) => {
	useEffect(() => {
		window.addEventListener('resize', fn);
		return () => {
			window.removeEventListener('resize', fn);
		};
	});
};
