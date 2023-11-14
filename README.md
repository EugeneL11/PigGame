# PigGame

Game Title:
- Pig

Target Platform:
- Desktop and Mobile (It is responsive!)

Game Genre: 
- Dice Probability

Game Objective: 
- the main objective of the game is to be the first of the two players to reach the target score, by rolling the dice

Rules of the Game: 
- Set the bomb number between 1 - 6, and set the target number
- Player 1 starts for the first game, and from then, the player who most recently won starts
- In a turn, the player rolls a dice. Everytime they roll, the value gets added to the turn total. The player can stop whenever they want, but can also continue to roll, until they roll the bomb number. If they roll the bomb number, their turn total gets set back to 0, and their turn ends. 
- The players keep taking turns, until a player reaches the target score. 
- If they reach the target score exactly, they get 2 points added to their record, and if they surpass it, they get one point added. 

Game Mechanics: 
- The primary action the players will perform in this game is to roll the dice, and use their best judgment to choose whether to stop and add to the game total, or keep rolling to get higher scores. They must try to reach the target score as fast as possible, and try to avoid the bomb numbers. 

Description of Functionalities: 
- The various functionalities to be included in the game are: rules button, new game button, reset score button, roll dice button, end turn button, display game score/record for each player, ability to change player names, target score, and the bomb number, a progress bar, and display the roll histories and probabilities.
    - rules button: will bring up a pop-up screen that outlines all the rules of the game, when pressed
    - new game button: reset all the points (turn total and game total) of the current game, start a new game and scrap the current
    - reset score button: reset the win count for both players to zero
    - roll dice button: roll the dice to get a value between 1 and 6
    - end turn button: end the player's current turn, adding the accumulated total turn value to the game total, begin the other player's turn
    - game score/record: display the number of wins each player has earned so far
    - settings button: will bring up a pop-up screen that allows you to change player names, target score, and the bomb number
    - change player names: allow the players to customize their display names
    - change target score: change the target score that the players must reach to win
    - change bomb number: change the number that will end a player's turn and set their turn total to zero
    - progress bar: display and visualize each player's progress to the target score
    - roll histories & probabilities: display the previous few rolls and show the probabilities of each roll value up until that point

Custom Anmiations, Interaction Mechanisms, and Algorithms (indicated in code):
- I implemented animations for the dice rolling, the dynamic progress bar that shows the player's percentage to the target score, an animation for button hovers, a pop-up screen for winners, settings, and rules, and an arrow & background color change to indicate the current player.
- The abilities to roll a dice, end a turn, reset score, and restart game are all interation mechanisms with the user. On top of that, the ability to change player names, target score, and the bomb number further expand the user interaction and make the game more engaging and useful.
- There are algorithms and logic used throughout the whole code to keep all the states in check and it running smoothly. Some of these include generating the random number and displaying the correct dice face, ending a turn and calculating new total score / checking for wins / calculating new score, calculating correct percentage and updating the progress bar accordingly.

Complexity & Originality: 
- I challenged myself greatly by implementing a lot of features that do not exist in the original Pig game. I added the ability to change player names, target score, and the bomb number. I also added a progress bar for better visuals. There are lots of logic involved to keep all the game states in check. I also plan to add roll histories & probabilities, and perhaps an option for different types of dice. 

Citations/Attributions: 
- Dice png: <a href="https://www.flaticon.com/free-icons/dice" title="dice icons">Dice icons created by WHY ARIF - Flaticon</a>
- pig png: publicdomainq.net
- pig nose png: Emoji One, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons
- right and left arrow: WhosAsking, Public domain, via Wikimedia Commons 