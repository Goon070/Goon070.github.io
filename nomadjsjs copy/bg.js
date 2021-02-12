const body = document.querySelector("body");


const IMG_NUM = 8;

function genNum() {
    return Math.floor(Math.random() * IMG_NUM + 1);
}

function getBg(genNum) {
    const img = new Image();
    img.src = `images/${genNum}.jpg`;
    body.appendChild(img);
    img.classList.add("bgImg");
}

function init() {
    getBg(genNum());
}

init();