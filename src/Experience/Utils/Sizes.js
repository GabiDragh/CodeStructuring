// Exports the width, height and the pizel ratio 
import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
    constructor() {
        console.log('ayo')

        super() //-> inherit from EvenetEmitter

        // Setup - assuming the experience fills the viewport
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2) 

        console.log(this)

        // Resize events
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2) 

            this.trigger('resize')
        })
    }
};
