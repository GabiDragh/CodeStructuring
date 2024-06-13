// Works like the Clock in Three.js
// It saves the current time, elapsed time and the delta time between the current frame and the previous frame
// Will handle the tick and trigger an event on each frame

import EventEmitter from "./Utils/EventEmitter.js"

export default class Time extends EventEmitter {
    constructor() {
        super() // -> to extend the emitter

        console.log('This is the emitter')

    }
}
