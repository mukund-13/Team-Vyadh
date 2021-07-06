// // Remove console.log() functions in final build

// Variables and functions to hide/display auto/manual Arm Control
const arm_auto = document.getElementById("arm-auto");
const arm_manual = document.getElementById("arm-manual");
const wheels_HALT = document.getElementById("wheels-halt");
const arm_HALT = document.getElementById("arm-manual-halt");
const maxStraightPWM = document.getElementById("straightPWM");
const maxTurnPWM = document.getElementById("turnPWM");
document.getElementById("auto-radio").addEventListener("click", function() {
    arm_auto.style.display = "";
    arm_manual.style.display = "none";
});
document.getElementById("manual-radio").addEventListener("click", function() {
    arm_auto.style.display = "none";
    arm_manual.style.display = "";
});

// Initializing ROS
const ros = new ROSLIB.Ros();
ros.connect("ws://localhost:9090");
let ROSInterval;

ros.on("connection", function() {
    console.log("Connected");
    if (ROSInterval) { clearInterval(ROSInterval); }
});

ros.on("error", function(error) {
    console.log("Error connecting to websocket server: ", error);
    console.log("Retrying in 1 second");
    ROSInterval = setInterval(() => { ros.connect("ws://localhost:9090"); }, 1000);
});
ros.on("close", function() {
    console.log("Disconnected");
});

// // Controls for Rover Wheels
// // Initializing Publisher for Rover Wheel Control
const wheels = new ROSLIB.Topic({
    ros: ros,
    name: "/rover_wheels",
    messageType: "rover_control/rover_wheels"
});

let wheelsHALTInterval; // Intervalometer for Rover Wheel HALT Messages
let speedval = 255; // Default speed value (2 = Medium) for Rover Wheels

// // Rover Wheel Control Publisher Function

maxStraightPWM.addEventListener("blur", function() {
    let PWM = 100;
    if (/.*\D+.*/.test(this.value)) {
        alert("Incorrect PWM Value. Defaulting to 100");
        this.value = "100";
    } else {
        PWM = parseInt(this.value);
        if (PWM > 255) {
            alert("PWM values cannot be greater than 255");
            PWM = 255;
            this.value = "255";
        } else if (PWM < 30) {
            alert("PWM too low! Setting to 30");
            PWM = 30;
            this.value = "30";
        }
    }
    wheels.publish(new ROSLIB.Message({
        action: 1,
        speed: PWM
    }));
});

maxTurnPWM.addEventListener("blur", function() {
    let PWM = 80;
    if (/.*\D+.*/.test(this.value)) {
        alert("Incorrect PWM Value. Defaulting to 80");
        this.value = "80";
    } else {
        PWM = parseInt(this.value);
        if (PWM > 255) {
            alert("PWM values cannot be greater than 255");
            PWM = 255;
            this.value = "255";
        } else if (PWM < 50) {
            alert("PWM too low! Setting to 50");
            PWM = 50;
            this.value = "50";
        }
    }
    wheels.publish(new ROSLIB.Message({
        action: 2,
        speed: PWM
    }));
});

function wheelsPublish(val) {
    clearInterval(wheelsHALTInterval);
    let PWM;
    if (val === 8 || val === 5) { PWM = parseInt(maxStraightPWM.value); } else { PWM = parseInt(maxTurnPWM.value); }
    wheels.publish(new ROSLIB.Message({
        action: val,
        speed: PWM
    }));
    console.log(val);
}

// // Rover Wheel HALT Message Definition
const wheelsHALTMessage = new ROSLIB.Message({
    action: 0,
    speed: 100
});

// // Function to keep sending HALT Messages for Rover Wheels at fixed interval (in ms)
function wheelsHALT() {
    wheelsHALTInterval = setInterval(function() {
        wheels.publish(wheelsHALTMessage);
        console.log(0);
    }, 10000);
}
wheelsHALT();

// // Function to be executed at Click/Key release for Rover Wheels
function wheels_stop() {
    wheels.publish(wheelsHALTMessage);
    console.log(0);
    clearInterval(wheelsHALTInterval); //Clear any previously running intervals
    wheelsHALT();
}

