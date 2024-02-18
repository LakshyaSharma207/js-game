import { GameLoop } from './src/gameLoop';
import { gridCells } from './src/helpers/grid';
import { KeyInput } from './src/keyInput';
import { resources } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import './style.css'
import { GameObject } from './src/gameObject.js';
import { Hero } from './src/objects/hero/hero.js';
import { Camera } from './src/camera.js';
import { Coins } from './src/objects/coins/coins.js';
import { Hud } from './src/objects/hud/hud.js';
import { Wumpus } from './src/objects/wumpus/wumpus.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Comic Sans MS";
ctx.fillStyle = "white";

const mainScene = new GameObject({
  position: new Vector2(0, 0)
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

// coins sprite
const coins = new Coins(gridCells(7), gridCells(6));
mainScene.addChild(coins);

// hero sprite
const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

// wumpus sprite
const wumpus = new Wumpus(gridCells(11), gridCells(5));
mainScene.addChild(wumpus);

// camera
const camera = new Camera();
mainScene.addChild(camera);

// hud UI
const hud = new Hud();

// add input class to move character
mainScene.input = new KeyInput();

const draw =  () => {
  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // save current state for camera to work
  ctx.save();
  // offset canvas
  ctx.translate(camera.position.x, camera.position.y);

  // draw all objects in main scene
  mainScene.draw(ctx, 0, 0);

  // restore canvas
  ctx.restore();

  // draw hud ui
  hud.draw(ctx, 0, 0);
  let coinCount = hud.coinCount;
  ctx.fillText(`X ${coinCount}`, 20, 14);
}

// updating game state
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();