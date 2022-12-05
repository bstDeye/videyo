import React from "react";

export function useMenu() {
	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);

	const handleContextMenu = React.useCallback((event: React.MouseEvent) => {
		event.preventDefault();
		setContextMenu((contextMenu) =>
			contextMenu === null
				? {
					mouseX: event.clientX - 2,
					mouseY: event.clientY - 4,
				}
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
			      // Other native context menus might behave different.
			      // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
				null,
		);
	}, []);

	const handleClose = React.useCallback(() => {
		setContextMenu(null);
	}, []);

	return {
		open: contextMenu !== null,
		position: contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined,
		closeMenu: handleClose,
		onContextMenu: handleContextMenu,
	};
}