// // Function for Rover Wheels mouse control
const wheelsArrows = document.getElementsByClassName("wheels-arrow");
const wheelsAction = [8, 4, 5, 6];

for (let i = 0; i < 4; i++) {
    wheelsArrows[i].addEventListener("mousedown", function() {
        wheelsPublish(wheelsAction[i]);
    });
    wheelsArrows[i].addEventListener("mouseup", function() {
        wheels_stop();
    });
}

wheels_HALT.addEventListener("mousedown", function() {
    wheels.publish(wheels_HALT);
    console.log(0);
});

// // Controls for Robotic Arm
// // Initializing Publisher for Rover Wheel Control
const arm = new ROSLIB.Topic({
    ros: ros,
    name: "/rover_arm",
    messageType: "rover_control/arm_motors"
});

let armInterval;

const armClockWise = [document.getElementById("Q"), document.getElementById("W"), document.getElementById("E"), document.getElementById("R"), document.getElementById("T"), document.getElementById("Y")];
const armAntiClockWise = [document.getElementById("A"), document.getElementById("S"), document.getElementById("D"), document.getElementById("F"), document.getElementById("G"), document.getElementById("H")];
const armHALTMessage = new ROSLIB.Message({
    command_string: 1
});

function armPublisher(_command_string) {
    clearInterval(armInterval);
    arm.publish(new ROSLIB.Message({
        command_string: _command_string
    }));
    console.log(_command_string);
}

// // Function to keep sending HALT Messages for Rover Arm Motors at fixed interval (in ms)
function armHALT() {
    arm.publish(armHALTMessage);
    console.log("ARM HALT");
    armInterval = setInterval(function() {
        arm.publish(armHALTMessage);
        console.log("ARM HALT");
    }, 10000);
}
armHALT();

arm_HALT.addEventListener("mousedown", armHALT);

armClockWise[0].addEventListener("mousedown", function() {
    armPublisher(2728);
});
armClockWise[0].addEventListener("mouseup", function() {
    armHALT();
});
armClockWise[1].addEventListener("mousedown", function() {
    armPublisher(2722);
});
armClockWise[1].addEventListener("mouseup", function() {
    armHALT();
});
armClockWise[2].addEventListener("mousedown", function() {
    armPublisher(2698);
});
armClockWise[2].addEventListener("mouseup", function() {
    armHALT();
});
armClockWise[3].addEventListener("mousedown", function() {
    armPublisher(2602);
});
armClockWise[3].addEventListener("mouseup", function() {
    armHALT();
});
armClockWise[4].addEventListener("mousedown", function() {
    armPublisher(2218);
});
armClockWise[4].addEventListener("mouseup", function() {
    armHALT();
});
armClockWise[5].addEventListener("mousedown", function() {
    armPublisher(682);
});
armClockWise[5].addEventListener("mouseup", function() {
    armHALT();
});

armAntiClockWise[0].addEventListener("mousedown", function() {
    armPublisher(2732);
});
armAntiClockWise[0].addEventListener("mouseup", function() {
    armHALT();
});
armAntiClockWise[1].addEventListener("mousedown", function() {
    armPublisher(2738);
});
armAntiClockWise[1].addEventListener("mouseup", function() {
    armHALT();
});
armAntiClockWise[2].addEventListener("mousedown", function() {
    armPublisher(2762);
});
armAntiClockWise[2].addEventListener("mouseup", function() {
    armHALT();
});
armAntiClockWise[3].addEventListener("mousedown", function() {
    armPublisher(2858);
});
armAntiClockWise[3].addEventListener("mouseup", function() {
    armHALT();
});
armAntiClockWise[4].addEventListener("mousedown", function() {
    armPublisher(3242);
});
armAntiClockWise[4].addEventListener("mouseup", function() {
    armHALT();
});
armAntiClockWise[5].addEventListener("mousedown", function() {
    armPublisher(4778);
});
armAntiClockWise[5].addEventListener("mouseup", function() {
    armHALT();
});


// // onkeydown() function fires continuously while the key is pressed down.
// // Using flags to control that behaviour
let flag = false;

