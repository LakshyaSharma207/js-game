// get the frame based on delta time
export class FrameIndexPattern {
    // recieve a animation frame
    constructor(animationConfig) {
        this.animationConfig = animationConfig;
        this.duration = animationConfig.duration ?? 500;
        this.currentTime = 0;
    }

    get frame() {
        // destructuring to get frames
        const {frames} = this.animationConfig;

        // had to go reverse for avoiding lower frame lock
        for (let i = frames.length - 1; i >= 0; i -= 1)
            if (this.currentTime >= frames[i].time) {
                return frames[i].frame;
            }
    }

    step(delta) {
        this.currentTime += delta;
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
        }
    }
}