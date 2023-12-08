// Game screen element
var gameScreen = document.getElementById("game-screen");
function generateBlock() {
    const block = document.createElement("div");
    block.className = "block";
    gameScreen.appendChild(block);
}
function isColliding(block, character) {
    // Get the coordinates and dimensions of the block
    const blockRect = block.getBoundingClientRect();
    const blockTop = blockRect.top;
    const blockBottom = blockRect.bottom;
    const blockLeft = blockRect.left;
    const blockRight = blockRect.right;
    
    // Get the coordinates and dimensions of the character
    const characterRect = character.getBoundingClientRect();
    const characterTop = characterRect.top;
    const characterBottom = characterRect.bottom;
    const characterLeft = characterRect.left;
    const characterRight = characterRect.right;
    
    // Check for collision by comparing the positions and dimensions of the block and character
    if (
      characterBottom >= blockTop &&
      characterTop <= blockBottom &&
      characterRight >= blockLeft &&
      characterLeft <= blockRight
    ) {
      return true; // Collision detected
    }
    
    return false; // No collision detected
  }
const gameWindow = document.querySelector(".gamewindow");

function startBlockGenerator() {
    setInterval(generateBlock, 2000); // Add a new block every 2 seconds (adjust the interval as needed)
  }
  startBlockGenerator();
    function updateBlocks() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
      // Update the position of each block (e.g., decrease the left position to move it from right to left)
      block.style.left = parseInt(block.style.left) - 1 + 'px';
      cancelAnimationFrame(animationFrameId);
      character.hit();
    showGameOverScreen();
    blocks.forEach((block) => {
        const blockRect = block.getBoundingClientRect();
        if (blockRect.right <= 0 || isColliding(block, character)) {
          block.remove();
        }
      });
      // Request the next frame to continue the animation loop
const animationFrameId = requestAnimationFrame(updateBlocks);
      // Check for collision with the character
      if (isColliding(block, character)) {
       // Stop the game
  cancelAnimationFrame(animationFrameId);

  // Initiate character hit animation
  character.hit();

  // Show the game over screen
  showGameOverScreen();
    });
  
    // Remove blocks that have moved off the screen or collided with the character
    blocks.forEach((block) => {
        const blockRect = block.getBoundingClientRect();
        
        // Check if the block has moved off the left side of the screen
        if (blockRect.right <= 0) {
          // Remove the block from the DOM
          block.remove();
        } 
        // Check if the block is colliding with the character
        else if (isColliding(block, character)) {
          // Perform actions when collision occurs (e.g., stop the game, initiate character hit animation, show game over screen)
          cancelAnimationFrame(animationFrameId);
          character.hit();
          showGameOverScreen();
          block.remove();
        }
      });


    // Request the next frame to continue the animation loop
    requestAnimationFrame(updateBlocks);
  }


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
 // Call the function to increase the score
 increaseScore();

    displayGameOver();
  
    // Stop the game loop
    cancelAnimationFrame(moveCharacter);
  
    // Adjust the character's position or reset the game state if desired
  }
  function increaseScore() {
    let score = 0; // initialize the score
  
    function updateScoreDisplay() {
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = score; // update the score display in the HTML
    }
  
    score += 1; // increment the score by 1
    updateScoreDisplay(); // update the score display
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

function moveObstacles() {
    const obstacles = document.querySelectorAll(".obstacle");
  
    obstacles.forEach((obstacle) => {
      const currentOffset = parseFloat(obstacle.style.left);
  
      // Update the obstacle's position based on its speed
      const obstacleSpeed = 2; // Adjust the speed as needed
      const newOffset = currentOffset - obstacleSpeed;
  
      // Update the left position of the obstacle
      obstacle.style.left = `${newOffset}px`;
    });
  }
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
  blocks.forEach((block) => {
    const blockRect = block.getBoundingClientRect();
    
    // Check if the block has moved off the left side of the screen
    if (blockRect.right <= 0) {
      // Remove the block from the DOM
      block.remove();
    } 
    // Check if the block is colliding with the character
    else if (isColliding(block, character)) {
      // Perform actions when collision occurs (e.g., stop the game, initiate character hit animation, show game over screen)
      cancelAnimationFrame(animationFrameId);
      character.hit();
      showGameOverScreen();
      block.remove();
    }
  });
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