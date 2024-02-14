export class Sprite {
    constructor({
        resource,  // image we want tp draw
        frameSize, // size of the image
        hFrames,   // arrangement of sprite horizontally
        vFrames,   // arrangement of sprite vertically
        frame,     // tileId of frame we want to show
        scale,
        position,
    }) {
        this.resource = resource;
        this.frameSize = frameSize;
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position;
    }
}