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

//p1 if true, and p2 if false
let p1Turn = true;

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

// Function to initialize the game
function initializeGame() {
    // Initialize game state and settings, e.g., player names, target score, forbidden number, scores, etc.
    roll.addEventListener("click", rollDice);
    rightTri.style.display = "none";
    leftBox.style.backgroundColor = "#f0857d";
    newGame.addEventListener("click", restartGame);
    reset.addEventListener("click", resetScore);
    end.addEventListener("click", endTurn);
    d1.style.display = "block";
}

function restartGame() {
    p1TotalVal = 0;
    p1GameTotal.innerHTML = p1TotalVal;
    p2TotalVal = 0;
    p2GameTotal.innerHTML = p2TotalVal;
    turnTotal = 0;
    p1TurnTotal.innerHTML = turnTotal;
    p2TurnTotal.innerHTML = turnTotal;
    
    turnCheck();
    progressBar();
    resetScore();
}

// Function to roll the dice
async function rollDice() {
    // Generate a random dice roll result (1 to 6)
    //rollValue = Math.floor(Math.random() * 6) + 1;
    rollValue = await randNumGen();
    // If the roll result is equal to the forbidden number, reset turnTotal to 0, end the turn, and switch players
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
        if (p1Turn === true) {
            p1TurnTotal.innerHTML = turnTotal;
            p2TurnTotal.innerHTML = 0; //other player turn total should be 0
        } else {
            p2TurnTotal.innerHTML = turnTotal;
            p1TurnTotal.innerHTML = 0; 
        }
    }
}

function randNumGen() {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            rolls = Math.floor(Math.random() * 6) + 1;
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
            rollValue = rolls;
            setTimeout(() => {
                clearInterval(interval);
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
        progressBar();

        if (p1TotalVal >= targetScore || p2TotalVal >= targetScore) {       
            setTimeout(() => {                
                if (p1TotalVal >= targetScore) {
                    p1WinCountVal += 1;
                    //add another point if an exact match
                    p1WinCountVal = (p1TotalVal == targetScore) ? p1WinCountVal + 1 : p1WinCountVal;
                    openModal("winnerModal");
                    winAlert(p1Name.innerHTML, p1WinCountVal, p2WinCountVal);
                    p1WinCount.innerHTML = "Wins: " + p1WinCountVal;
                } else {
                    p2WinCountVal += 1;
                    //add another point if an exact match
                    p2WinCountVal = (p2TotalVal == targetScore) ? p2WinCountVal + 1 : p2WinCountVal;
                    openModal("winnerModal");
                    winAlert(p2Name.innerHTML, p2WinCountVal, p1WinCountVal);
                    p2WinCount.innerHTML = "Wins: " + p2WinCountVal;
                }
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

        // Check if the currentPlayer has reached or exceeded the target score
        // If yes, declare the currentPlayer as the winner and update winCount and reset turnTotal
        // If not, switch players and reset turnTotal
        // Update the UI to reflect the new game state
    }
}

function winAlert(winnerName, winnerScore, loserScore) {
    winner.innerHTML = "CONGRATS, " + winnerName + " wins!"
    winMsg.innerHTML = "The score is now " + winnerScore + " : " + loserScore;
}

function turnCheck() {
    if (p1Turn === true) {
        leftTri.style.display = "block";
        rightTri.style.display = "none";
        leftBox.style.backgroundColor = "#f0857d";
        rightBox.style.backgroundColor = "#f0ab8d";
    } else {
        rightTri.style.display = "block";
        leftTri.style.display = "none";
        leftBox.style.backgroundColor = "#f0ab8d";
        rightBox.style.backgroundColor = "#f0857d";
    }
}

function progressBar() {
    //update progress bar
    leftVal = Math.round(p1TotalVal / targetScore * 100);
    leftBarVal = (leftVal < 100) ? leftVal : 100;
    leftBar.innerHTML = leftBarVal + "%";
    leftBarVal = (leftBarVal < 10) ? 10 : leftBarVal;
    leftBar.style.width = leftBarVal + "%";
    rightVal = Math.round(p2TotalVal / targetScore * 100);
    rightBarVal = (rightVal < 100) ? rightVal : 100;
    rightBar.innerHTML = rightBarVal + "%";
    rightBarVal = (rightBarVal < 10) ? 10 : rightBarVal;
    rightBar.style.width = rightBarVal + "%";
}

// Function to toggle the visibility of the rules pop-up
function toggleRulesPopUp() {
    // Toggle the visibility of the rules pop-up, and display the rules to the user
}

// Function to reset the game score
function resetScore() {
    // Reset player scores and win counts
    p1WinCountVal = 0;
    p1WinCount.innerHTML = "Wins: 0";
    p2WinCountVal = 0;
    p2WinCount.innerHTML = "Wins: 0";

    // Update the UI to reflect the new game state
}

function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('modalOpened');
}
function closeModal() {
    document.querySelector('.modal.open').classList.remove('open');
    document.body.classList.remove('modalOpened');
}


// Function to toggle the visibility of the settings pop-up
function toggleSettingsPopUp() {
    // Toggle the visibility of the settings pop-up, and display the settings to the user
}

// Function to change player names
function changePlayerNames() {
    // Allow players to enter their names in the UI
    // Update player names in the game state
    // Update the UI to display the new player names
    p1NewName = document.getElementById("p1NameInput").value;
    p1Name.innerHTML = (p1NewName != "") ? p1NewName : p1Name.innerHTML;
    p2NewName = document.getElementById("p2NameInput").value;
    p2Name.innerHTML = (p2NewName != "") ? p2NewName : p2Name.innerHTML;
    //clear the field
    document.getElementById("p1NameInput").value = '';
    document.getElementById("p2NameInput").value = '';
}

// Function to change the target score
function changeTargetScore() {
    // Allow the players to select a new target score in the UI
    // Update the target score in the game state
    // Update the UI to display the new target score
    newTarget = document.getElementById("targetInput").value;
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

// Function to change the forbidden number
function changeBomb() {
    // Allow the players to select a new forbidden number in the UI
    // Update the forbidden number in the game state
    // Update the UI to display the new forbidden number
    newBomb = document.getElementById("bombInput").value;
    bombNum = (newBomb != "") ? newBomb : bombNum;
    //clear the field
    document.getElementById("bombInput").value = '';
    //update the display
    displayBomb.innerHTML = "Bomb: " + bombNum;
}

// Function to display the game score/record
function displayGameScore() {
    // Display each player's score / win count
    // Update the UI to reflect the game score/record
}

// Function to display roll histories & probabilities
function displayRollHistory() {
    // Keep track of each player's roll history
    // Calculate and display probabilities (e.g., probability of rolling the forbidden number)
    // Update the UI to show roll histories and probabilities
}

// Function to update the progress bar
function updateProgressBar() {
    // Calculate the progress toward the target score for each player
    // Update the progress bar in the UI to display the progress of each player
}


// Event listeners to handle user interactions (e.g., roll button, end turn button, pop-up screens, etc.)

// Call initializeGame() to start the game
initializeGame();