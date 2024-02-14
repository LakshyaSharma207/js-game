import { resources } from './src/resource';
import './style.css'

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const draw =  () => {
  const sky = resources.images.sky;
  if (sky.isLoaded) {
    ctx.drawImage(sky.image, 0, 0);
  }

  const ground = resources.images.ground;
  if (ground.isLoaded) {
    ctx.drawImage(ground.image, 0, 0);
  }
}

setInterval(() => {
  draw();
}, 300)