// // Function to call respective functions on key press
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        if (document.activeElement === maxStraightPWM) {
            maxStraightPWM.blur();
        } else if (document.activeElement === maxTurnPWM) {
            maxTurnPWM.blur();
        }
    }
    while (!flag && document.activeElement !== maxStraightPWM && document.activeElement !== maxTurnPWM) {
        flag = true;
        switch (event.keyCode) {
            // Rover Wheels Control
            case 37:
            case 100:
                wheelsArrows[1].classList.add("wheels-arrow-active");
                wheelsPublish(4);
                break;
            case 38:
            case 104:
                wheelsArrows[0].classList.add("wheels-arrow-active");
                wheelsPublish(8);
                break;
            case 39:
            case 102:
                wheelsArrows[3].classList.add("wheels-arrow-active");
                wheelsPublish(6);
                break;
            case 40:
            case 101:
            case 12:
                wheelsArrows[2].classList.add("wheels-arrow-active");
                wheelsPublish(5);
                break;
            case 32:
            case 48:
            case 96:
            case 45:
                wheels_HALT.classList.add("wheels-halt-active");
                wheels.publish(wheelsHALTMessage);
                console.log(0);
                break;
            case 81:
                armClockWise[0].classList.add("arm-manual-controls-active");
                armPublisher(2728);
                break;
            case 87:
                armClockWise[1].classList.add("arm-manual-controls-active");
                armPublisher(2722);
                break;
            case 69:
                armClockWise[2].classList.add("arm-manual-controls-active");
                armPublisher(2698);
                break;
            case 82:
                armClockWise[3].classList.add("arm-manual-controls-active");
                armPublisher(2602);
                break;
            case 84:
                if (!event.shiftKey) {
                    armClockWise[4].classList.add("arm-manual-controls-active");
                    armPublisher(2218);
                }
                break;
            case 89:
                armClockWise[5].classList.add("arm-manual-controls-active");
                armPublisher(682);
                break;
            case 65:
                armAntiClockWise[0].classList.add("arm-manual-controls-active");
                armPublisher(2732);
                break;
            case 83:
                if (!event.shiftKey) {
                    armAntiClockWise[1].classList.add("arm-manual-controls-active");
                    armPublisher(2738);
                }
                break;
            case 68:
                armAntiClockWise[2].classList.add("arm-manual-controls-active");
                armPublisher(2762);
                break;
            case 70:
                armAntiClockWise[3].classList.add("arm-manual-controls-active");
                armPublisher(2858);
                break;
            case 71:
                armAntiClockWise[4].classList.add("arm-manual-controls-active");
                armPublisher(3242);
                break;
            case 72:
                armAntiClockWise[5].classList.add("arm-manual-controls-active");
                armPublisher(4778);
                break;
        }
    }
});

// // Function to call respective functions on key release
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 83 && event.shiftKey) {
        maxStraightPWM.select();
    } else if (event.keyCode === 84 && event.shiftKey) {
        maxTurnPWM.select();
    } else if (document.activeElement !== maxStraightPWM && document.activeElement !== maxTurnPWM) {
        flag = false;
        switch (event.keyCode) {
            // Rover Wheels Control
            case 37:
            case 100:
                wheelsArrows[1].classList.remove("wheels-arrow-active");
                wheels_stop();
                break;
            case 38:
            case 104:
                wheelsArrows[0].classList.remove("wheels-arrow-active");
                wheels_stop();
                break;
            case 39:
            case 102:
                wheelsArrows[3].classList.remove("wheels-arrow-active");
                wheels_stop();
                break;
            case 40:
            case 101:
            case 12:
                wheelsArrows[2].classList.remove("wheels-arrow-active");
                wheels_stop();
                break;
            case 32:
            case 45:
            case 48:
            case 96:
                wheels_HALT.classList.remove("wheels-halt-active");
                break;
            case 81:
                armClockWise[0].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 87:
                armClockWise[1].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 69:
                armClockWise[2].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 82:
                armClockWise[3].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 84:
                armClockWise[4].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 89:
                armClockWise[5].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 65:
                armAntiClockWise[0].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 83:
                armAntiClockWise[1].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 68:
                armAntiClockWise[2].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 70:
                armAntiClockWise[3].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 71:
                armAntiClockWise[4].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
            case 72:
                armAntiClockWise[5].classList.remove("arm-manual-controls-active");
                armHALT();
                break;
        }
    }
});

