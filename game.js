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

var character = document.createElement("div");
character.className = "character";
gameScreen.appendChild(character);

function jump() {
  // Jump logic using the character element
  var initialTop = parseInt(character.style.top);
  var jumpHeight = 100;
  var jumpDuration = 500; // Adjust as needed

  var startTime = null;

  function jumpAnimation(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const progress = timestamp - startTime;
    const newPosition =
      initialTop - easeOut(progress / jumpDuration) * jumpHeight;

    character.style.top = newPosition + "px";

    if (progress < jumpDuration) {
      window.requestAnimationFrame(jumpAnimation);
    } else {
      startTime = null;
    }
  }

  function easeOut(t) {
    return t * (2 - t); // Simple cubic easing function
  }

  window.requestAnimationFrame(jumpAnimation);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    jump();
  }
});

var intervalId;

function startBlockGenerator() {
  intervalId = setInterval(generateBlock, 2000); // Add a new block every 2 seconds (adjust the interval as needed)
}

startBlockGenerator();

function updateBlocks() {
  var blocks = document.querySelectorAll(".block");

  blocks.forEach((block) => {
    // Update the position of each block (e.g., decrease the left position to move it from right to left)
    var currentOffset = parseInt(block.style.left);
    var newOffset = currentOffset - 1;
    block.style.left = newOffset + "px";

    if (isColliding(block, character)) {
      // Perform actions when collision occurs (e.g., stop the game, initiate character hit animation, show game over screen)
      clearInterval(intervalId);
      block.remove();
    }

    if (currentOffset < -block.offsetWidth) {
      block.remove();
    }
  });

  window.requestAnimationFrame(updateBlocks);
}

window.requestAnimationFrame(updateBlocks);