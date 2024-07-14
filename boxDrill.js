let previousPosition = null; // Variable to store the previous position
let previousDirection = null; // Variable to store the previous direction
let drillDuration;
let instructionTime;
let drillMode;

var FRONT = "front"
var BACK = "back"

// Define audio elements for each sound
const sounds = {
    1: new Audio('assets/one.wav'),
    2: new Audio('assets/two.wav'),
    3: new Audio('assets/three.wav'),
    4: new Audio('assets/four.wav'),
    5: new Audio('assets/front.wav'),
    6: new Audio('assets/back.wav'),
    7: new Audio('assets/countdown.wav'),
    8: new Audio('assets/short-whistle.wav'),
    9: new Audio('assets/finish-whistle.wav'),
  };

// Preload the audio files
Object.values(sounds).forEach(sound => {
    sound.preload = 'auto';
});

function calculateDirection() {
    let newDirection;
    const directionIndex = Math.floor(Math.random() * 3); // Randomly choose 0, 1, or 2
    if (directionIndex === 0) {
      newDirection = FRONT;
    } else if (directionIndex === 1) {
      newDirection = BACK;
    } else {
      newDirection = "stationary";
    }   
    return newDirection;
}

function getNextSpot() {
    let newPosition; // Generate random number between 1 and 4
    let newDirection;// Generate random direction "forward" or "backwards"
    let currentState = BACK; //track curr box dir to make sure I stay in bounds

    do {
        newPosition = Math.floor(Math.random() * 4) + 1;
        if(drillMode == "10x10 Box"){
            do {
                // newDirection = calculateDirection() 
                console.log("Current State: ", currentState)
                if(currentState === BACK){
                    do {
                        newDirection = calculateDirection()
                    } while (newDirection === BACK)
                    if(newDirection === FRONT){
                        console.log("update state to front")
                        currentState = FRONT //update state
                    } 
                } else if (currentState === FRONT){
                    do {
                        newDirection = calculateDirection()
                    } while (newDirection === FRONT) //TODO awful time complexity, need to fix
                    if(newDirection === BACK){
                        console.log("update state to back")
                        currentState = BACK
                    }
                }
            } while (newDirection === previousDirection);
        } else {
            newDirection = calculateDirection()
        }
        if(newDirection === "stationary" && newPosition === previousPosition){ //cover error case for staying in same spot
            do {
                newPosition = Math.floor(Math.random() * 4) + 1;
            } while (newPosition === previousPosition)
        }
    } while (newPosition === previousPosition && newDirection === previousDirection)
    
    previousPosition = newPosition; // Update previousPosition to the new value
    previousDirection = newDirection; // Update previousDirection to the new direction

    playSoundsSequentially(newDirection, newPosition);

    console.log(" direction: ", newDirection, "position: ", newPosition);
    
    return { position: newPosition, direction: newDirection };
  }

  function playSound(key) {
    return new Promise((resolve, reject) => {
        if (sounds[key]) {
            sounds[key].play();
            sounds[key].onended = resolve; // Resolve the promise when sound ends
        } else {
            reject(`Sound with key ${key} not found.`);
        }
    });
}

async function playSoundsSequentially(newDirection, newPosition) {
    try {
        // Play sound based on newDirection
        switch (newDirection) {
            case "front":
                await playSound(5);
                break;
            case "back":
                await playSound(6);
                break;
            default:
                break; // No sound if "stationary"
        }

        // Play sound based on newPosition
        switch (newPosition) {
            case 1:
                await playSound(1);
                break;
            case 2:
                await playSound(2);
                break;
            case 3:
                await playSound(3);
                break;
            case 4:
                await playSound(4);
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    }
}

function runDrill(){
    drillDuration = document.getElementById("timerLengthInput").value * 60000; //convert into ms
    instructionTime = document.getElementById("spaceLengthInput").value * 1000;
    modeSelect = document.getElementById("drillModeSelect");
    drillMode = modeSelect.options[modeSelect.selectedIndex].text;

    console.log(drillDuration);
    console.log(instructionTime);
    console.log(drillMode);
    console.log("Running drill...")
    playSound(7) //play countdown, then starting whistle

    // Start the interval
    const intervalId = setInterval(getNextSpot, instructionTime);

    // Stop the interval after the duration has passed
    setTimeout(() => {
        clearInterval(intervalId);
        console.log("Timer finished.");
        playSound(9) //play finish whistle sound
    }, 12000);
    
}
