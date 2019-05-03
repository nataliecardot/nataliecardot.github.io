'use strict'; // Enables strict mode to catch common bloopers

const playAgainButton = document.querySelector('.play-again');
const restartButton = document.querySelector('.restart');

// Calls playAgain() function when user clicks reset icon in sidebar
restartButton.addEventListener('click', playAgain);

// Starts lives at 3
let lives = 3;

// X-axis (horizontal) values: (start from left)
let gemX = [17, 119, 220, 321, 422];

// Selects random index from gemX. Math.random returns a random number between 0 inclusive to 1 exclusive. So if were to produced 0.55, that would be multiplied by 5 (in this case), which equals 2.75, then Math.floor would round it down to the nearest integer (unless it's already an integer, which can only be 0), which equals 2, resulting in randomGemX equaling the third index, 220.
let randomGemX = gemX[Math.floor(Math.random() * gemX.length)];

// Y-axis (vertical) values (start from top)
let gemY = [124, 208, 290, 373];

let randomGemY = gemY[Math.floor(Math.random() * gemY.length)];

// Used to disable arrow keys while modal opened (used in handleInput() method in class Player)
let isDead = false;

let sidebarLives = document.querySelector('.lives-left');
sidebarLives.innerHTML = lives;

// Sets an initial player score of 0
let score = 0;

// Sets score shown in sidebar
let sidebarScore = document.querySelector('.score');
sidebarScore.innerHTML = score;

let modalScore = document.querySelector('.modal-score');
modalScore.innerHTML = score;

let enterPress = function(e) {
  let keyCode = e.keyCode;
  if (keyCode === 13) {
    modal.classList.remove('modal-visible');
    playAgain()
  }
};

// Called when user clicks restart button in sidebar or play again button in modal. Sets modal to display: none, resets lives and score, moves player back to starting position
function playAgain() {
  isDead = false;
  player.x = 200;
  player.y = 400;
  // Hides modal if present (if opened by game ending)
  modal.classList.remove('modal-visible');
  lives = 3;
  sidebarLives.innerHTML = lives;
  score = 0;
  sidebarScore.innerHTML = score;
  // Generates new gem of random color and random x and y value from arrays
  gem.x = gemX[Math.floor(Math.random() * gemX.length)];
  gem.y = gemY[Math.floor(Math.random() * gemY.length)];
  gem.sprite = collectibles[Math.floor(Math.random() * 3)];
  document.removeEventListener('keydown', enterPress);
}

// Note: In a constructor function "this" does not have a value. It is a substitute for the new object. The value of this will become the new object when a new object is created

// Note commas not used to separate methods and properties in a class
class Player {
  // Constructor function, a special function just for initializing new objects, will automatically run when a new object is constructed (with keyword "new") from this class. Contains data needed to create it
  constructor(x, y, speed) {
    this.sprites = []; // Bank of possible sprites
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.imgWidth = 101;    // sprite image width
    this.imgHeight = 171; // sprite image height
  }

  // Methods that all objects created from class will inherit. Would exist on prototype in pre-class way of writing it, but effect is the same (the following methods still exist on Player prototype [for example would be Player.prototype.update = function(dt)...])

  // When player reaches water, moves player back to starting position, and increase score by 1
  update() {
    if (this.y === 25) {
      this.x = 200;
      this.y = 400;
      score++;
      sidebarScore.innerHTML = score;
  	}
  }

  // Draws player on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  // Object containing character images is passed in as an argument in this method's call
  setSpriteBank(bank) {
    this.sprites = bank;
  }

  // Hidden p text from li items is passed into this method via forEach loop
  setSprite(char) {
    // This method is only called when li item (from variable characters) is clicked--then p text is passed as this method's argument. Object.keys() method returns array of given object's keys/property names, in ascending order. In this case they are from the playerSprites variable (object literal), which contains hidden p element text as keys and associated image's path as values, since this is passed in by call to setSpriteBank. If statement says if p text (key/property name) includes what is passed into this method, player sprite is set to value for that key
    if (Object.keys(this.sprites).includes(char)) {
      this.sprite = this.sprites[char];
    }
  }

  // If isDead is false (so it doesn't work when the modal is opened), connects keyboard input to player movement. If statements prevent player movement off screen
  handleInput(allowedKeys) {
    if (isDead) {
      return;
    }

    if (allowedKeys === 'down' && this.y < 425) {
      this.y += 25;
    }

		if (allowedKeys === 'up') {
			this.y -= 25;
		}

		if (allowedKeys === 'left' && this.x > 0) {
			this.x -= 25;
		}

		if (allowedKeys === 'right' && this.x < 400) {
			this.x += 25;
		}
  }
}

class Enemy {
// Sets enemy's initial location
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    // Sets speed of enemy
    this.speed = speed;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    // Multiplies enemy's movement by time delta to ensure game runs at same speed for all computers
    this.x += this.speed * dt;
    // Once enemy finished moving across screen, moves it back so it can cross screen again and randomizes its speed
    if (this.x > 500) {
      this.x = -75;
      // Math.random() function returns random number between 0 (inclusive) and 1 (exclusive). Math.floor() returns the largest integer less than or equal to a given number
      this.speed = 70 + Math.floor(Math.random() * 450);
    }

