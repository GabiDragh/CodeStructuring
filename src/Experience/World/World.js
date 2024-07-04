import * as THREE from 'three'
import Experience from "../Experience.js"
import Environment from './Environment.js'



export default class World {
    constructor() {
        this.experience = new Experience()
        console.log('the world')

        this.scene = this.experience.scene
        console.log(this.scene)

        // test mesh

        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({wireframe: false})
        )
        this.scene.add(testMesh)

        // Setup environment class

        this.environment = new Environment()
    }
}