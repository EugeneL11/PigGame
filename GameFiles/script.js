// Course: SENG 513
// Date: Nov 10, 2023
// Assignment 3
// Name: Eugene Lee
// UCID: 30137489 


// Define global variables for game state and settings
const roll = document.getElementById("rollButton");

const leftTri = document.getElementById("leftT");
const rightTri = document.getElementById("rightT");

const leftBox = document.getElementById("pBoxL");
const rightBox = document.getElementById("pBoxR");

let bombNum = 3;
let newBomb;
let displayBomb = document.getElementById("displayBomb");
let targetScore = 50;
let newTarget;
let displayTarget = document.getElementById("displayTarget");

let p1Turn = true; //p1 if true, and p2 if false

let turnTotal = 0;
let p1TurnTotal = document.getElementById("p1TT");
let p2TurnTotal = document.getElementById("p2TT");

let p1GameTotal = document.getElementById("p1GT");
let p1TotalVal = 0;
let p2GameTotal = document.getElementById("p2GT");
let p2TotalVal = 0;

const newGame = document.getElementById("newGameButton");

let p1WinCount = document.getElementById("p1WC");
let p1WinCountVal = 0;
let p2WinCount = document.getElementById("p2WC");
let p2WinCountVal = 0;
const reset = document.getElementById("resetButton");

const end = document.getElementById("stopButton");

let leftBar = document.getElementById("leftBar");
let leftVal = 0;
let leftBarVal = 0;
let rightBar = document.getElementById("rightBar");
let rightVal = 0;
let rightBarVal = 0;

let p1NewName;
let p1Name = document.getElementById("p1Name");
let p2NewName;
let p2Name = document.getElementById("p2Name");

let winnerModal = document.getElementById("winnerModal");
let winner = document.getElementById("winner");
let winMsg = document.getElementById("winMsg");

//for the dice
let rollValue;
let rolls;
const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
const d3 = document.getElementById("d3");
const d4 = document.getElementById("d4");
const d5 = document.getElementById("d5");
const d6 = document.getElementById("d6");


// START OF FUNCTIONS 

// Function to initialize the game
function initializeGame() {
    roll.addEventListener("click", rollDice);
    rightTri.style.display = "none";
    leftBox.style.backgroundColor = "#f0857d";
    newGame.addEventListener("click", restartGame);
    reset.addEventListener("click", resetScore);
    end.addEventListener("click", endTurn);
    d1.style.display = "block";
}

// Function to restart the game
function restartGame() {
    //set all the turn totals and game totals to 0
    p1TotalVal = 0;
    p1GameTotal.innerHTML = p1TotalVal;
    p2TotalVal = 0;
    p2GameTotal.innerHTML = p2TotalVal;
    turnTotal = 0;
    p1TurnTotal.innerHTML = turnTotal;
    p2TurnTotal.innerHTML = turnTotal;
    
    turnCheck(); //show the current player
    progressBar(); //update progress bar
    resetScore(); //reset the score to 0:0
}

// Function to roll the dice (async to wait for randNumGen to finish)
async function rollDice() {
    //await for the randNumGen to finish executing and come to one final value before proceeding
    rollValue = await randNumGen();
    // If the roll result is equal to the bomb number, reset turnTotal to 0, end the turn, and switch players
    if (rollValue == bombNum) {
        turnTotal = 0; //reset turn total
        //display updated turn total
        if (p1Turn === true) {
            p1TurnTotal.innerHTML = "❌";
            p2TurnTotal.innerHTML = 0; //other player turn total should be 0
        } else {
            p2TurnTotal.innerHTML = "❌";
            p1TurnTotal.innerHTML = 0; //other player turn total should be 0
        }
        p1Turn = !p1Turn; //switch players
        turnCheck();
        progressBar();
    } else {
        // Otherwise, add the roll result to turnTotal and update the UI
        turnTotal += rollValue;
        if (p1Turn === true) { //p1 turn
            p1TurnTotal.innerHTML = turnTotal;
            p2TurnTotal.innerHTML = 0; //other player turn total should be 0
        } else { //p2 turn
            p2TurnTotal.innerHTML = turnTotal;
            p1TurnTotal.innerHTML = 0; 
        }
    }
}

