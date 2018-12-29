import GameObject from './GameObject.js';
import Level from './Level.js';
import Keyboard from './Keyboard.js';
/**
 *  SPACE ENGINE by President of Space
 *          v. 0.01
 *  A simple framework for simple arcade-style games
 */

/*
    This is the main class which creates the game. First it creates a canvas element and one level.
    TODO: Resolve whether to use named levels or just numbers (object or array)
*/
class Game {
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

        this.levelList[this.currentLevel] = new Level(this);

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

export default {Game, GameObject, Keyboard, Level};