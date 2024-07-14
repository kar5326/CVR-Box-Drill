let previousPosition = null; // Variable to store the previous position
let previousDirection = null; // Variable to store the previous direction

let timer = document.getElementById("timerLengthInput");
let drillMode = document.getElementById("drillModeSelect");

function calculateDirection() {
    let newDirection;
    const directionIndex = Math.floor(Math.random() * 3); // Randomly choose 0, 1, or 2
    if (directionIndex === 0) {
      newDirection = "forward";
    } else if (directionIndex === 1) {
      newDirection = "backward";
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
    
    return { position: previousPosition, direction: newDirection };
  }

function runDrill(){
    
}
