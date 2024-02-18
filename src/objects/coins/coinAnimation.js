const rotateFrames = (rootFrame = 0) => {
    return {
        duration: 500,
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
                frame: rootFrame + 2,
            },
            {
                time: 300,
                frame: rootFrame + 3,
            },
            {
                time: 400,
                frame: rootFrame + 4,
            }
        ]
    }
}

export const rotate = rotateFrames(0);