import { boundaries } from "../../main";
import { Coins } from "../objects/coins/coins";
import { Vector2 } from "../vector2";
import { gridCells } from "./grid";

export function spawnCoins(minX, maxX, minY, maxY, n) {
    let coinsArray = [];
    for (let i = 0; i < n; i++) { 
        let randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        if (checkFreeSpace(new Vector2(gridCells(randomX), gridCells(randomY)))){
            let coin = new Coins(gridCells(randomX), gridCells(randomY));
            coinsArray.push(coin);
        }
        else {
            continue;
        }
    }
    // important, function returns a coin array to be iterated.
    return coinsArray;
}

function checkFreeSpace(pos) {
    let isSpaceFree = !boundaries.some((b) => {
        if (b.position.x === pos.x && b.position.y === pos.y) {
          return true;
        }
      });
      return isSpaceFree;
}