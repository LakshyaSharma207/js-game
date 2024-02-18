import { GameObject } from "../../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class Wumpus extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        })

        const body = new Sprite({
            resource: resources.images.wumpus,
            frameSize: new Vector2(16, 16),
            position: new Vector2(0, 0),
            hFrames: 4,
            vFrames: 1,
            frame: 1,
        })

        this.addChild(body);
    }
}