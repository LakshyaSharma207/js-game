const makeChasingFrames = (rootFrame = 0) => {
    return {
        duration: 600,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            },
            {
                time: 100,
                frame: rootFrame - 3,
            },
            {
                time: 200,
                frame: rootFrame - 2,
            },
            {
                time: 300,
                frame: rootFrame - 1,
            },
            {
                time: 400,
                frame: rootFrame - 2,
            },
            {
                time: 500,
                frame: rootFrame - 3,
            },
        ]
    }
}

const makeIdleFrames = (rootFrame = 0) => {
    return {
        duration: 100,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            }
        ]
    }
}

const makeAttackingFrames = (rootFrame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            },
            {
                time: 100,
                frame: rootFrame + 1,
            },
            {
                time: 200,
                frame: rootFrame,
            },
            {
                time: 300,
                frame: rootFrame - 1,
            },
        ]
    }
}

export const chase = makeChasingFrames(3);
export const idle = makeIdleFrames(3);
export const attacking = makeAttackingFrames(4);