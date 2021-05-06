window.onload = function () {
    var gamepadConnected = false;
    var connectedGamepads = {};
    window.addEventListener('gamepadconnected', function () { return (gamepadConnected = true); });
    window.addEventListener('gamepaddisconnected', function () { return (gamepadConnected = false); });
    var renderAxes = function (axes, gasValue, breakValue) {
        var leftArrow = document.getElementById('reader-left-arrow-fill');
        var rightArrow = document.getElementById('reader-right-arrow-fill');
        var upArrow = document.getElementById('reader-up-arrow-fill');
        var downArrow = document.getElementById('reader-down-arrow-fill');
        if (gasValue) {
            upArrow.style.height = gasValue * 100 + "%";
        }
        else {
            upArrow.style.height = "0%";
        }
        if (breakValue) {
            downArrow.style.height = breakValue * 100 + "%";
        }
        else {
            downArrow.style.height = "0%";
        }
        axes.forEach(function (axis, index) {
            var indexToLabel = {
                0: 'horizontal',
            };
            if (indexToLabel[index]) {
                var percentageValue = Math.abs(axis * 100);
                if (indexToLabel[index] === 'horizontal') {
                    if (axis > 0.1 || axis < -0.1) {
                        if (axis < 0) {
                            rightArrow.style.width = '0%';
                            leftArrow.style.width = percentageValue + "%";
                        }
                        else {
                            leftArrow.style.width = '0%';
                            rightArrow.style.width = percentageValue + "%";
                        }
                    }
                    else {
                        rightArrow.style.width = '0%';
                        leftArrow.style.width = '0%';
                    }
                }
            }
        });
    };
    var addGamepad = function (gamepad) {
        connectedGamepads[gamepad.index] = gamepad;
        renderAxes(gamepad.axes, gamepad.buttons[7].value, gamepad.buttons[6].value);
        gamepad.hapticActuators;
    };
    var gameLoop = function () {
        //@ts-ignore
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        var gamepadsIterable = Object.keys(gamepads).map(function (key) { return gamepads[key]; }).filter(function (item) { return item !== null; });
        gamepadsIterable.forEach(addGamepad);
        window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
};
//# sourceMappingURL=script.js.map