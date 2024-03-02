import { Animations } from "../../animations";
import { events } from "../../events";
import { FrameIndexPattern } from "../../frameIndexPattern";
import { GameObject } from "../gameObject";
import moveTowards from "../../helpers/moveTowards";
import { DOWN, LEFT, RIGHT, UP } from "../../keyInput";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import { hitDown, hitLeft, hitRight, hitUP, standDown, standLeft, standRight, standUP, walkDown, walkLeft, walkRight, walkUP } from "./heroAnimation";

export class Hero extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -19),
        })
        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.agent,
            frameSize: new Vector2(32, 32),
            hFrames: 23,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -13),
            animations: new Animations({
              walkDown: new FrameIndexPattern(walkDown),
              walkUp: new FrameIndexPattern(walkUP),
              walkLeft: new FrameIndexPattern(walkLeft),
              walkRight: new FrameIndexPattern(walkRight),
              standDown: new FrameIndexPattern(standDown),
              standUp: new FrameIndexPattern(standUP),
              standLeft: new FrameIndexPattern(standLeft),
              standRight: new FrameIndexPattern(standRight),
              hitDown: new FrameIndexPattern(hitDown),
              hitUP: new FrameIndexPattern(hitUP),
              hitLeft: new FrameIndexPattern(hitLeft),
              hitRight: new FrameIndexPattern(hitRight),
            })
          });
        
        this.addChild(this.body);
        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.canWalk = true;
        this.isHit = false;
        this.hitTimer = null;

        
    }

    step(delta, root) {
        const distance = moveTowards(this, this.destinationPosition, 2);
        const hasArrived = distance <= 1;
        if (hasArrived) {
            this.tryMove(root);
        }

        this.tryEmitPosition();        
    }

    tryEmitPosition() {
        if (this.lastX === this.position.x && this.lastY === this.position.y) {
          return;
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("hero_position", this.position)
        // events.emit("hero_hit", this.isHit)
    }
    

    tryMove(root) {
        const {input} = root;

        if (!input.direction) {
            if (this.isHit) {
                switch (this.facingDirection) {
                    case DOWN:
                        this.body.animations.play("hitDown");
                        break;
                    case LEFT:
                        this.body.animations.play("hitLeft");
                        break;
                    case RIGHT:
                        this.body.animations.play("hitRight");
                        break;
                    case UP:
                        this.body.animations.play("hitUP");
                        break;
                }
            }
            else {
                switch (this.facingDirection) {
                    case DOWN:
                        this.body.animations.play("standDown");
                        break;
                    case LEFT:
                        this.body.animations.play("standLeft");
                        break;
                    case RIGHT:
                        this.body.animations.play("standRight");
                        break;
                    case UP:
                        this.body.animations.play("standUp");
                        break;
                }
            }
            return;
        }
        
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;
        
        switch (input.direction) {
            case "UP":
                nextY -= gridSize;
                if (this.isHit) {
                    this.body.animations.play("hitUP");
                } else {
                    this.body.animations.play("walkUp");
                }
                break;
            case "DOWN":
                nextY += gridSize;
                if (this.isHit) {
                    this.body.animations.play("hitDown");
                } else {
                    this.body.animations.play("walkDown");
                }
                break;
            case "LEFT":
                nextX -= gridSize;
                if (this.isHit) {
                    this.body.animations.play("hitLeft");
                } else {
                    this.body.animations.play("walkLeft");
                }
                break;
            case "RIGHT":
                nextX += gridSize;
                if (this.isHit) {
                    this.body.animations.play("hitRight");
                } else {
                    this.body.animations.play("walkRight");
                }
                break;
        }
        // checking for wumpus attack
        events.on("check_attacking", this, (pos) => {
            
            if (this.destinationPosition.x >= pos.minX && this.destinationPosition.x <= pos.maxX && this.destinationPosition.y >= pos.minY && this.destinationPosition.y <= pos.maxY) {
                // objects overlapped
                console.log('work pls')
                clearTimeout(this.hitTimer);
                this.hitTimer = setTimeout(() => {
                    this.isHit = false;
                }, 1000);
                this.isHit = true;
            }
        });
        this.facingDirection = input.direction ?? this.facingDirection;
        
        // is the place character movig to solid or ground?
        this.canWalk = true;
        this.isSpaceFree(new Vector2(nextX, nextY))
        if (this.canWalk) {
            this.destinationPosition.y = nextY;
            this.destinationPosition.x = nextX;
        }
    }

    isSpaceFree (pos) {
        events.emit("character_pos", pos)  // checking future position

        events.on("check_collision", this, (object) => {
            this.canWalk = false;
       })
    //    console.log(this.canWalk);
    }
}