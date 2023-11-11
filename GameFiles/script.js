// Course: SENG 513
// Date: Nov 10, 2023
// Assignment 3
// Name: Eugene Lee
// UCID: 30137489 

// Define global variables for game state and settings
let currentPlayer;
let player1Name;
let player2Name;
let player1Score;
let player2Score;
let winCountPlayer1;
let winCountPlayer2;
let rulesPopUpVisible;
let settingsPopUpVisible;

const roll = document.getElementById("rollButton");
roll.addEventListener("click", rollDice);

let rollResult = document.getElementById("rollResult");

let forbiddenNum = 3;
let targetScore = 100;

//p1 if true, and p2 if false
let p1Turn = true;

let turnTotal = 0;
let p1TurnTotal = document.getElementById("p1TT");
let p2TurnTotal = document.getElementById("p2TT");

let p1GameTotal = document.getElementById("p1GT");
let p1TotalVal = 0;
let p2GameTotal = document.getElementById("p2GT");
let p2TotalVal = 0;

const end = document.getElementById("stopButton");
end.addEventListener("click", endTurn);

// Function to initialize the game
function initializeGame() {
    // Initialize game state and settings, e.g., player names, target score, forbidden number, scores, etc.
    // Update the UI to reflect initial game state

}

// Function to roll the dice
function rollDice() {
    // Generate a random dice roll result (1 to 6)
    const rollValue = Math.floor(Math.random() * 6) + 1;
    
    // Update the UI to display the roll result
    rollResult.innerHTML = rollValue;
    
    // If the roll result is equal to the forbidden number, reset turnTotal to 0, end the turn, and switch players
    if (rollValue === forbiddenNum) {
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
        
        if (p1TotalVal >= 30 || p2TotalVal >= 30) {       
            setTimeout(() => {                
                if (p1TotalVal >= 30) {
                    alert("Player 1 Wins!");
                } else {
                    alert("Player 2 Wins!");
                }
                p1TotalVal = 0;
                p1GameTotal.innerHTML = p1TotalVal;
                p2TotalVal = 0;
                p2GameTotal.innerHTML = p2TotalVal;
            }, 0);
        }

        //switch players
        p1Turn = !p1Turn;

        // Check if the currentPlayer has reached or exceeded the target score
        // If yes, declare the currentPlayer as the winner and update winCount and reset turnTotal
        // If not, switch players and reset turnTotal
        // Update the UI to reflect the new game state
    }

}

// Function to toggle the visibility of the rules pop-up
function toggleRulesPopUp() {
    // Toggle the visibility of the rules pop-up, and display the rules to the user
}

// Function to reset the game score
function resetScore() {
    // Reset player scores and win counts
    // Update the UI to reflect the new game state
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
}

// Function to change the target score
function changeTargetScore() {
    // Allow the players to select a new target score in the UI
    // Update the target score in the game state
    // Update the UI to display the new target score
}

// Function to change the forbidden number
function changeForbiddenNumber() {
    // Allow the players to select a new forbidden number in the UI
    // Update the forbidden number in the game state
    // Update the UI to display the new forbidden number
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