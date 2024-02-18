import { GameObject } from "./objects/gameObject";
import { Vector2 } from "./vector2";

export class Sprite extends GameObject {
    constructor({
        resource,  // image we want tp draw
        frameSize, // size of the image in sprite sheet
        hFrames,   // arrangement of sprite horizontally
        vFrames,   // arrangement of sprite vertically
        frame,     // tileId of frame we want to show
        scale,     
        position,
        animations, // house all sprite animations
    }) {
        super({});
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16, 16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0, 0);
        this.animations = animations ?? null;
        this.buildframeMap();  // call to build method in constructor 
    }

    buildframeMap() {
        let frameCount = 0;
        for (let v = 0; v < this.vFrames; v += 1) {
            for (let h = 0; h < this.hFrames; h += 1) {

                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v),
                );
                frameCount ++;
            }
        }
    }

    step(delta) {
        if(!this.animations) {
            return;
        }
        this.animations.step(delta);
        // get frame from animation class
        this.frame = this.animations.frame;
    }

    drawImage(ctx, x, y) {
        if(!this.resource.isLoaded) {
            return;
        }
        // default for error handling
        let frameCoordX = 0;
        let frameCoordY = 0;

        const frame = this.frameMap.get(this.frame);
        if (frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY,
            this.frameSize.x,
            this.frameSize.y,
            x,
            y,
            this.frameSize.x * this.scale,
            this.frameSize.y * this.scale,
        )
    }
}