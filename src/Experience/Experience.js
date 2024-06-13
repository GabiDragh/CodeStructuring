import Sizes from "./Utils/Sizes.js"

export default class Experience {
    constructor (canvas) {
        console.log('This is the start of the experience')
        // We can save the instance in window inside the constructor for GLOBAL access
        window.experience = this //not a very popular method, as window already has a lot of properties. if you have multiple experiences, the last one wil override the previous!!!
        console.log(this)
        // Options
        this.canvas = canvas
        console.log(this.canvas)

        // Setup
        this.sizes = new Sizes()

        console.log(this.sizes.width) //-> test if we can access properties from sizes class

        this.sizes.on('resize', () => {
            console.log('I am resizing the window');

            this.resize() //used to keep the context into the resize function below. Only works with arrow function
        })
    }

    resize() {
        console.log(this.sizes.width)
        console.log('Resizing function')
        
    }
}

