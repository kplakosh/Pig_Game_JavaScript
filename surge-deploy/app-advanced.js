/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables
var scores;
var roundScore;
var activePlayer;
var gamePlaying;
var winningValueDeault;

// Functions
function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // Switch class between players
    // Add active class if not exist, and delete active class if already exist.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // Do not show dice
    // hideDice();
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none'; 
    document.getElementById('dice-2').style.display = 'none'; 
}

function showDice(value_1, value_2) {
    document.getElementById('dice-1').style.display = 'block'; 
    document.getElementById('dice-2').style.display = 'block'; 
    document.getElementById('dice-1').src = 'images/dice-' + value_1 + '.png';
    document.getElementById('dice-2').src = 'images/dice-' + value_2 + '.png';
}

function gameInit() {
    // Scores for player 0 and 1
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    winningValueDeault = 100;

    // Make sure the initial values in HTML are shown correctly.
    // Get DOM by unique ids
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    // Do not show dice before the game.
    hideDice();
    
    // Reset the player's name.
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    
    // Remove winner and active class.
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Player 1 goes first.
    // Set player 1 to active.
    document.querySelector('.player-0-panel').classList.add('active');
}

// Initialize game
gameInit();

// Monitor the click of roll icon, roll a new number, and display.
// '.'is for class name
// Anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // Generate random dice number
        var dice_1 = Math.floor(Math.random() * 6 + 1);
        var dice_2 = Math.floor(Math.random() * 6 + 1);
        showDice(value_1=dice_1, value_2=dice_2);
        // Keep rolling if none of the dice is 1
        if (dice_1 === 1 || dice_2 === 1) {
            nextPlayer();
        }
        else {
            roundScore += (dice_1 + dice_2);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add current roundScore to player's score
        scores[activePlayer] += roundScore;
        // Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // Check if the player has won the game. If not, switch player.
        // Read winning value
        var input = document.querySelector('.final-score').value;
        var winningValue;
        // Make sure the input is not invalid values
        if (input && input >= 0) {
            winningValue = input;
        }
        else {
            winningValue = winningValueDeault;
            document.querySelector('.final-score').value = winningValue;
        }
        if (scores[activePlayer] >= winningValue) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            hideDice();
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
})

// Re-initialize game if click new game button.
document.querySelector('.btn-new').addEventListener('click', gameInit);