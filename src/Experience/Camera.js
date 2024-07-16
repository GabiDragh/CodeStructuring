
// Inside the Camera class, we need access to information like width, height, canvas and Scene as we are instantiating the PerspectiveCamera and the OrbitControls. 
// For that, Camera needs access to the Experience class. Which can be done in 3 ways:   a. global variable
//                                                                                       b. by sending a parameter
//                                                                                       c. by using a singleton
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience.js"

export default class Camera {

    constructor() {
        // console.log('My camera')

        // a. global variable ->  Simplest, but even if it works, it is not best practice to work on window properties as external code can mess it up
        // this.experience = window.experience
        // console.log(this.experience.sizes.width)

        // b. Pass the this keyword into the Camera method in Experience.js and then pass the experience into the constructor. The issue with it is that we need to pass parameters in multiple files
        // this.experience = experience
        // console.log(this.experience.sizes.width)

        // c. A singleton is a class that will instantiate just like usual the first time. But, for all following times, will return the first instance already created.
        //    The most complicated, but the cleanest solution

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()

        // We need to update the camera when resize occurs. We could listen to the resize event on the Sizes class here, but instead it is better to propagate it from the Experience to its children (already present there)

        // console.log(this)
    }

    // Create separate methods just to keep things 'in boxes'

    // Create a method for the camera
    setInstance() { 
        this.instance = new THREE.PerspectiveCamera(
            35, //field of view
            this.sizes.width/this.sizes.height, //size
            0.1, //near
            100 //far
        )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
    }

    // Create method for the orbit controls
    setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true //smoother movement
    // console.log(this.controls)
    }

    resize() {
        // console.log('resize on the camera')
        this.instance.aspect = this.sizes.width/this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        // console.log('update camera')
        this.controls.update() //updated Orbit controls for each frame
    }
}