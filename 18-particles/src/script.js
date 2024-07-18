import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('/textures/particles/5.png')


//instantiating particles
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32)
const count = 5000  

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)


for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - .5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute(
    'position', new THREE.BufferAttribute(positions, 3)
)

particlesGeometry.setAttribute(
    'color', new THREE.BufferAttribute(colors, 3)
)

//material
const particlesMaterial = new THREE.PointsMaterial({
    size: .1,
    sizeAttenuation: true,
    // color: 'colors',
    vertexColors: true,
    map: particlesTexture,
    transparent: true,
    alphaMap: particlesTexture,
    // alphaTest: 0.001,
    // depthWrite: false,
    depthTest: false
    
})

//points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


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
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    particles.rotation.y = elapsedTime * .2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()