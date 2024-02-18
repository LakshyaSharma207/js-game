import { Animations } from "../../animations";
import { events } from "../../events";
import { FrameIndexPattern } from "../../frameIndexPattern";
import { GameObject } from "../../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import { rotate } from "./coinAnimation";

export class Coins extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });

        const body = new Sprite({
            resource: resources.images.coins,
            position: new Vector2(0, -5),
            hFrames: 5,
            vFrames: 1,
            frame: 0,
            animations: new Animations({
                rotate: new FrameIndexPattern(rotate)
            })
        })
        this.addChild(body);
    }

    ready() {
        events.on("hero_position", this, (heroPosition) => {
            const roundedX = Math.round(heroPosition.x);
            const roundedY = Math.round(heroPosition.y);

            if (roundedX === this.position.x && roundedY === this.position.y) {
               // objects overlapped
               this.onCollideWithHero();
            }
       })
    }

    onCollideWithHero() {
        this.destroy()

        // alert hud that coin was picked
        events.emit("picks_up_coin", this.position);
    }
}