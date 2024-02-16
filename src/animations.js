export class Animations {
    constructor(patterns) {
        this.patterns = patterns;
        this.activeAnimation = Object.keys(this.patterns)[0];  // from Sprite, deals with animation name from animations object
    }

    get frame() {
        // get frame from pattern class
        return this.patterns[this.activeAnimation].frame;
    }

    play(charAnim, startAtTime = 0) {
        if (this.activeAnimation === charAnim) {
            return;
        }
        this.activeAnimation = charAnim;
        this.patterns[this.activeAnimation].currentTime = startAtTime;
    }

    step(delta) {
        this.patterns[this.activeAnimation].step(delta);
    }
}