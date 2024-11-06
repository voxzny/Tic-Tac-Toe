let currentChoice = 'X'; // Start with X
let board = ['', '', '', '', '', '', '', '', '']; // Tracks the state of the game
const winMessage = document.getElementById('winMessage');
let scoreX = 0;
let scoreO = 0;
let gameOver = false; // New variable to track if the game is over

function toggleXO(card, index) {
  if (gameOver || board[index] !== '') return; // Prevent moves if game is over or the cell is filled

  card.textContent = currentChoice;
  card.classList.add('animate'); // Add animation class
  setTimeout(() => card.classList.remove('animate'), 300); // Remove animation class after animation completes
  board[index] = currentChoice;

  if (checkWin()) {
    winMessage.textContent = `${currentChoice} Wins!`;
    winMessage.classList.remove('hidden');
    updateScore(currentChoice); // Update the score for the winner
    gameOver = true; // Set gameOver to true to stop further moves
    setTimeout(resetGame, 2000); // Wait 2 seconds before restarting
  } else if (board.every(cell => cell !== '')) { // Check for a tie if all cells are filled
    winMessage.textContent = "It's a Tie!";
    winMessage.classList.remove('hidden');
    gameOver = true; // Set gameOver to true to stop further moves
    setTimeout(resetGame, 2000); // Wait 2 seconds before restarting
  } else {
    currentChoice = currentChoice === 'X' ? 'O' : 'X'; // Toggle between X and O
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal wins
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical wins
    [0, 4, 8], [2, 4, 6]             // Diagonal wins
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function updateScore(winner) {
  if (winner === 'X') {
    scoreX++;
    document.getElementById('scoreX').textContent = scoreX;
  } else if (winner === 'O') {
    scoreO++;
    document.getElementById('scoreO').textContent = scoreO;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', '']; // Reset board state
  document.querySelectorAll('.card').forEach(card => card.textContent = ''); // Clear the cards
  winMessage.classList.add('hidden'); // Hide the win message
  currentChoice = 'X'; // Start with X again
  gameOver = false; // Reset gameOver to allow moves again
}
