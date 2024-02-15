export class GameLoop{
    constructor(update, render){
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000/60;  // 60 fps
        this.reqFrameId = null;   // id returned by javascript function
        this.isRunning = false;

        this.update = update;
        this.render = render;
    }

    mainloop = (timeStamp) => {
        if (!this.isRunning) { 
            return;
        }

        let deltaTime = timeStamp - this.lastFrameTime;
        this.lastFrameTime = timeStamp;

        // accumulate all time since last frame
        this.accumulatedTime += deltaTime;

        // if there is enough accumulated time to run game on 60fps
        while(this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }

        // render game assets
        this.render();

        this.reqFrameId = requestAnimationFrame(this.mainloop); 
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.reqFrameId = requestAnimationFrame(this.mainloop); 
        }
    }

    stop() {
        if (this.reqFrameId) {
            cancelAnimationFrame(this.reqFrameId);
        }
        this.isRunning = false;
    }
}