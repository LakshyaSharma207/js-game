import kaboom from '../lib/kaboom.mjs';
// use below only if kaboom.mjs import from lib not working
// import kaboom from "kaboom"; 

const k = kaboom({
    width: 1280,
    height: 720,
    letterbox: true,
    global: false,
});

export default k;