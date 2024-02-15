import { GameLoop } from './src/gameLoop';
import { KeyInput } from './src/keyInput';
import { resources } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import './style.css'

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
});

const shadowSprite = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroPos = new Vector2(16 * 6, 16 * 5);

const draw =  () => {
  groundSprite.drawImage(ctx, 0, 0);

  hero.drawImage(ctx, heroPos.x - 8, heroPos.y - 21);
  shadowSprite.drawImage(ctx, heroPos.x - 8, heroPos.y - 21);
}

const keyInput = new KeyInput();
const update = () => {
  // console.log(keyInput.direction);
  if (keyInput.direction === "UP") {
    heroPos.y -= 1;
    hero.frame = 6;
  } 
  else if (keyInput.direction === "DOWN") {
      heroPos.y += 1;
      hero.frame = 0;
  } 
  else if (keyInput.direction === "LEFT") {
      heroPos.x -= 1;
      hero.frame = 9;
  } 
  else if (keyInput.direction === "RIGHT") {
      heroPos.x += 1;
      hero.frame = 3;
  }
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();