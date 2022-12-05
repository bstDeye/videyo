import React from "react";

/**
 *
 * @param defaultState initial state of modal (open or not)
 */
export function useModal(defaultState: boolean) {
	const [state, setOpen] = React.useState<boolean>(defaultState);

	const open = (e?: any) => {
		e?.stopPropagation();
		if (!state) {
			setOpen(true);
		}
	};
	const close = (e?: any) => {
		e?.stopPropagation();
		if (state) {
			setOpen(false);
		}
	};

	return {
		open: state,
		setOpen: open,
		setClose: close,
	};
}
