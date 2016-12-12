// Characters, superclass of enemies and player
var Character = function(sprite) {
    this.sprite = sprite;

    this.x = 0;
    this.y = 0;
};

// draw the character
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    Character.call(this, "images/enemy-bug.png");

    // set initial location
    this.x = x;
    this.y = y;

    // set speed
    this.speed = speed;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

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

    // reset the player if the enemy collides with him
    if (this.collideWithPlayer(player)) {
        player.reset();
    }
};

// check if the enemy collides with the player
Enemy.prototype.collideWithPlayer = function(player) {
    var enemySprite = window.Resources.get(this.sprite)
    var playerSprite = window.Resources.get(player.sprite);

    if (this.x + enemySprite.width < player.x ||
        this.x > player.x + playerSprite.width ||
        this.y + enemySprite.height < player.y ||
        this.y > player.y + playerSprite.height) {
        return false;
    }

    return true;
};


var Player = function() {
    Character.call(this, "images/char-boy.png");

    // set initial location
    this.reset();
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// update the player's location
Player.prototype.update = function(x, y) {
    if (x === undefined || y === undefined) {
        return;
    }

    this.x = x;
    this.y = y;
};

// move the player
Player.prototype.handleInput = function(direction) {
    // units to move per input
    var displacement = 60;

    var canvas = document.getElementsByTagName("canvas")[0];
    var playerSprite = window.Resources.get(player.sprite);

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

    // reset the location if the player reaches the water
    if (this.y === 0) {
        this.reset();
    }
};

Player.prototype.reset = function() {
    this.x = 270;
    this.y = 270;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(50, 50, 130)];
var player = new Player();


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
