import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import waterVertexShader from './shaders/water_shader/vertex.glsl'
import waterFragmentShader from './shaders/water_shader/fragment.glsl'


/**
 * Basef
 */
// Debug
const gui = new GUI({ width: 340 })

const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

//gltf loader 
const gltfLoader = new GLTFLoader()

const allBoat = new GLTFLoader()
let mixer = null

gltfLoader.load(
    'models/oyle8_2_ani_boat.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(.1,.1,.1)
        gltf.scene.position.set(0,- 0.8,0)  
        

        scene.add(gltf.scene)

        console.log(gltf)

    }
)

allBoat.load(
    'models/all_boat1.glb',
    (gltf) => 
    {
        gltf.scene.scale.set(.03,.03,.03)
        gltf.scene.position.set(0,.08,0)  

        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
   
        camera.lookAt(gltfLoader)
        action.play()

        scene.add(gltf.scene) 
    }
)


// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128)

debugObject.depthColor = '#0000ff'
debugObject.surfaceColor = '#8888ff'

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
    {
        uTime: {value: 0},
        uBigWavesSpeed: {value: 0.75 },
        uBigWavesElevation: {value: 0.2},
        uBigWavesFrequency: {value: new THREE.Vector2(4, 1.5)},

        uSmallWavesElevation: {value: 0.15},
        uSmallWavesFrequency: {value: 3.0},
        uSmallWavesSpeed: {value: 0.2},
        uSmallWavesIterations: {value: 4.0},

        uDepthColor: {value: new THREE.Color(debugObject.depthColor)},
        uSurfaceColor: {value: new THREE.Color(debugObject.surfaceColor)},
        uColorMultiplier: {value: 2.0},
        uColorOffset: {value: 4.0}
    
    }
})

gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')

gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')

gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallElevation ')
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(5).max(4).step(1).name('uSmallWavesIterations')

gui.addColor(debugObject, 'depthColor').name('depthColor')
    .onChange(() =>
    {
        waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor)
    })

gui.addColor(debugObject, 'surfaceColor').name('surfaceColor')
.onChange(() =>
{
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
})
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(2).step(0.001).name('uColorOffset')

gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMixer')



// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

// const cube_setup = new THREE.BoxGeometry(1.9,1.9,1.9)
// const material_cube = new THREE.MeshBasicMaterial( {color: 'white'} ); 
// const cube_mesh = new THREE.Mesh(cube_setup, material_cube)
// cube_mesh.position.y = - 1.2
// scene.add()

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff , 0.6)
directionalLight.position.set(5, 5, 5)

scene.add(directionalLight)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    if(mixer !== null){
        mixer.update(deltaTime)
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()