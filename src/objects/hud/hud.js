import { events } from "../../events";
import { GameObject } from "../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";

export class Hud extends GameObject {
    constructor() {
        super({
            position: new Vector2(0, 1)
        });
        this.coinCount = 0;

        const ui = new Sprite({
            resource: resources.images.coins,
            position: new Vector2(0, 0),
            hFrames: 5,
            vFrames: 1,
            frame: 4,
        })
        this.addChild(ui);

        // react to hero picking up a coin
        events.on("picks_up_coin", this, (pos) => {
            this.coinCount += 1;
        })
    }
}