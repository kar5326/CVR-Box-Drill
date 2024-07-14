let previousPosition = null; // Variable to store the previous position
let previousDirection = null; // Variable to store the previous direction

let timer = document.getElementById("timerLengthInput");
let drillMode = document.getElementById("drillModeSelect");

// Define audio elements for each sound
const sounds = {
    1: new Audio('../assets/one.wav'),
    2: new Audio('../two.wav'),
    3: new Audio('../three.wav'),
    4: new Audio('../four.wav'),
    5: new Audio('../front.wav'),
    6: new Audio('../back.wav'),
    7: new Audio('../assets/countdown.wav'),
    8: new Audio('../short-whistle.wav'),
    9: new Audio('../finish-whistle.wav'),
  };

function calculateDirection() {
    let newDirection;
    const directionIndex = Math.floor(Math.random() * 3); // Randomly choose 0, 1, or 2
    if (directionIndex === 0) {
      newDirection = "front";
    } else if (directionIndex === 1) {
      newDirection = "back";
    } else {
      newDirection = "stationary";
    }   
    return newDirection;
}

function getNextSpot() {
    // Generate random number between 1 and 4
    let newPosition;
    // Generate random direction "forward" or "backwards"
    let newDirection;
    
    do {
        newPosition = Math.floor(Math.random() * 4) + 1;
        
        if(drillMode == "box"){
            do {
                newDirection = calculateDirection()
            } while (newDirection === previousDirection);
        } else {
            newDirection = calculateDirection()
        } 
    } while (newPosition === previousPosition && newDirection === previousDirection)
    
    previousPosition = newPosition; // Update previousPosition to the new value
    previousDirection = newDirection; // Update previousDirection to the new direction

    switch(newDirection){
        case "front":
            playSound(5);
            break;
        case "back":
            playSound(6);
            break;
        default:
            break; //play no sound if "stationary"
    }
    switch(newPosition){
        case 1:
            playSound(1);
            break;
        case 2:
            playSound(2);
            break;
        case 3:
            playSound(3);
            break;
        case 4:
            playSound(4);
            break;
    }

    
    return { position: previousPosition, direction: newDirection };
  }

function playSound(key, callback) {
    stopAllSounds(); // Stop any currently playing sounds
    if (sounds[key]) {
        sounds[key].play();
        sounds[key].onended = function() {
            if (callback) {
                callback();
            }
        };
    } else {
        console.error(`Sound with key ${key} not found.`);
        if (callback) {
            callback();
        }
    }
}

function runDrill(){
    playSound(7); //play countdown
    playSound(8); //play starting whistle
    const intervalId = setInterval(getNextSpot, timer);

    // Stop the interval after the duration has passed
    setTimeout(() => {
        clearInterval(intervalId);
        console.log("Timer finished.");
        playSound(9); //play finish whistle
    }, duration);
}