// Function to display the dice shuffle and randomize one value
function randNumGen() {
    //to go with the async functions, allows this function to finish completely before other code can proceed
    return new Promise((resolve) => {
        //this interval will shuffle the dice face
        const interval = setInterval(() => {
            //randomize a value between 1 and 6
            rolls = Math.floor(Math.random() * 6) + 1;
            //only display the dice face corresponding to the roll, and hide every other faces
            if (rolls == 1) {
                d1.style.display = "block"
                d2.style.display = d3.style.display = d4.style.display = d5.style.display = d6.style.display = "none";
            } else if (rolls == 2) {
                d2.style.display = "block"
                d1.style.display = d3.style.display = d4.style.display = d5.style.display = d6.style.display = "none";
            } else if (rolls == 3) {
                d3.style.display = "block"
                d1.style.display = d2.style.display = d4.style.display = d5.style.display = d6.style.display = "none";
            } else if (rolls == 4) {
                d4.style.display = "block"
                d1.style.display = d2.style.display = d3.style.display = d5.style.display = d6.style.display = "none";
            } else if (rolls == 5) {
                d5.style.display = "block"
                d1.style.display = d2.style.display = d3.style.display = d4.style.display = d6.style.display = "none";
            } else if (rolls == 6) {
                d6.style.display = "block"
                d1.style.display = d2.style.display = d3.style.display = d4.style.display = d5.style.display = "none";
            }
            //assign to be used outside of this function
            rollValue = rolls;
            //determine how long the shuffle animation will continue for
            setTimeout(() => {
                clearInterval(interval);
                //resolve the roll value (from the Promise above)
                resolve(rollValue);
            }, 900);
        }, 60);
    });
}

// Function to end the turn and add turnTotal to the player's score
function endTurn() {
    //only functions if the other player rolls at least once
    if (turnTotal !== 0) {
        // Add turnTotal to the currentPlayer's score
        if (p1Turn === true) {
            p1TotalVal += turnTotal; //update game total
            p1GameTotal.innerHTML = p1TotalVal; //display updated game total
            turnTotal = 0; //reset turn total for p2
            p1TurnTotal.innerHTML = turnTotal; //display turn total 0
        } else {
            p2TotalVal += turnTotal;
            p2GameTotal.innerHTML = p2TotalVal;
            turnTotal = 0;
            p2TurnTotal.innerHTML = turnTotal;
        }
        progressBar(); //update the progress bar

        //checking for a win
        if (p1TotalVal >= targetScore || p2TotalVal >= targetScore) {  //this is a win     
            setTimeout(() => {                
                if (p1TotalVal >= targetScore) { //if it is player one that won
                    p1WinCountVal += 1;
                    //add another point if an exact match
                    p1WinCountVal = (p1TotalVal == targetScore) ? p1WinCountVal + 1 : p1WinCountVal;
                    openModal("winnerModal"); //pop-up the winner modal
                    winAlert(p1Name.innerHTML, p1WinCountVal, p2WinCountVal); //display the correct information
                    p1WinCount.innerHTML = "Wins: " + p1WinCountVal; //update the win count
                } else {
                    p2WinCountVal += 1;
                    //add another point if an exact match
                    p2WinCountVal = (p2TotalVal == targetScore) ? p2WinCountVal + 1 : p2WinCountVal;
                    openModal("winnerModal");
                    winAlert(p2Name.innerHTML, p2WinCountVal, p1WinCountVal);
                    p2WinCount.innerHTML = "Wins: " + p2WinCountVal;
                }
                //reset the total point values to 0 and update the prgress bar
                p1TotalVal = 0; 
                p1GameTotal.innerHTML = p1TotalVal;
                p2TotalVal = 0;
                p2GameTotal.innerHTML = p2TotalVal;
                progressBar();
            }, 0);
        }

        //switch players
        p1Turn = !p1Turn;
        turnCheck();
        progressBar();
    }
}

