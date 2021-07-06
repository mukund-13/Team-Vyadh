const site1 = document.getElementById("site1");
const site2 = document.getElementById("site2");
const site3 = document.getElementById("site3");
const site1_values = document.getElementById("site1_values");
const site2_values = document.getElementById("site2_values");
const site3_values = document.getElementById("site3_values");
const site1_weight = document.getElementById("site1-weight");
const site2_weight = document.getElementById("site2-weight");
const site3_weight = document.getElementById("site3-weight");

site1.addEventListener("click", function () {
    site1_values.classList.toggle("hidden");
});

site2.addEventListener("click", function () {
    site2_values.classList.toggle("hidden");
});

site3.addEventListener("click", function () {
    site3_values.classList.toggle("hidden");
});

document.onkeypress = function (event) {
    switch (event.keyCode) {
        case 113:
            site1_weight.innerHTML = "0 gms";
            break;
        case 119:
            site1_weight.innerHTML = "27 gms";
            break;
        case 101:
            site1_weight.innerHTML = "43 gms";
            break;
        case 114:
            site1_weight.innerHTML = "62 gms";
            break;
        case 116:
            site1_weight.innerHTML = "86 gms";
            break;
        case 121:
            site1_weight.innerHTML = "95 gms";
            break;
        case 97:
            site2_weight.innerHTML = "0 gms";
            break;
        case 115:
            site2_weight.innerHTML = "28 gms";
            break;
        case 100:
            site2_weight.innerHTML = "53 gms";
            break;
        case 102:
            site2_weight.innerHTML = "72 gms";
            break;
        case 103:
            site2_weight.innerHTML = "95 gms";
            break;
        case 104:
            site2_weight.innerHTML = "124 gms";
            break;
        case 122:
            site3_weight.innerHTML = "0 gms";
            break;
        case 120:
            site3_weight.innerHTML = "24.2 gms";
            break;
        case 99:
            site3_weight.innerHTML = "38 gms";
            break;
        case 118:
            site3_weight.innerHTML = "51 gms";
            break;
        case 98:
            site3_weight.innerHTML = "73 gms";
            break;
        case 110:
            site3_weight.innerHTML = "89 gms";
            break;
    }
}