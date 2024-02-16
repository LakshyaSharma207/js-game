import { Vector2 } from "./vector2";

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2(0, 0);
        this.children = [];
    }

    // first entry of loop
    stepEntry(delta, root) {
        // call updates on all children first
        this.children.forEach((child) => child.stepEntry(delta, root));

        this.step(delta, root);
    }
    
    step(_delta) {

    }

    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;
    
        // Do the actual rendering for Images
        this.drawImage(ctx, drawPosX, drawPosY);
    
        // Pass on to children
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }
    
    drawImage(ctx, drawPosX, drawPosY) {
    //...
    }

    addChild(gameObject) {
        this.children.push(gameObject);
    }
    
}