// Function to display the correct winner and score
function winAlert(winnerName, winnerScore, loserScore) {
    winner.innerHTML = "CONGRATS, " + winnerName + " wins!"
    winMsg.innerHTML = "The score is now " + winnerScore + " : " + loserScore;
}

// Function to indicate the current player visually
function turnCheck() {
    if (p1Turn === true) { //if it is player one
        leftTri.style.display = "block"; //point to p1
        rightTri.style.display = "none"; //hide pointer to p1
        leftBox.style.backgroundColor = "#f0857d"; //make the background darker
        rightBox.style.backgroundColor = "#f0ab8d"; //make the background lighter
    } else {
        rightTri.style.display = "block";
        leftTri.style.display = "none";
        leftBox.style.backgroundColor = "#f0ab8d";
        rightBox.style.backgroundColor = "#f0857d";
    }
}

// Function to update the progressa bar
function progressBar() {
    leftVal = Math.round(p1TotalVal / targetScore * 100); //calculate current percentage relative to target
    leftBarVal = (leftVal < 100) ? leftVal : 100; //if it is above a 100, display a 100
    leftBar.innerHTML = leftBarVal + "%"; //update the visual
    leftBarVal = (leftBarVal < 10) ? 10 : leftBarVal; //if it is less than 10, still show 10 (aesthetic)
    leftBar.style.width = leftBarVal + "%"; //update the actual green bar
    rightVal = Math.round(p2TotalVal / targetScore * 100);
    rightBarVal = (rightVal < 100) ? rightVal : 100;
    rightBar.innerHTML = rightBarVal + "%";
    rightBarVal = (rightBarVal < 10) ? 10 : rightBarVal;
    rightBar.style.width = rightBarVal + "%";
}

// Function to reset the game score
function resetScore() {
    // Reset player scores and win counts
    p1WinCountVal = 0;
    p1WinCount.innerHTML = "Wins: 0"; //update the visual
    p2WinCountVal = 0;
    p2WinCount.innerHTML = "Wins: 0";
}

// Function to open the modals (pop-up)
function openModal(id) {
    //add open as a class
    document.getElementById(id).classList.add('open');
    //also add modalOpened
    document.body.classList.add('modalOpened');
}

// Function to close the modals
function closeModal() {
    //remove open as a a class
    document.querySelector('.modal.open').classList.remove('open');
    //also remove modalOpened
    document.body.classList.remove('modalOpened');
}


// Function to change player names
function changePlayerNames() {
    //get the new name value
    p1NewName = document.getElementById("p1NameInput").value;
    //update if it's not empty (something has been inputted)
    p1Name.innerHTML = (p1NewName != "") ? p1NewName : p1Name.innerHTML;
    p2NewName = document.getElementById("p2NameInput").value;
    p2Name.innerHTML = (p2NewName != "") ? p2NewName : p2Name.innerHTML;
    //clear the field
    document.getElementById("p1NameInput").value = '';
    document.getElementById("p2NameInput").value = '';
}

// Function to change the target score
function changeTargetScore() {
    //get the new target value
    newTarget = document.getElementById("targetInput").value;
    //update if it's not empty (something has been inputted)
    targetScore = (newTarget != "") ? newTarget : targetScore;
    //clear the field
    document.getElementById("targetInput").value = '';
    //update the display
    displayTarget.innerHTML = "Target: " + targetScore;
    //reset the current game
    p1TotalVal = 0;
    p1GameTotal.innerHTML = p1TotalVal;
    p2TotalVal = 0;
    p2GameTotal.innerHTML = p2TotalVal;
    turnTotal = 0;
    p1TurnTotal.innerHTML = turnTotal;
    p2TurnTotal.innerHTML = turnTotal;
    turnCheck();
    progressBar();
}

// Function to change the bomb number
function changeBomb() {
    //get the new bomb value
    newBomb = document.getElementById("bombInput").value;
    //update if it's not empty (something has been inputted)
    bombNum = (newBomb != "") ? newBomb : bombNum;
    //clear the field
    document.getElementById("bombInput").value = '';
    //update the display
    displayBomb.innerHTML = "Bomb: " + bombNum;
}

// Call initializeGame() to start the game
initializeGame();