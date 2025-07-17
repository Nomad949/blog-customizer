import { useEffect } from 'react';

type Props = {
	isOpen: boolean;
	ref: React.RefObject<HTMLElement>;
	close: () => void;
};

export const useClose = ({ isOpen, ref, close }: Props) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClose = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				close();
			}
		};

		document.addEventListener('mousedown', handleClose);

		return () => {
			document.removeEventListener('mousedown', handleClose);
		};
	}, [isOpen]);
};
