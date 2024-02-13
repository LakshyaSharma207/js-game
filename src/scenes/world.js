import { drawTiles, fetchMapData } from "../utils/utils.js";

export default async function world(k) {
    const mapData = await fetchMapData("./assets/maps/world-test.json");
    
    // k.add([
    //     k.rect(k.canvas.width, k.canvas.height),
    //     k.color(0, 0, 10),
    //     k.fixed(), 
    // ])

    const map = k.add([
        k.pos(0, 0),
    ])

    const entities = {
        "player": null,
        "slimes": [],
    }

    const layers = mapData.layers;
    for (const layer of layers) {
        if (layer.name === "Boundaries") {
            // TODO
            continue;
        }
        if (layer.name === "SpawnPoints") {
            // TODO
            continue;
        }

        // DRAW TILES 
        drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
    }
}