// const listener = new ROSLIB.Topic({
//     ros: ros,
//     name: "/arm_sensor_listener1",
//     messageType: "sensor/R_ANGLES"
// });
// var comp1;
// var comp2;
// var roll2;
// var pitch2;
// var roll3;
// var pitch3;
// listener.subscribe(function(message) {
//     comp1 = parseFloat(message.heading_angle);
//     comp2 = comp1 - 54.6;
//     document.getElementById("compass_text1").innerHTML = "Yaw: " + comp1 + ".0°";
//     document.getElementById("compass_text2").innerHTML = "Yaw: " + comp2 + "°";
//     document.getElementById("needle1").style.transform = "rotate(" + comp1 + "deg)";
//     document.getElementById("needle2").style.transform = "rotate(" + comp2 + "deg)";
// });

// const listener2 = new ROSLIB.Topic({
//     ros: ros,
//     name: "/shoulder_angle1",
//     messageType: "sensor/Mpu"
// });

// listener2.subscribe(function(message) {
//     roll2 = message.Gy;
//     pitch2 = message.Ay;
//     document.getElementById("pitch2").innerHTML = Math.round(pitch2 * 10000) / 10000 + "°";
//     document.getElementById("roll2").innerHTML = Math.round(roll2 * 10000) / 10000 + "°";
// });

// const listener3 = new ROSLIB.Topic({
//     ros: ros,
//     name: "/elbow_angle1",
//     messageType: "sensor/Mpu"
// });

// listener3.subscribe(function(message) {
//     roll3 = message.Gy;
//     pitch3 = message.Ay;
//     document.getElementById("pitch3").innerHTML = Math.round(pitch3 * 10000) / 10000 + "°";
//     document.getElementById("roll3").innerHTML = Math.round(roll3 * 10000) / 10000 + "°";
//     document.getElementById("pitch1").innerHTML = Math.round((pitch3 + pitch2) * 10000) / 10000 + "°";
//     document.getElementById("roll1").innerHTML = Math.round((roll3 + pitch3) * 10000) / 10000 + "°";
// });

const compasses = [
    document.getElementById("compass0"),
    document.getElementById("compass1")
];
const needles = [
    document.getElementById("needle0"),
    document.getElementById("needle1")
];
const currentPos = [
    document.getElementById("current-position-x"),
    document.getElementById("current-position-y"),
    document.getElementById("current-position-z")
];
const currentPosLocks = [false, false, false, false, false, false]; //First 3 = weak locks (for hovers), Last 3 = hard locks (on value change)
const stepsRows = [
    document.getElementById("steps-x"),
    document.getElementById("steps-y"),
    document.getElementById("steps-z")
];
const customPos = [
    document.getElementById("custom-x"),
    document.getElementById("custom-y"),
    document.getElementById("custom-z")
];
const customPosLabel = [
    document.getElementById("custom-x-label"),
    document.getElementById("custom-y-label"),
    document.getElementById("custom-z-label")
];
const newPos = [
    document.getElementById("new-position-x"),
    document.getElementById("new-position-y"),
    document.getElementById("new-position-z")
];
let paused = false;
const pauseArm = document.getElementById("arm-auto-pause");
const resetArm = document.getElementById("arm-auto-reset");
const haltArm = document.getElementById("arm-auto-halt");
const submit = document.getElementById("submit");
const clickEvent = new Event("click");
const posChangeEvent = new Event("posChange");
const blurEvent = new Event("blur");
const newPosChangeEvent = new Event("newPosChange");
const positivePosChange = [false, false, false];

function resetNewPos(index) {
    newPos[index].value = currentPos[index].innerText;
    newPos[index].style.color = "";
}

