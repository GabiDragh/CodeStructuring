import * as THREE from 'three'
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {} //by default this is empty, but once an item is loaded it will be assigned here
        this.toLoad = this.sources.length //how many assests 
        this.loaded = 0 //increments in the items object when an asset is loaded

        // Add Loaders -> only add the ones we need
        this.setLoaders()
        this.startLoading()

        // console.log(sources)
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        // If model uses Draco compression, need to add Dracoloader
    }

    startLoading() {
        // Loop through all sources
        for(const source of this.sources) {
            console.log(source) 
            // Test the types: -> 
            // 1. if it's a gltf model, load the source path and once that is done it calls the file function
            // 2. For each load, call sourceLoaded method that -> saves the loaded resources in the items property
                                                            // -> updates the loaded property (increment)
                                                            // -> test if loading is done
            // 3. If all sources are loaded -> trigger ready event

            if(source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad) {
            // console.log('Finished')
            this.trigger('ready')
        }
    }
}