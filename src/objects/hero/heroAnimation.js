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

const makeInvulnerableFrames = (rootFrame = 0) => {
    return {
        duration: 500,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            },
            {
                time: 100,
                frame: rootFrame - 18,
            },
            {
                time: 200,
                frame: rootFrame,
            },
            {
                time: 300,
                frame: rootFrame - 18,
            },
            {
                time: 400,
                frame: rootFrame,
            }
        ]
    }
}

const makeDeathFrames = (rootFrame = 0) => {
    return {
        duration: 3000,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            },
            {
                time: 200,
                frame: rootFrame + 1,
            },
            {
                time: 900,
                frame: rootFrame + 2,
            },
            {
                time: 1600,
                frame: rootFrame + 3,
            },
            {
                time: 2300,
                frame: rootFrame + 4,
            },
        ]
    }
}

export const deathDown = makeDeathFrames(19);
export const deathUP = makeDeathFrames(111);
export const deathLeft = makeDeathFrames(157);
export const deathRight = makeDeathFrames(65);

export const hitDown = makeInvulnerableFrames(19);
export const hitUP = makeInvulnerableFrames(111);
export const hitLeft = makeInvulnerableFrames(157);
export const hitRight = makeInvulnerableFrames(65);


export const walkDown = makeWalkingFrames(0);
export const walkUP = makeWalkingFrames(92);
export const walkLeft = makeWalkingFrames(138);
export const walkRight = makeWalkingFrames(46);

export const standDown = makeStandingFrames(1);
export const standUP = makeStandingFrames(93);
export const standLeft = makeStandingFrames(139);
export const standRight = makeStandingFrames(47);
