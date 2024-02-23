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
                frame: rootFrame + 2,
            },
            {
                time: 200,
                frame: rootFrame + 1,
            },
            {
                time: 300,
                frame: rootFrame + 3,
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
export const walkUP = makeWalkingFrames(96);
export const walkLeft = makeWalkingFrames(144);
export const walkRight = makeWalkingFrames(48);

export const standDown = makeStandingFrames(1);
export const standUP = makeStandingFrames(97);
export const standLeft = makeStandingFrames(145);
export const standRight = makeStandingFrames(49);