function autoArmReset(resetButton = true) {
    if (resetButton) {
        for (let i = 0; i < 3; i++) {
            customPos[i].value = "";
            customPos[i].dispatchEvent(blurEvent);
            resetNewPos(i);
        }
    } else {
        for (let i = 0; i < 3; i++) {
            customPos[i].value = "";
            customPos[i].dispatchEvent(blurEvent);
            newPos[i].style.color = "";
            currentPosLocks[i] = false;
        }
        for (let i = 3; i < 6; i++) {
            currentPosLocks[i] = false;
        }
    }
}

function attachLocks(element, axis) {
    element.addEventListener("mouseover", function() {
        currentPosLocks[axis] = true;
    });
    element.addEventListener("mouseout", function() {
        if (document.activeElement !== element) {
            currentPosLocks[axis] = false;
        }
    });
}

submit.addEventListener("click", () => {
    autoArmReset(false);
});
resetArm.addEventListener("click", autoArmReset);
pauseArm.addEventListener("click", function() {
    if (!paused) {
        paused = true;
        for (let i = 3; i < 6; i++) {
            currentPosLocks[i] = true;
        }
        setTimeout(function() {
            pauseArm.firstElementChild.innerText = "RESUME";
            pauseArm.lastElementChild.firstElementChild.style.fill = "#049504";
        }, 100);
    } else {
        paused = false;
        for (let i = 0; i < 3; i++) {
            resetNewPos(i);
            currentPosLocks[i] = false;
        }
        for (let i = 3; i < 6; i++) {
            currentPosLocks[i] = false;
        }
        setTimeout(function() {
            pauseArm.firstElementChild.innerText = "PAUSE";
            pauseArm.lastElementChild.firstElementChild.style.fill = "orange";
        }, 100);
    }
});

