import { GameLoop } from './src/gameLoop';
import { gridCells } from './src/helpers/grid';
import { KeyInput } from './src/keyInput';
import { resources } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import './style.css'
import { GameObject } from './src/gameObject.js';
import { Hero } from './src/objects/hero/hero.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
  position: new Vector2(0, 0)
});

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

// hero sprite
const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

// add input class to move character
mainScene.input = new KeyInput();

const draw =  () => {
  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sky
  skySprite.drawImage(ctx, 0, 0)

  // draw all objects in main scene
  mainScene.draw(ctx, 0, 0);
}

// updating game state
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}


const gameLoop = new GameLoop(update, draw);
gameLoop.start();