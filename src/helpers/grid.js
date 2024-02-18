import dungeon from "../dungeonMap/dungeon.json";

export const gridCells = n => {
    return n * 16;
}

let collisions = dungeon.layers.find(layer => layer.name === 'boundaries').data;
  
export const collisionMap = [];

for (let i = 0; i < collisions.length; i += 75) {
  collisionMap.push(collisions.slice(i, i + 75));
}