    // When collision occurs, subtracts a life, updates lives displayed in sidebar, and updates score that will be displayed in modal if no lives remaining
    if ((player.x < (this.x + 50)) && ((player.x + 17) > this.x) && (player.y < (this.y + 50)) && ((50 + player.y) > this.y)) {
  		player.x = 200;
  		player.y = 400;
      lives--;
      sidebarLives.innerHTML = lives;
      modalScore.innerHTML = score;
      if (lives === 0) {
        isDead = true;
        // Calls function that adds class that sets modal to display: block
        showModal();
      }
    }
  }

  // Draws enemy on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

class Gem {
  constructor(x, y) {
    // Math.random() function returns random number between 0 (inclusive) and 1 (exclusive). Math.floor() returns the largest integer less than or equal to a given number. Since collectibles is an array, starts at 0, so we want index 0, 1, or 2. (If Math.random were 0.99, it would would become 2.99 after being multiplied by 3, then Math.floor would make it 2)
    this.sprite = collectibles[Math.floor(Math.random() * 3)];
    this.x = randomGemX;
    this.y = randomGemY;
    this.imgWidth = 65;
    this.imgHeight = 88;
  }

  // Draws gem on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  update() {
    // Not sure why this if statement only works when player approaches gem from below (a higher y value)
    if ( ((Math.abs( (player.imgWidth + player.x) - (this.x + this.imgWidth) ) < 55)) && ((Math.abs( (player.imgHeight + player.y) - (this.y + this.imgHeight) ) < 55)) ) {
      // Generates new gem of random color and random x and y value from arrays
      this.x = gemX[Math.floor(Math.random() * gemX.length)];
      this.y = gemY[Math.floor(Math.random() * gemY.length)];
      this.sprite = collectibles[Math.floor(Math.random() * 3)];
      score += 5;
      sidebarScore.innerHTML = score;
    }
  }
}

const collectibles = [
  'images/Gem Blue Sm.png',
  'images/Gem Orange Sm.png',
  'images/Gem Green Sm.png'
];

// ENEMY/PLAYER/GEM OBJECT INSTANTIATION

let gem = new Gem(randomGemX, randomGemY);

// Y position of enemies (smaller number means higher up)
let enemyPosition = [61, 145, 227, 308];

let allEnemies = [];

let player = new Player(202, 396);

enemyPosition.forEach(function(posY) {
  // X position of 0 (out of view to the left of the game board), Y of whatever is passed in, and random speed within a range
  let enemy = new Enemy(0, posY, 70 + Math.floor(Math.random() * 450));
  allEnemies.push(enemy);
});

// MODAL

const modal = document.getElementById('myModal');
const closeIcon = document.querySelector('.close');

// When called, adds class that sets modal to display: block when player reaches water
function showModal() {
  modal.classList.add('modal-visible');

  // Calls playAgain() function when user clicks play again button in modal
  playAgainButton.addEventListener('click', playAgain);

  // If esc is pressed, closes modal and restarts game (note: keydown used instead of keypress because keypress only works for keys that produce a character value)
  document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode;
    if (keyCode === 27) {
      modal.classList.remove('modal-visible');
      playAgain();
    }
  });

  // If enter is pressed, closes modal and restarts game
  document.addEventListener('keydown', enterPress);

  // If user clicks modal's close icon, closes modal and restarts game
  closeIcon.addEventListener('click', function() {
    modal.classList.remove('modal-visible');
    playAgain();
  });
}

// Listens for keydown event (fired when a key is pressed down [regardless of whether it produces a character, unlike keypress]) and sends the keys to Player.handleInput() method
document.addEventListener('keydown', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // "player" needs to be lowercase because an instance of the class is needed
  player.handleInput(allowedKeys[e.keyCode]);
});

// Character selection controls

// Possible player sprites. Keys/property names are associated with hidden p text in each li element (which also contains images)
const playerSprites = {
  boy: 'images/char-boy.png',
  catGirl: 'images/char-cat-girl.png',
  hornGirl: 'images/char-horn-girl.png',
  pinkGirl: 'images/char-pink-girl.png',
  princess: 'images/char-princess-girl.png'
};

// Pushes in list to method in Player class
player.setSpriteBank(playerSprites);

// Returns static NodeList of li elements in (ul with) class .char-selector
const characters = document.querySelectorAll('.char-selector li');

// Iterate through li elements, adding event listener for each. When clicked the text from p (with attribute hidden) in li item will be passed to setSprite method in Player class (causing character to change accordingly) and game will be reset
characters.forEach(character => {
  character.addEventListener('click', () => {
    // Set sprite from user selection
    player.setSprite(character.querySelector('p').innerHTML);
    playAgain();
  });
});
