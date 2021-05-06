window.onload = () => {
	let gamepadConnected = false;
	const connectedGamepads = {};

	window.addEventListener('gamepadconnected', () => (gamepadConnected = true))
	window.addEventListener('gamepaddisconnected', () => (gamepadConnected = false))

	const renderAxes = (axes: readonly number[], gasValue: number, breakValue: number) => {
		const leftArrow = document.getElementById('reader-left-arrow-fill');
		const rightArrow = document.getElementById('reader-right-arrow-fill');
		const upArrow = document.getElementById('reader-up-arrow-fill');
		const downArrow = document.getElementById('reader-down-arrow-fill');

		if (gasValue) {
			upArrow.style.height = `${gasValue * 100}%`;
		} else {
			upArrow.style.height = `0%`;
		}

		if (breakValue) {
			downArrow.style.height = `${breakValue * 100}%`;
		} else {
			downArrow.style.height = `0%`;
		}

		axes.forEach((axis, index) => {
			const indexToLabel = {
				0: 'horizontal',
			}
			if (indexToLabel[index]) {
				const percentageValue = Math.abs(axis * 100)

				if (indexToLabel[index] === 'horizontal') {
					if (axis > 0.1 || axis < -0.1) {
						if (axis < 0) {
							rightArrow.style.width = '0%';

							leftArrow.style.width = `${percentageValue}%`;
						} else {
							leftArrow.style.width = '0%';

							rightArrow.style.width = `${percentageValue}%`;
						}
					} else {
						rightArrow.style.width = '0%';
						leftArrow.style.width = '0%';
					}
				}
			}
		})
	}

	const addGamepad = (gamepad: Gamepad) => {
		connectedGamepads[gamepad.index] = gamepad;

		renderAxes(gamepad.axes, gamepad.buttons[7].value, gamepad.buttons[6].value)
		gamepad.hapticActuators
	}

	const gameLoop = () => {
		//@ts-ignore
		const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		const gamepadsIterable: Gamepad[] = Object.keys(gamepads).map(key => gamepads[key]).filter(item => item !== null);

		gamepadsIterable.forEach(addGamepad)

		window.requestAnimationFrame(gameLoop)
	}

	gameLoop();
}