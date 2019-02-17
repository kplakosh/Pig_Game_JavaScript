/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables
// Scores for player 0 and 1
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var gamePlaying;


// Make sure the initial values in HTML are shown correctly.
// Get DOM by unique ids
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0'
document.getElementById('current-0').textContent = '0'
document.getElementById('current-1').textContent = '0'


// Do not show dice before the game.
document.querySelector('.dice').style.display = 'none';





// Monitor the click of roll icon, roll a new number, and display.
// '.'is for class name
document.querySelector('.btn-roll').addEventListener('click', function () {

	// Generate random dice number
	var dice = Math.floor(Math.random() * 6 + 1);
    // Find the DOM of dice
    var diceDOM = document.querySelector('.dice');
    // Make sure the dice displays
    diceDOM.style.display = 'block';
    // Change the image of dice accordingly
    diceDOM.src = 'images/dice-' + dice + '.png';
    // Keep rolling if not 1
    if (dice !== 1)
    {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    // Clear the round score and switch active players
    else
    {
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        // Switch class between players
        // Add active class if not exist, and delete active class if already exist.
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        // Do not show dice
        diceDOM.style.display = 'none';
        
    }
    
    
    
})


