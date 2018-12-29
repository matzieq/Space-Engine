import SpaceEngine from './SpaceEngine/SpaceEngine.js';

let game = new SpaceEngine.Game(800, 600);

let keys = new SpaceEngine.Keyboard();

let paddle = game.createGameObject(300, 200, 80, 10, '#fff');
let ball = game.createGameObject(300, 200, 8, 8, '#fff');

ball.speed.x = 50;


game.update = function() {
    paddle.speed.x = 0;
    if (keys.isKeyDown.left) {
        paddle.speed.x = -100;
    }

    if (keys.isKeyDown.right) {
        paddle.speed.x = 100;
    }
}
