// Get the game over screen element
var gameOverScreen = document.getElementById("game-over-screen");

// Function to check for game over conditions
function checkGameOver() {
  // Add your game over conditions here
  // For example, if the character collides with an obstacle or reaches a certain position on the screen
  var characterTop = parseInt(character.style.top); // Get the current top position of the character
  var characterBottom = characterTop + character.offsetHeight; // Calculate the bottom position of the character

  // Check if the character is out of the screen vertically
  if (characterTop < 0 || characterBottom > gameScreen.offsetHeight) {
    // The character is pushed out of the screen vertically
    displayGameOver();
    window.location.href = "gameover.html";
    // Stop the game loop
    cancelAnimationFrame(moveCharacter);
  }


  // Add your additional game over conditions here
  // For example, check collision with upper obstacle or falling off the screen

  // Call the checkGameOver function again after a certain delay
  setTimeout(checkGameOver, 100); // Adjust the delay as needed
}

// Function to display the game over screen
function displayGameOver() {
  // Show the game over screen
  gameOverScreen.style.display = "block";
  
  // Stop the game loop
  cancelAnimationFrame(moveCharacter);
  
  // Remove any other event listeners or stop any ongoing game actions
  // Add any other game over logic as needed
}


  // If game over condition is met, display the game over screen
  gameOverScreen.style.display = "block";


// Call the checkGameOver function periodically
setInterval(checkGameOver, 100); // Adjust the interval as needed