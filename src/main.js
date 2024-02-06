import k from "./kaboomContext.js";

const scenes = {
    "world": () => {},
};

for (const sceneName in scenes) {
    k.scene(sceneName);
}