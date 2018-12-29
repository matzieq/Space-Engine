/*
    This is a generic class for all types of game objects, or sprites.
    It currently only draws coloured rectangles, but it can set horizontal and vertical speed
    which is adjusted for framerate, as well as check collisions with other objects.
*/

export default class GameObject {
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
