export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class KeyInput {
    constructor() {
        this.directionStack = [];

        document.addEventListener("keydown", (e) => {

            if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
                this.onArrowPress(UP);
            } 
            else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
                this.onArrowPress(DOWN);
            } 
            else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
                this.onArrowPress(LEFT);
            } 
            else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
                this.onArrowPress(RIGHT);
            }
        })
        document.addEventListener("keyup", (e) => {

            if (e.key === "ArrowUp" || e.key === "W") {
                this.onArrowRelease(UP);
            } 
            else if (e.key === "ArrowDown" || e.key === "S") {
                this.onArrowRelease(DOWN);
            } 
            else if (e.key === "ArrowLeft" || e.key === "A") {
                this.onArrowRelease(LEFT);
            } 
            else if (e.key === "ArrowRight" || e.key === "D") {
                this.onArrowRelease(RIGHT);
            }
        })
    }

    get direction() {
        return this.directionStack[0];
    }

    onArrowPress(direction) {
        if (!this.directionStack.includes(direction)) {
            this.directionStack.unshift(direction);
        }
    }
    
    onArrowRelease(direction) {
        const index = this.directionStack.indexOf(direction);
        if (index > -1) {
            this.directionStack.splice(index, 1);
        }
    }
}
