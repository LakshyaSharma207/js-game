export async function fetchMapData(mapPath) {
    const response = await fetch(mapPath);
    return await response.json();
}

export function drawTiles(k, map, layer, tileheight, tilewidth) {
    let noOfDrawnTiles = 0;
    const tilePos = k.vec2(100, 100);
    for (const tile of layer.data) {
        if (noOfDrawnTiles % layer.width === 0) {
            tilePos.x = 0;
            tilePos.y += tileheight;
        } else {
            tilePos.x += tilewidth;
        }

        noOfDrawnTiles ++;
        if (tile === 0) continue;

        map.add([
            k.sprite("assets", { frame: tile - 1 }),
            k.pos(tilePos),
            k.offscreen(),
        ])
    }
}