// animation function specific to sprite sheet
const makeWalkingFrames = (rootFrame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame + 1,
            },
            {
                time: 100,
                frame: rootFrame,
            },
            {
                time: 200,
                frame: rootFrame + 1,
            },
            {
                time: 300,
                frame: rootFrame + 2,
            }
        ]
    }
}

const makeStandingFrames = (rootFrame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            }
        ]
    }
}

export const walkDown = makeWalkingFrames(0);
export const walkUP = makeWalkingFrames(6);
export const walkLeft = makeWalkingFrames(9);
export const walkRight = makeWalkingFrames(3);

export const standDown = makeStandingFrames(1);
export const standUP = makeStandingFrames(7);
export const standLeft = makeStandingFrames(10);
export const standRight = makeStandingFrames(4);
