// Course: SENG 513
// Date: OCT 20, 2023
// Assignment 2
// Name: Eugene Lee
// UCID: 30137489 

// Define global variables for game state and settings
let currentPlayer;
let player1Name;
let player2Name;
let targetScore;
let forbiddenNumber;
let player1Score;
let player2Score;
let turnTotal;
let winCountPlayer1;
let winCountPlayer2;

// Function to initialize the game
function initializeGame() {
    // Initialize game state and settings, e.g., player names, target score, forbidden number, scores, etc.
    // Display the game rules pop-up
    // Update the UI to reflect initial game state
}

// Function to roll the dice
function rollDice() {
    // Generate a random dice roll result (1 to 6)
    // Update the UI to display the roll result
    // If the roll result is equal to the forbidden number, reset turnTotal to 0, end the turn, and switch players
    // Otherwise, add the roll result to turnTotal and update the UI
}

// Function to end the turn and add turnTotal to the player's score
function endTurn() {
    // Add turnTotal to the currentPlayer's score
    // Check if the currentPlayer has reached or exceeded the target score
    // If yes, declare the currentPlayer as the winner and update winCount
    // If not, switch players and reset turnTotal
    // Update the UI to reflect the new game state
}

// Function to reset the game score
function resetScore() {
    // Reset player scores and win counts
    // Update the UI to reflect the new game state
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
    // Display each player's score and win count
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
    // Calculate the progress toward the target score
    // Update the progress bar in the UI
}

// Event listeners to handle user interactions (e.g., roll button, end turn button, pop-up screens, etc.)

// Call initializeGame() to start the game
