import { GameObject } from "../gameObject";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import moveTowards from "../../helpers/moveTowards";
import { Animations } from "../../animations";
import { FrameIndexPattern } from "../../frameIndexPattern";
import { attacking, chase, idle } from "./wumpusAnimation";
import { events } from "../../events";

export class Wumpus extends GameObject {
    constructor(x, y, heroPos, heroDir) {
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
            animations: new Animations({
                idle: new FrameIndexPattern(idle),
                chase: new FrameIndexPattern(chase),
                attack: new FrameIndexPattern(attacking),
            })
        })
        this.addChild(this.body);
        this.destinationPosition = this.position.duplicate();
        this.heroDir = heroDir;
        this.heroPos = heroPos;
        this.path;
        this.hitbox = 34;
    }

    step(delta, root) {
        const distance = moveTowards(this, this.destinationPosition, 1.7);
        const hasArrived = distance <= 0;
        if (hasArrived) {
            this.tryMove(root);
        }     
    }

    tryMove(root) {
        const {astarPathFind} = root;
        const gridSize = 16;

        let nextXY = this.destinationPosition.duplicate();
        let newHeroPos = this.heroPos.duplicate();
        // new feature still in beta
        if (this.heroDir === DOWN) {
            newHeroPos = new Vector2(this.heroPos.x, this.heroPos.y + (gridSize * 2));
        }
        else if (this.heroDir === UP) {
            newHeroPos = new Vector2(this.heroPos.x, this.heroPos.y - (gridSize * 2));
        } 
        else if (this.heroDir === LEFT) {
            newHeroPos = new Vector2(this.heroPos.x - (gridSize * 2), this.heroPos.y);
        } 
        else if (this.heroDir === RIGHT) {
            newHeroPos = new Vector2(this.heroPos.x + (gridSize * 2), this.heroPos.y);
        } 

        // finds the path using A star and returns immedeate node to travel
        const newPath = astarPathFind.findPath(nextXY, newHeroPos);

        if (newPath) {
            this.path = newPath;
            const hitboxObject = {
                minX: this.position.x - this.hitbox/2,
                maxX: this.position.x + this.hitbox/2,
                minY: this.position.y - this.hitbox/2,
                maxY: this.position.y + this.hitbox/2
            };            
            events.emit("check_attacking", hitboxObject);
            // console.log(this.path, 'path');
            switch (this.path.direction) {
                case 'left':
                    this.destinationPosition.x -= gridSize;
                    this.body.animations.play("chase");
                    break;
                case 'right':
                    this.destinationPosition.x += gridSize;
                    this.body.animations.play("chase");
                    break;
                case 'up':
                    this.destinationPosition.y -= gridSize;
                    this.body.animations.play("chase");
                    break;
                case 'down':
                    this.destinationPosition.y += gridSize;
                    this.body.animations.play("chase");
                    break;
                default:
                    this.body.animations.play("attack");
            }            
        }
    }
}