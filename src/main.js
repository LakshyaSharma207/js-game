import k from "./kaboomContext.js";
import world from './scenes/world.js'

// load sprite sheet based on rows and columns
k.loadSprite("mapAssets", "./assets/0x72_16x16DungeonTileset.v5.png", {
    sliceX: 32,
    sliceY: 16,
});

const scenes = {
    "world": world,
};

for (const sceneName in scenes) {
    k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("world")