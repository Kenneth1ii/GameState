var character = document.querySelector(".character");
var map = document.querySelector(".map");

// state of characters.
var x = 0;
var y = 0;
var held_directions = []; // State of arrow keys held-down

var speed = 1;

const placeCharacter = () => {


    var pixelSize = parseInt( getComputedStyle( document.documentElement).getPropertyValue('--pixel-size') );

    const held_direction = held_directions[0]
    if (held_direction) {
        if (held_direction === directions.right) {x += speed;}
        if (held_direction === directions.left) {x -=speed;}
        if (held_direction === directions.down) {y+=speed;}
        if (held_direction === directions.up) {y-=speed;}
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true": "false");

    character.style.transform = `translate3d(${x*pixelSize}px, ${y*pixelSize}px, 0) `;

}

//setup gameloop
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
step(); 

const directions =  {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
}

document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
       held_directions.unshift(dir)
    }
 })
 
 document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
       held_directions.splice(index, 1)
    }
 });
 




