import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * raycaster
 */

const raycaster = new THREE.Raycaster()



// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()

// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// const intersects = raycaster.intersectObjects([object1, object2, object3])

// console.log(intersects)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * on mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (_event) => {
    mouse.x = _event.clientX / sizes.width * 2 - 1
    mouse.y = - (_event.clientY / sizes.height) * 2 + 1
})

window.addEventListener('click', (_event) =>
{
    if(currentIntersect)
    {
        if(currentIntersect.object === object1)
        {
            
        }
        else if(currentIntersect.object === object2)
        {
            
        }
        else if(currentIntersect.object === object3)
        {
            
        }

    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * loading models
 */
const gltfLoader = new GLTFLoader()

let model = null
gltfLoader.load('models/Duck/glTF-Binary/Duck.glb',
(gltf) => {
    model = gltf.scene

    model.position.set(0,-1,0)
    model.scale.set(.5, .5, .5)

    // gltf.scene.position.y - 10
    scene.add(gltf.scene)
    console.log(gltf)

})

//adding lights way at the bottom of the code 
const ambientLight = new THREE.DirectionalLight('#ffffff', .3)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', .7)
directionalLight.position.set(1,2,3)
scene.add(directionalLight)


/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //animate objects
    object1.position.y = Math.sin(elapsedTime * .3) * 1
    object2.position.y = Math.sin(elapsedTime * .8) * 1
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1

    //ray caster

    raycaster.setFromCamera(mouse, camera)

    const rayArray = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(rayArray)
   
    for(const object of rayArray)
    {
        object.material.color.set('#ff0000')
    }

    for(const intersect of intersects)
    {
        intersect.object.material.color.set('#0000ff')
    }

    if(intersects.length)
    {
        if(currentIntersect === null)
        {
            // console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    }

    else
    {
        if(currentIntersect)
        {
            // console.log('mouse leave')
        }
        
    }

    if(model)
    {
        const modelIntersects = raycaster.intersectObject(model)

        if(modelIntersects.length)
        {
            model.scale.set(2, 2, 2)

        }
        else
        {
            model.scale.set(1, 1, 1)

        }
    }

    

    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(1, 0, 0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin, rayDirection)

    // const rayArray = [object1, object2, object3]
    // const intersects = raycaster.intersectObjects(rayArray)

    // for(const object of rayArray)
    // {
    //     object.material.color.set('#ff0000')
    // }

    // for(const intersect of intersects)
    // {
    //     intersect.object.material.color.set('#0000ff')
    // }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()