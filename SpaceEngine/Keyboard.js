export default class Keyboard {
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