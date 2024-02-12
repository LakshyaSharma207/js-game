import k from "./kaboomContext.js";
import world from './scenes/world.js'

// load sprite sheet based on rows and columns
k.loadSprite("assets", "./assets/topdownasset.png", {
    sliceX: 39,
    sliceY: 31,
});

const scenes = {
    "world": world,
};

for (const sceneName in scenes) {
    k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("world")