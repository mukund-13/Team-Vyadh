const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const cam0 = document.getElementById("cam0");
const cam1 = document.getElementById("cam1");
const cam2 = document.getElementById("cam2");
const cam3 = document.getElementById("cam3");
const cam4 = document.getElementById("cam4");
const cam5 = document.getElementById("cam5");
cam0.running = false;
cam1.running = false;
cam2.running = false;
cam3.running = false;
cam4.running = false;
cam5.running = false;

cam0.addEventListener("click", function () {
    this.classList.toggle("running");
    if (this.running) {
        const cam = document.getElementById("camera0");
        cam.lastElementChild.setAttribute("src", "img/offline.png");
        cam.remove();
        this.running = false;
    }
    else {
        this.running = true;
        let cam = document.createElement("div");
        cam.setAttribute("class", "cam");
        cam.setAttribute("id", "camera0");
        cam.innerHTML = `<div class="camera-title">cam0</div>
                        <img class="camera-container" src="http://192.168.43.114:8080/stream?topic=/cam0&type=ros_compressed">`;
        if (row1.childElementCount < 3) {
            row1.appendChild(cam);
        }
        else {
            row2.appendChild(cam);
        }
    }
});

cam1.addEventListener("click", function () {
    this.classList.toggle("running");
    if (this.running) {
        const cam = document.getElementById("camera1");
        cam.lastElementChild.setAttribute("src", "img/offline.png");
        cam.remove();
        this.running = false;
    }
    else {
        this.running = true;
        let cam = document.createElement("div");
        cam.setAttribute("class", "cam");
        cam.setAttribute("id", "camera1");
        cam.innerHTML = `<div class="camera-title">cam1</div>
                        <img class="camera-container" src="http://192.168.43.114:8080/stream?topic=/cam1&type=ros_compressed">`;
        if (row1.childElementCount < 3) {
            row1.appendChild(cam);
        }
        else {
            row2.appendChild(cam);
        }
    }
});

cam2.addEventListener("click", function () {
    this.classList.toggle("running");
    if (this.running) {
        const cam = document.getElementById("camera2");
        cam.lastElementChild.setAttribute("src", "img/offline.png");
        cam.remove();
        this.running = false;
    }
    else {
        this.running = true;
        let cam = document.createElement("div");
        cam.setAttribute("class", "cam");
        cam.setAttribute("id", "camera2");
        cam.innerHTML = `<div class="camera-title">cam2</div>
                        <img class="camera-container" src="http://192.168.43.114:8080/stream?topic=/cam2&type=ros_compressed">`;
        if (row1.childElementCount < 3) {
            row1.appendChild(cam);
        }
        else {
            row2.appendChild(cam);
        }
    }
});

cam3.addEventListener("click", function () {
    this.classList.toggle("running");
    if (this.running) {
        const cam = document.getElementById("camera3");
        cam.lastElementChild.setAttribute("src", "img/offline.png");
        cam.remove();
        this.running = false;
    }
    else {
        this.running = true;
        let cam = document.createElement("div");
        cam.setAttribute("class", "cam");
        cam.setAttribute("id", "camera3");
        cam.innerHTML = `<div class="camera-title">cam3</div>
                        <img class="camera-container" src="http://192.168.43.114:8080/stream?topic=/cam3&type=ros_compressed">`;
        if (row1.childElementCount < 3) {
            row1.appendChild(cam);
        }
        else {
            row2.appendChild(cam);
        }
    }
});

cam4.addEventListener("click", function () {
    this.classList.toggle("running");
    if (this.running) {
        const cam = document.getElementById("camera4");
        cam.lastElementChild.setAttribute("src", "img/offline.png");
        cam.remove();
        this.running = false;
    }
    else {
        this.running = true;
        let cam = document.createElement("div");
        cam.setAttribute("class", "cam");
        cam.setAttribute("id", "camera4");
        cam.innerHTML = `<div class="camera-title">cam4</div>
                        <img class="camera-container" src="http://192.168.43.114:8080/stream?topic=/cam4&type=ros_compressed">`;
        if (row1.childElementCount < 3) {
            row1.appendChild(cam);
        }
        else {
            row2.appendChild(cam);
        }
    }
});

cam5.addEventListener("click", function () {
    this.classList.toggle("running");
    if (this.running) {
        const cam = document.getElementById("camera5");
        cam.lastElementChild.setAttribute("src", "img/offline.png");
        cam.remove();
        this.running = false;
    }
    else {
        this.running = true;
        let cam = document.createElement("div");
        cam.setAttribute("class", "cam");
        cam.setAttribute("id", "camera5");
        cam.innerHTML = `<div class="camera-title">cam5</div>
                        <img class="camera-container" src="http://192.168.43.114:8080/stream?topic=/cam5&type=ros_compressed">`;
        if (row1.childElementCount < 3) {
            row1.appendChild(cam);
        }
        else {
            row2.appendChild(cam);
        }
    }
});