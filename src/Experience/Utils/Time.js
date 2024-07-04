// Works like the Clock in Three.js
// It saves the current time, elapsed time and the delta time between the current frame and the previous frame
// Will handle the tick and trigger an event on each frame

import EventEmitter from "./EventEmitter.js"

export default class Time extends EventEmitter {
    constructor() {
        super() // -> to extend the emitter

        console.log('This is the emitter')

        // Setup
        this.start = Date.now()
        console.log(this.start)

        this.current = this.start
        this.elapsed = 0
        this.delta = 16 //16 ms. If delta 0, can cause potentially bugs 
        
        //We don't call the tick function straight away (this.tick()), we don't want delta = 0
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    // INFO: Create a tick() function as with window.requestAnimationframe()

    tick() {

        //Step 2 - update current time, calculate delta time and update the elapsed time
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime //current time gets updated with the previous frame -> value around 16 because the screeen runs at 16 fps
        // console.log(this.delta)
        this.elapsed = this.current - this.start

        // Step 3 - Trigger an event and then listen to it in the Experience class
        this.trigger('tick')

        //Step 1
        // console.log('tick')
        window.requestAnimationFrame(() => { //can't pass tick as prop into the arrow function because it loses context 
            this.tick() //keeps context
        })
    }
}
