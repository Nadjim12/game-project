// Game screen element
var gameScreen = document.getElementById("game-screen");

// Character element
var character = document.createElement("div");
character.className = "character";

// Jumping function
function jump(character) {
  // Jump logic using the character element
  if (!isJumping) {
    var initialTop = parseInt(character.style.top);
    var jumpHeight = 100;
    var jumpDuration = 500; // Adjust as needed

    var startTime = null;

    function jumpAnimation(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = timestamp - startTime;
      const newPosition = initialTop - easeOut(progress / jumpDuration) * jumpHeight;

      character.style.top = newPosition + "px";

      if (progress < jumpDuration) {
        window.requestAnimationFrame(jumpAnimation);
      } else {
        isJumping = false;
        startTime = null;
      }
    }

    function easeOut(t) {
      return t * (2 - t); // Simple cubic easing function
    }

    isJumping = true;
    window.requestAnimationFrame(jumpAnimation);
  }
}
// Function to handle the ducking action
function duckCharacter() {
    // Change the character's appearance and behavior when ducking
    character.style.height = "100px"; // Adjust the height as needed
    // Change the character's image or sprite to a ducking image
    // Modify any other related properties for collision detection, etc.
  }
  function handleCollision() {
    // End the game or trigger game over logic
    displayGameOver();
  
    // Stop the game loop
    cancelAnimationFrame(moveCharacter);
  
    // Adjust the character's position or reset the game state if desired
  }


  // Event listener to trigger the ducking action
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      // Ducking action is triggered
      duckCharacter();
    }
  });

  // Set initial speed variables
var obstacleSpeed = 5; // Adjust the initial obstacle speed as needed
var characterSpeed = 10; // Adjust the initial character speed as needed

// Inside your game loop function
function gameLoop() {
  // Move obstacles based on the obstacle speed
  moveObstacles(obstacleSpeed);

  // Move the character based on the character speed
  moveCharacter(characterSpeed);
// Detect collision between character and obstacles
for (var i = 0; i < obstacles.length; i++) {
    var obstacle = obstacles[i];
    var obstacleLeft = parseInt(obstacle.style.left);
    var obstacleRight = obstacleLeft + obstacle.offsetWidth;

    // Detect collision between character and obstacle
    if (characterRight >= obstacleLeft && characterLeft <= obstacleRight) {
      // Collision detected
      handleCollision();
      break; // Exit the loop since we already detected a collision
    }
  }
  // Other game logic and rendering code...
// Adjust speed variables here if needed
obstacleSpeed += 0.1; // Increase obstacle speed gradually
characterSpeed += 0.05; // Increase character speed gradually
  requestAnimationFrame(gameLoop); // Call the game loop function again
}
// Character movement variables
var speed = 5; // Initial movement speed of the character
var gravity = 0.5; // The force that pulls the character downward
var isJumping = false; // To track whether the character is jumping or not
var isDucking = false; // To track whether the character is ducking or not

// Function to move the character
function moveCharacter() {
  // Apply gravity to pull the character downward
  character.style.top = parseInt(character.style.top) + gravity + "px";

  // Move the character horizontally based on the current speed
  character.style.left = parseInt(character.style.left) + speed + "px";

  // Check for collisions with obstacles or boundaries here
// Move the character horizontally based on the current speed
character.style.left = parseInt(character.style.left) + speed + "px";

// Check for collisions with obstacles or boundaries here
var characterLeft = parseInt(character.style.left);
var characterRight = characterLeft + character.offsetWidth;

// Perform collision detection for obstacles
for (var i = 0; i < obstacles.length; i++) {
  var obstacle = obstacles[i];
  var obstacleLeft = parseInt(obstacle.style.left);
  var obstacleRight = obstacleLeft + obstacle.offsetWidth;

  // Detect collision between character and obstacle
  if (characterRight >= obstacleLeft && characterLeft <= obstacleRight) {
    // Collision detected
    handleCollision();
    break; // Exit the loop since we already detected a collision
  }
}

// Perform collision detection with boundaries
var gameScreenWidth = gameScreen.offsetWidth;
if (characterLeft < 0 || characterRight > gameScreenWidth) {
  // Collision with boundaries detected
  handleCollision();
}


  // Request the next frame
  window.requestAnimationFrame(moveCharacter);
}

// Register keydown event for control
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    jump(character); // Call the jump() function with the character element
  } else if (event.key === "ArrowDown") {
    // Duck logic here
  } else if (event.key === "ArrowLeft") {
    // Decrease speed logic here
  } else if (event.key === "ArrowRight") {
    // Increase speed logic here
  }
});

// Start the game loop
moveCharacter();