import { events } from "./events";
import { Vector2 } from "./vector2";

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2(0, 0);
        this.children = [];
        this.parent = null;
        this.isReady = false;
    }

    // first entry of loop
    stepEntry(delta, root) {
        // call updates on all children first
        this.children.forEach((child) => child.stepEntry(delta, root));

        // call ready state
        if (!this.isReady) {
            this.isReady = true;
            this.ready();
        }

        this.step(delta, root);
    }

    ready() {}
    
    step(_delta) {}

    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;
    
        // Do the actual rendering for Images
        this.drawImage(ctx, drawPosX, drawPosY);
    
        // Pass on to children
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }
    
    drawImage(ctx, drawPosX, drawPosY) {}

    addChild(gameObject) {
        gameObject.parent = this;
        this.children.push(gameObject);
    }

    destroy(gameObject) {
        this.children.forEach((child) => child.destroy())

        this.parent.remove(this);
    }

    remove(gameObject) {
        events.unsubscribe(gameObject);
        this.children = this.children.filter((child) => gameObject !== child);
    }
    
}