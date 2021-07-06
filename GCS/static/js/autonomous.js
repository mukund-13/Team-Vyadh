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

const gpsGoal = new ROSLIB.Topic({
    ros: ros,
    name: "/gps_goal",
    messageType: "sensor_msgs/NavSatFix"
});

const submit = document.getElementById("submit");
const latitude = document.getElementById("lat");
const longitude = document.getElementById("long");
const commands = document.getElementById("commands");
submit.addEventListener("click", function() {
    let lat = parseFloat(latitude.value),
        lon = parseFloat(longitude.value);
    if (isNaN(lat) || isNaN(lon)) {
        alert("Please enter only floating point values for Latitiude and Longitude!");
        latitude.value = "0.0";
        longitude.value = "0.0";
    } else {
        const goal = new ROSLIB.Message({
            header: { frame_id: "map" },
            latitude: lat,
            longitude: lon
        });
        gpsGoal.publish(goal);
    }
});

const action = new ROSLIB.Topic({
    ros: ros,
    name: "/command",
    messageType: "m2wr_description/noob"

});

const compasses = [
    document.getElementById("compass0"),
    document.getElementById("compass1")
];
const needles = [
    document.getElementById("needle0"),
    document.getElementById("needle1")
];
const magTexts = [document.getElementById("mag-text0"), document.getElementById("mag-text1")];
const rad2degFactor = 180 / Math.PI;
const targetDistance = document.getElementById("target-distance");

let command = -1;

action.subscribe(function(message) {
    const currentBearing = (parseFloat(message.current_bearing) * rad2degFactor).toFixed(2);
    const targetBearing = (parseFloat(message.target_bearing) * rad2degFactor).toFixed(2);
    needles[0].style.transform = "rotate(" + currentBearing + "deg)";
    needles[1].style.transform = "rotate(" + targetBearing + "deg)";
    magTexts[0].innerText = currentBearing + "°";
    magTexts[1].innerText = targetBearing + "°";
    targetDistance.innerText = parseFloat(message.distance_from_target);
    if (command !== message.command) {
        command = message.command;
        if (command === 8) { commands.innerHTML += "Forward<br>"; } else if (command === 4) { commands.innerHTML += "Left<br>"; } else if (command === 6) { commands.innerHTML += "Right<br>"; } else if (command === 5) { commands.innerHTML += "Backward<br>"; } else { console.log(message.command); }
    }
});

function alignElements() {
    const needle0 = needles[0].style.transform,
        needle1 = needles[1].style.transform;
    for (let i = 0; i < 2; i++) {
        needles[i].style.transform = "";
        needles[i].style.top = Math.ceil(compasses[i].offsetTop + compasses[i].offsetHeight / 2 - needles[i].offsetHeight / 2) + "px";
        needles[i].style.left = Math.ceil(compasses[i].offsetLeft + compasses[i].offsetWidth / 2 - needles[i].offsetWidth / 2 + 2) + "px";
    }
    needles[0].style.transform = needle0;
    needles[1].style.transform = needle1;
}
window.onload = window.onresize = window.onscroll = alignElements;