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
import { Hud } from './src/objects/hud/hud.js';
import { Wumpus } from './src/objects/wumpus/wumpus.js';
import { Boundary } from './src/boundary.js';
import { Astar } from './src/A-star.js';
import { spawnCoins } from './src/helpers/spawnCoins.js';
import { events } from './src/events.js';

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

// coins sprite randomly generated
let coinsArray = spawnCoins(11, 58, 1, 38, 20);
for (let i = 0; i < coinsArray.length; i++) {
  mainScene.addChild(coinsArray[i]);
}

// hero game object added
const hero = new Hero(gridCells(16), gridCells(4));
mainScene.addChild(hero);

// wumpus game object added
const wumpus = new Wumpus(gridCells(12), gridCells(1), hero.position, hero.facingDirection);
mainScene.addChild(wumpus);

// adding foreground
const foreGround = new Sprite({
  resource: resources.images.foreground,
  frameSize: new Vector2(1200, 720),
});
mainScene.addChild(foreGround);

// A star Pathfinding
mainScene.astarPathFind = new Astar();

// camera
const camera = new Camera();
mainScene.addChild(camera);

// hud UI
const hud = new Hud();

// add input class to move character
mainScene.input = new KeyInput();

// add gameover flag
mainScene.gameOver = false;
var coinCount = 0;

// checking for exit vectors
events.on("character_pos", this, (heroPosition) => {
  const roundedX = Math.round(heroPosition.x);
  const roundedY = Math.round(heroPosition.y);

  if ((roundedX === 528 && roundedY === -16) || (roundedX === 512 && roundedY === -16)) {
     mainScene.gameOver = true;
  }
})

const draw =  () => {
  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mainScene.gameOver) {
    // console.log("game over")
    ctx.font = '40px sans-serif';
    ctx.fillText('Game Over', 60, 70);

    ctx.font = '20px sans-serif';
    ctx.fillText(`You Got: ${coinCount} coins`, 65, 100);
    let mssg;
    if (coinCount < 10) {
      mssg = 'Better luck next time';
    } else if (coinCount > 10 && coinCount != 20) {
      mssg = "You're there... just hang on and replay.";
    } else if (coinCount >= 20) {
      mssg = "Great Job getting all coins. Now give me all the marks for mini project as well ;)";
    }
    ctx.fillText(`${mssg}`, 65, 130);

  } else {
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
    coinCount = hud.coinCount;
    ctx.fillText(`X ${coinCount}`, 20, 14);
  }
}

// updating game state
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();