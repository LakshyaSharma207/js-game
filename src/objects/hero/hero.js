import { Animations } from "../../animations";
import { events } from "../../events";
import { FrameIndexPattern } from "../../frameIndexPattern";
import { GameObject } from "../../gameObject";
import { isSpaceFree } from "../../helpers/grid";
import moveTowards from "../../helpers/moveTowards";
import { DOWN, LEFT, RIGHT, UP } from "../../keyInput";
import { walls } from "../../levels/level1";
import { resources } from "../../resource";
import { Sprite } from "../../sprite";
import { Vector2 } from "../../vector2";
import { standDown, standLeft, standRight, standUP, walkDown, walkLeft, walkRight, walkUP } from "./heroAnimation";

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
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -20),
            animations: new Animations({
              walkDown: new FrameIndexPattern(walkDown),
              walkUp: new FrameIndexPattern(walkUP),
              walkLeft: new FrameIndexPattern(walkLeft),
              walkRight: new FrameIndexPattern(walkRight),
              standDown: new FrameIndexPattern(standDown),
              standUp: new FrameIndexPattern(standUP),
              standLeft: new FrameIndexPattern(standLeft),
              standRight: new FrameIndexPattern(standRight),
            })
          });
        
        this.addChild(this.body);
        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
    }

    step(delta, root) {
        const distance = moveTowards(this, this.destinationPosition, 1);
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
      }
    

    tryMove(root) {
        const {input} = root;

        if (!input.direction) {
            if (this.facingDirection === DOWN) {
            this.body.animations.play("standDown");
            }
            else if (this.facingDirection === LEFT) { 
            this.body.animations.play("standLeft")
            }
            else if (this.facingDirection === RIGHT) { 
            this.body.animations.play("standRight")
            }
            else if (this.facingDirection === UP) { 
            this.body.animations.play("standUp")
            }
            return;
        }
        
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;
        
        if (input.direction === "UP") {
            nextY -= gridSize;
            this.body.animations.play("walkUp");
        } 
        else if (input.direction === "DOWN") {
            nextY += gridSize;
            this.body.animations.play("walkDown");
        } 
        else if (input.direction === "LEFT") {
            nextX -= gridSize;
            this.body.animations.play("walkLeft");
        } 
        else if (input.direction === "RIGHT") {
            nextX += gridSize;
            this.body.animations.play("walkRight");
        }
        this.facingDirection = input.direction ?? this.facingDirection;
        
        // is the place character movig to solid or ground?
        if (isSpaceFree(walls, nextX, nextY)) {
            this.destinationPosition.y = nextY;
            this.destinationPosition.x = nextX;
        }
    }
}