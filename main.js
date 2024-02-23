import './style.css'
import { GameLoop } from './src/gameLoop';
import { collisionMap, gridCells } from './src/helpers/grid';
import { KeyInput } from './src/keyInput';
import { resources } from './src/resource';
import { Sprite } from './src/sprite';
import { Vector2 } from './src/vector2';
import { GameObject } from './src/objects/gameObject.js';
import { Hero } from './src/objects/hero/hero.js';
import { Camera } from './src/camera.js';
import { Coins } from './src/objects/coins/coins.js';
import { Hud } from './src/objects/hud/hud.js';
import { Wumpus } from './src/objects/wumpus/wumpus.js';
import { Boundary } from './src/boundary.js';
import { Astar } from './src/A-star.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Comic Sans MS";
ctx.fillStyle = "white";

const mainScene = new GameObject({
  position: new Vector2(0, 0)
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(1200, 720),
});
mainScene.addChild(groundSprite);

// coins sprite
const coins = new Coins(gridCells(7), gridCells(6));
mainScene.addChild(coins);

// add boundaries
export const boundaries = [];

collisionMap.forEach((row, i) => {
  row.forEach((value, j) => {
    if (value === 197) {
      boundaries.push(
        new Boundary({
          position: {
            x: gridCells(j),
            y: gridCells(i)
          }
        })
      )
    }
  })
});
boundaries.forEach(b => mainScene.addChild(b));
// console.log(mainScene);


// hero game object added
const hero = new Hero(gridCells(6), gridCells(4));
mainScene.addChild(hero);

// wumpus game object added
const wumpus = new Wumpus(gridCells(1), gridCells(1), hero.position);
mainScene.addChild(wumpus);

// A star Pathfinding
mainScene.pathFind = new Astar();

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

  // draw boundaries
  // boundaries.forEach(b => b.draw(ctx, 0, 0));
}

// updating game state
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();