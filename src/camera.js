import { events } from "./events";
import { GameObject } from "./objects/gameObject";
import { Vector2 } from "./vector2";

export class Camera extends GameObject {
    constructor() {
        super({});

        events.on("hero_position", this, (heroPosition) => {

            // create a new position based on hero position
            const halfWidth = -8 + 320 / 2;
            const halfHeight = -8 + 180 / 2;

            // console.log("Moved, ", heroPosition);

            this.position = new Vector2(
                -heroPosition.x + halfWidth,
                -heroPosition.y + halfHeight
            )
        })
    }
}