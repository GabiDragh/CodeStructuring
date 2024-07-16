import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'

// console.log(sources)

let instance = null //declare the instance variable for turning the experience into a singleton

export default class Experience {
    constructor (canvas) {
        // console.log('This is the start of the experience')

        // IMPORTANT: Turn the experience into a singleton!!
        // 2. test if an instance of that experience already exists
        if(instance) {
            // console.log(instance)
            return instance
        }

        // 1. Set the instance to this experience
        instance = this

        // INFO: Global access
        // We can save -=the instance in window inside the constructor for GLOBAL access
        window.experience = this //not a very popular method, as window already has a lot of properties. if you have multiple experiences, the last one wil override the previous!!!
        // console.log(this)
        // Options
        this.canvas = canvas
        // console.log(this.canvas)

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene() //no need to create the class, just import it and call it
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // console.log(this.sizes.width) //-> test if we can access properties from sizes class

        // Sizes resize event
        this.sizes.on('resize', () => {
            // console.log('I am resizing the window');

            this.resize() //used to keep the context into the resize function below. Only works with arrow function
        })

        // Time tick event
        this.time.on('tick', () => { //when the event occurs, trigger the function
            this.update() //next, create the method below
        })
    }

    resize() {
        // console.log(this.sizes.width)
        // console.log('Resizing function')

        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        // console.log('update the experience')
        this.camera.update()
        this.renderer.update()
    }
}

