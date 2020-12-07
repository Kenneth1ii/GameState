var character = document.querySelector(".character");
var map = document.querySelector(".map");

// state of characters.
var x = 0;
var y = 0;
var held_directions = []; // State of arrow keys held-down

var speed = 1;  //how fast the character moves in pixels per frame.

const directions =  {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

const keys = {
    "ArrowUp": directions.up,
    "ArrowLeft": directions.left,
    "ArrowRight": directions.right,
    "ArrowDown": directions.down,
    "w": directions.up,
    "a":directions.left,
    "d":directions.right,
    "s": directions.down, 
}


const placeCharacter = () => {


    var pixelSize = parseInt( getComputedStyle( document.documentElement).getPropertyValue('--pixel-size') );

    const held_direction = held_directions[0] // check 0 entry.

    if (held_direction) {
        if (held_direction === directions.right) {x += speed;}
        if (held_direction === directions.left) {x -=speed;}
        if (held_direction === directions.down) {y+=speed;}
        if (held_direction === directions.up) {y-=speed;}
        character.setAttribute("facing", held_direction);  // set html attribute facing="right."
    }
    character.setAttribute("walking", held_direction ? "true" : "false"); 
    //if statement for walking attribute html characters.

    //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = -8 + 32;
   var bottomLimit = (16 * 7);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }

    var camera_left = pixelSize * 66;
    var camera_right = pixelSize * 42;

    map.style.transform = `translate3d(${-x*pixelSize+ camera_left}px, ${-y*pixelSize + camera_right}px, 0) `;
    // Map Moves But The Camera Never Changes.

    character.style.transform = `translate3d(${x*pixelSize}px, ${y*pixelSize}px, 0) `;

}

//setup gameloop
const step = () => {
    placeCharacter();   // placecharacter everytime/frames.
    window.requestAnimationFrame(() => {    // whenerver browsers ready..
        step(); // refire. recursion.
    })
}

step(); 


document.addEventListener("keydown", (e) => {
    // Check the key if it is in keys object if undefined will not run in next , [if statements]
    var dir = keys[e.key]; 
    if(dir && held_directions.indexOf(dir) === -1) {    // if not found in held , put it in.
        held_directions.unshift(dir);
    }
})

document.addEventListener("keyup", (e) => {
    var dir =  keys[e.key];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1);   //splice used to remove the Key after no longer Held.
    }
})



// Dpad.

var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));

