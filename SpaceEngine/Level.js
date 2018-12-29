import GameObject from './GameObject.js';

/*
    This is a building block for the simple level manager. Currently it only holds data on
    objects present in that level.
*/
export default class Level {
    constructor(game) {
        this.levelObjectList = [];
        this.game = game;
        this.blackBackground = this.createGameObject(0, 0, game.width, game.height, '#000');
    }

    createGameObject (x, y, width, height, color) {
        const newObject = new GameObject(x, y, width, height, color, this.game);
        this.levelObjectList.push(newObject);
        return newObject;
    }
}