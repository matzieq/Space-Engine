/**
 *  SPACE ENGINE by President of Space
 *          v. 0.01
 *  A simple framework for simple arcade-style games
 */

let SpaceEngine = {};

/*
    This is a generic class for all types of game objects, or sprites.
    It currently only draws coloured rectangles, but it can set horizontal and vertical speed
    which is adjusted for framerate, as well as check collisions with other objects.
*/
SpaceEngine.GameObject = class  {
    constructor (x, y, width, height, color, gameContext) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = { x: 0, y: 0 };
        this.gameContext = gameContext;
    }

    /**
        Currently only draws rectangles, TODO: add optional image parameter to allow for images
     */
    draw () {
        this.gameContext.colorRect(this.x, this.y, this.width, this.height, this.color)
    }


    /*
        Currently only updates position of the object based on speed.
    */
    update (dt) {
        this.x += dt * this.speed.x;
        this.y += dt * this.speed.y;
    }

    /*
        This returns true or false
        other object is of GameObject type
    */
    collidesWithObject(otherObject) {
        return (
            Math.abs(otherObject.x - this.x) < Math.max(otherObject.width, this.width) &&
            Math.abs(otherObject.y - this.y) < Math.max(otherObject.height, this.height)
        );     
    }
}

/*
    This is a building block for the simple level manager. Currently it only holds data on
    objects present in that level.
*/
SpaceEngine.Level = class {
    constructor(game) {
        this.levelObjectList = [];
        this.game = game;
        this.blackBackground = this.createGameObject(0, 0, game.width, game.height, '#000');
    }

    createGameObject (x, y, width, height, color) {
        const newObject = new SpaceEngine.GameObject(x, y, width, height, color, this.game);
        this.levelObjectList.push(newObject);
        return newObject;
    }
}

SpaceEngine.Keyboard = class {
    constructor() {
        this.LEFT_ARROW = 37;
        this.UP_ARROW = 38;
        this.RIGHT_ARROW = 39;
        this.DOWN_ARROW = 40;

        this.SPACEBAR = 32;
        this.ENTER = 13;
        this.ESCAPE = 27;

        this.isKeyDown = {
            left: false,
            right: false,
            up: false,
            down: false,
            spacebar: false,
            enter: false,
            escape: false
        }

        document.addEventListener('keydown', (e) => {
            this.keyDownHandler(e);
        });
        
        document.addEventListener('keyup', (e) => {
            this.keyUpHandler(e);
        });
    }

    keyDownHandler(event) {
        switch (event.keyCode) {
            case this.LEFT_ARROW:
                this.isKeyDown.left = true;
                break;
            case this.RIGHT_ARROW:
                this.isKeyDown.right = true;
                break;
            case this.UP_ARROW:
                this.isKeyDown.up = true;
                break;
            case this.DOWN_ARROW:
                this.isKeyDown.down = true;
                break;
            case this.SPACEBAR:
                this.isKeyDown.spacebar = true;
                break;
            case this.ENTER:
                this.isKeyDown.enter = true;
                break;
            case this.ESCAPE:
                this.isKeyDown.escape = true;
                break;
        }
    }

    keyUpHandler(event) {
        switch (event.keyCode) {
            case this.LEFT_ARROW:
                this.isKeyDown.left = false
                break;
            case this.RIGHT_ARROW:
                this.isKeyDown.right = false;
                break;
            case this.UP_ARROW:
                this.isKeyDown.up = false;
                break;
            case this.DOWN_ARROW:
                this.isKeyDown.down = false;
                break;
            case this.SPACEBAR:
                this.isKeyDown.spacebar = false;
                break;
            case this.ENTER:
                this.isKeyDown.enter = false;
                break;
            case this.ESCAPE:
                this.isKeyDown.escape = false;
                break;
        }
    }
}

/*
    This is the main class which creates the game. First it creates a canvas element and one level.
    TODO: Resolve whether to use named levels or just numbers (object or array)
*/
SpaceEngine.Game = class {
    constructor(width, height) {
        const canvasElement = document.createElement('canvas');
        canvasElement.id = 'canvas';
        canvasElement.height = height;
        canvasElement.width = width;
        document.querySelector("body").prepend(canvasElement);

        this.width = width;
        this.height = height;
        this.ctx = canvasElement.getContext('2d');

        //each level holds object data for a single scene
        this.levelList = [];
        this.currentLevel = 0;

        this.levelList[this.currentLevel] = new SpaceEngine.Level(this);

        console.log(this.levelList);
        
        //this is used to calculate deltatime
        this.initialTime = 0;
        window.requestAnimationFrame((timestamp) => {
            this.step(timestamp);
        });
    }

    /*
        TODO: maybe move it to another helper class or helper object (imitating a static class)
    */
    colorRect (x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }


    /*
        This just calls the current level's createGameObject, but it's neat to haver it here.
    */
    createGameObject (x, y, width, height, color) {
        const newObject = this.levelList[this.currentLevel].createGameObject(x, y, width, height, color);
        return newObject;
    }

    /**
        This iterates over all game objects in the current level, drawing and updating each one. 
     */
    drawAndUpdateObjects(dt) {       
        for (let gameObject of this.levelList[this.currentLevel].levelObjectList) {
            gameObject.draw();
            gameObject.update(dt);
        }
    }

    /*
        Game logic goes here. TODO: add an init function
    */
    update() {
        //empty
    }

    /*
        This is called every frame. It calculates delta time, calls the drawAndUpdateObjects
        function and then the main update function which contains game logic.
    */
    step(timeFromLastFrame) {
        //the multiplication is in order for this to be expressed in seconds instead of milliseconds, which makes
        //speed values less ridiculous
        let dt = (timeFromLastFrame - this.initialTime) * 0.001;
        this.initialTime = timeFromLastFrame;
        this.drawAndUpdateObjects(dt);
        this.update();
        window.requestAnimationFrame((timestamp) => {
            this.step(timestamp);
        });
    }
}