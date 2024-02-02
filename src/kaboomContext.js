import kaboom from '../libs/kaboom.mjs';
// import kaboom from "kaboom"; // use only if mjs import not working

const k = kaboom({
    width: 1280,
    height: 720,
    letterbox: true,
    global: false,
});

export default k;