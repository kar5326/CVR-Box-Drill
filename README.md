# CVR-Box-Drill
[Link Here](https://kar5326.github.io/CVR-Box-Drill/)

This project is a web application designed to run CVR's box drill based on user-set parameters.

### Parameters
*Drill Mode*
- 10x10 box mode keeps you in one stationary box
- Full track has no limitations on the amount of times you move forwards or backwards

*Timer Length*
- Set how long you want the drill to last. A whistle will signal the start and end of the timer.

*Space Between Instructions*
- Set how many seconds are between each randomized instruction. This keeps the application accessible for all skill levels. 

### How to Use
- Simply input the values you'd like for the above parameters and hit the start button. If you want to end the session early, hitting the stop button will end the session and reset the timer for the next time start is clicked.

### Known Bugs
- Shorter times between instructions (1-2 seconds) may cause issues with multiple audio files running simulataneously
- Time between instructions is calculated once the first sound is triggered, not after both. This causes 2 word commands to take up more of the time between instructions.
