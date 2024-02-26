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

export const chase = makeChasingFrames(3);