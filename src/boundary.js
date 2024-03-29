import { events } from "./events";
import { GameObject } from "./objects/gameObject";
import { Vector2 } from "./vector2";

export class Boundary extends GameObject {
    constructor({position}) {
        super({
            position: new Vector2(0, 0)
        });
        this.position = position;
        this.height = 16;
        this.width = 16;

        events.on("character_pos", this, (heroPosition) => {
            const roundedX = Math.round(heroPosition.x);
            const roundedY = Math.round(heroPosition.y);

            if (roundedX === this.position.x && roundedY === this.position.y) {
               // objects overlapp
               this.onCollideWithHero();
            }
       })
    }

    onCollideWithHero() {
        events.emit("check_collision", this.position);
    }

    drawImage(ctx, x, y) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.0";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}