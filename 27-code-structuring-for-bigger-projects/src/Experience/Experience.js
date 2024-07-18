import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'

let instance = null 

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }

        instance = this

        //options
        this.canvas = canvas

        //setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()

        // console.log(this.canvas)

        this.sizes = new Sizes()

        this.sizes.on('resize', () =>
        {
            // console.log('resize');

            this.resize()
        })
    }

    resize()
    {
        console.log('resize');

    }
}



