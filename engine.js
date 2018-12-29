let SpaceEngine = {};


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

    draw () {
        this.gameContext.colorRect(this.x, this.y, this.width, this.height, this.color)
    }

    update (dt) {
        this.x += dt * this.speed.x;
        this.y += dt * this.speed.y;
    }

    //other object is of GameObject type
    collidesWithObject(otherObject) {
        return (
            Math.abs(otherObject.x - this.x) < Math.max(otherObject.width, this.width) &&
            Math.abs(otherObject.y - this.y) < Math.max(otherObject.height, this.height)
        );     
    }
}

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

    colorRect (x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    createGameObject (x, y, width, height, color) {
        const newObject = this.levelList[this.currentLevel].createGameObject(x, y, width, height, color);
        return newObject;
    }

    drawAndUpdateObjects(dt) {       
        for (let gameObject of this.levelList[this.currentLevel].levelObjectList) {
            gameObject.draw();
            gameObject.update(dt);
        }
    }

   
    update() {
        //empty function to override
    }

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