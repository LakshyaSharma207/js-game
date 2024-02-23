import { GameObject } from "../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import moveTowards from "../../helpers/moveTowards";
import { events } from "../../events";

export class Wumpus extends GameObject {
    constructor(x, y, heroPos) {
        super({
            position: new Vector2(x, y)
        })

        this.body = new Sprite({
            resource: resources.images.wumpus,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-9, -10),
            hFrames: 14,
            vFrames: 1,
            frame: 3,
        })
        this.addChild(this.body);
        this.destinationPosition = this.position.duplicate();
        // this.canWalk = true;
        this.heroPos = heroPos;
        this.path;
    }

    step(delta, root) {
        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 0;
        if (hasArrived) {
            this.tryMove(root);
        }     
    }

    tryMove(root) {
        const {pathFind} = root;

        const newPath = pathFind.findPath(this.position, this.heroPos);

        if (newPath) {
            this.path = newPath;
            console.log(this.path, 'path');
            if (this.path.direction === 'left') {
                this.destinationPosition.x -= 16;
            }
            else if (this.path.direction === 'right') {
                this.destinationPosition.x += 16;
            }
            else if (this.path.direction === 'up') {
                this.destinationPosition.y -= 16;
            }
            else if (this.path.direction === 'down') {
                this.destinationPosition.y += 16;
            }
            else {
                // ..
            }
        }
    }
}