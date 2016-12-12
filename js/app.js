// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // set initial location
    this.x = x;
    this.y = y;

    // set speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // reset the location if the enemy moves off canvas
    if (this.x > document.getElementsByTagName("canvas")[0].width) {
        this.x = -this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // set the image
    this.sprite = "images/char-boy.png";

    // set initial location
    this.x = x;
    this.y = y;
};

// update the player's location
Player.prototype.update = function(x, y) {
    if (x === undefined || y === undefined) {
        return;
    }

    this.x = x;
    this.y = y;
};

// draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// move the player
Player.prototype.handleInput = function(direction) {
    // units to move per input
    var displacement = 60;

    var canvas = document.getElementsByTagName("canvas")[0];
    var playerSprite = window.Resources.get("images/char-boy.png");

    switch (direction) {
        case "left":
            if (this.x - displacement >= 0) {
                this.update(this.x - displacement, this.y);
            } else {
                this.update(0, this.y);
            }

            break;
        case "up":
            if (this.y - displacement >= 0) {
                this.update(this.x, this.y - displacement);
            } else {
                this.update(this.x, 0);
            }

            break;
        case "right":
            if (this.x + displacement + playerSprite.width <= canvas.width) {
                this.update(this.x + displacement, this.y);
            } else {
                this.update(canvas.width - playerSprite.width, this.y);
            }

            break;
        case "down":
            if (this.y + displacement + playerSprite.height <= canvas.height) {
                this.update(this.x, this.y + displacement);
            } else {
                this.update(this.x, canvas.height - playerSprite.height);
            }

            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(50, 50, 130)];
var player = new Player(270, 270);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