for (let i = 0; i < 3; i++) {
    const STEPS = stepsRows[i].children;
    for (let j = 0; j < 6; j++) {
        let delta = undefined;
        switch (j) {
            case 0:
                delta = -10;
                break;
            case 1:
                delta = -5;
                break;
            case 2:
                delta = -1;
                break;
            case 3:
                delta = 1;
                break;
            case 4:
                delta = 5;
                break;
            case 5:
                delta = 10;
                break;
        }
        attachLocks(STEPS[j], i);
        STEPS[j].addEventListener("click", function() {
            currentPosLocks[i + 3] = true;
            let newVal = parseFloat(newPos[i].value) + delta;
            newPos[i].value = newVal;
            if (j < 3 && newVal < parseFloat(currentPos[i].innerText)) {
                positivePosChange[i] = false;
                newPos[i].dispatchEvent(newPosChangeEvent);
            } else if (j > 2 && newVal > parseFloat(currentPos[i].innerText)) {
                positivePosChange[i] = true;
                newPos[i].dispatchEvent(newPosChangeEvent);
            } else {
                newPos[i].style.color = "";
            }
        });
    }
    attachLocks(customPos[i], i);
    attachLocks(newPos[i], i);

    customPos[i].addEventListener("keyup", function(e) {
        if (e.keyCode !== 13) {
            if (this.value === "") {
                resetNewPos(i);
            } else {
                const delta = this.value;
                if (
                    /[^\d\.\-]/.test(delta) ||
                    /^[\d\.]+[-]/.test(delta) ||
                    (isNaN(parseFloat(delta)) && delta !== "-")
                ) {
                    this.value = "";
                    resetNewPos(i);
                } else {
                    currentPosLocks[i + 3] = true;
                    newPos[i].value = (
                        parseFloat(currentPos[i].innerText) + parseFloat(delta)
                    ).toFixed(2);
                    if (parseFloat(delta) > 0) {
                        positivePosChange[i] = true;
                    } else {
                        positivePosChange[i] = false;
                    }
                    newPos[i].dispatchEvent(newPosChangeEvent);
                }
            }
        } else {
            if (i < 2) {
                customPos[i + 1].focus();
            }
        }
    });

    newPos[i].addEventListener("keyup", function(e) {
        if (e.keyCode !== 13) {
            const val = this.value;
            if (
                /[^\d\.\-]/.test(val) ||
                /^[\d\.]+[-]/.test(val) ||
                (isNaN(parseFloat(val)) && val !== "-" && val !== "")
            ) {
                resetNewPos(i);
            } else {
                currentPosLocks[i + 3] = true;
                if (parseFloat(val) > parseFloat(currentPos[i].innerText)) {
                    positivePosChange[i] = true;
                    newPos[i].dispatchEvent(newPosChangeEvent);
                } else if (parseFloat(val) < parseFloat(currentPos[i].innerText)) {
                    positivePosChange[i] = false;
                    newPos[i].dispatchEvent(newPosChangeEvent);
                } else {
                    newPos[i].style.color = "";
                }
            }
        } else {
            submit.dispatchEvent(clickEvent);
        }
    });

    newPos[i].addEventListener("newPosChange", function() {
        if (positivePosChange[i]) {
            newPos[i].style.color = "forestgreen";
        } else {
            newPos[i].style.color = "crimson";
        }
    });

    currentPos[i].addEventListener("posChange", function() {
        if (this.change > 0) {
            this.style.color = "forestgreen";
        } else if (this.change < 0) {
            this.style.color = "crimson";
        }
        newPos[i].value = this.innerText;
    });

    setInterval(() => {
        if (!currentPosLocks[i + 3]) {
            if (!currentPosLocks[i]) {
                let initial = parseFloat(currentPos[i].innerText);
                let final = initial + Math.random() * 20 - 10;
                currentPos[i].change = final - initial;
                currentPos[i].innerText = final.toFixed(2);
                currentPos[i].dispatchEvent(posChangeEvent);
            }
        }
    }, 500);

    customPos[i].addEventListener("focus", function() {
        currentPosLocks[i] = true;
        customPosLabel[i].classList.add("custom-step-transition");
        setTimeout(() => {
            customPosLabel[i].style.left = customPos[i].offsetLeft + 5 + "px";
            customPosLabel[i].style.top =
                Math.ceil(
                    customPos[i].offsetTop +
                    customPos[i].offsetHeight / 2 -
                    customPosLabel[i].offsetHeight / 2
                ) -
                2 +
                "px";
        }, 100);
    });
    customPos[i].addEventListener("blur", function() {
        currentPosLocks[i] = false;
        if (customPos[i].value === "") {
            customPosLabel[i].classList.remove("custom-step-transition");
            setTimeout(() => {
                customPosLabel[i].style.left =
                    Math.ceil(
                        customPos[i].offsetLeft +
                        customPos[i].offsetWidth / 2 -
                        customPosLabel[i].offsetWidth / 2
                    ) + "px";
            }, 125);
        }
        setTimeout(() => {
            customPosLabel[i].style.top =
                Math.ceil(
                    customPos[i].offsetTop +
                    customPos[i].offsetHeight / 2 -
                    customPosLabel[i].offsetHeight / 2
                ) -
                2 +
                "px";
        }, 125);
    });
    newPos[i].addEventListener("focus", function() {
        currentPosLocks[i] = true;
    });
    newPos[i].addEventListener("blur", function() {
        currentPosLocks[i] = false;
        if (this.value === "") {
            resetNewPos(i);
            currentPosLocks[i + 3] = false;
        }
    });
}

function alignElements() {
    for (let i = 0; i < 2; i++) {
        needles[i].style.transform = "";
        needles[i].style.top =
            Math.ceil(
                compasses[i].offsetTop +
                compasses[i].offsetHeight / 2 -
                needles[i].offsetHeight / 2
            ) + "px";
        needles[i].style.left =
            Math.ceil(
                compasses[i].offsetLeft +
                compasses[i].offsetWidth / 2 -
                needles[i].offsetWidth / 2 +
                2
            ) + "px";
    }

    needle0.style.transform = "rotate(17.57deg)";
    needle1.style.transform = "rotate(43.26deg)";

    for (let i = 0; i < 3; i++) {
        customPosLabel[i].style.top =
            Math.ceil(
                customPos[i].offsetTop +
                customPos[i].offsetHeight / 2 -
                customPosLabel[i].offsetHeight / 2
            ) -
            2 +
            "px";
        customPosLabel[i].style.left =
            Math.ceil(
                customPos[i].offsetLeft +
                customPos[i].offsetWidth / 2 -
                customPosLabel[i].offsetWidth / 2
            ) + "px";
    }
}
window.onload = window.onresize = window.onscroll = alignElements;