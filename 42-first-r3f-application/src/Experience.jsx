import { useThree, extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { MeshStandardMaterial } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from "./CustomObject.jsx"

extend({ OrbitControls })
export default function Experience(){
    const {camera, gl} = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()
    

    useFrame((state, delta) =>{
        cubeRef.current.rotation.y += delta
        // groupRef.current.rotation.y += delta
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle)
        // state.camera.position.z = Math.cos(angle)
        // state.camera.lookAt(0,0,0)
    })

    return <>
        <orbitControls args={[camera, gl.domElement]}/> 
        <directionalLight position = {[1,2,3]} intensity={[4.5]}/>

        <ambientLight intensity={1.5}/>

        <group ref={groupRef} >
            <mesh position={[-3,0,0]} scale={[1, 1, 1 ]} >
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color = 'mediumpurple' wireframe: false />
            </mesh>

            <mesh ref={cubeRef}position={[2, 0, 1]}>
                <boxGeometry/>
                <meshStandardMaterial color = 'red' wireframe: false />
            </mesh>

            <mesh position-y={-.5} scale={10} rotation-x={-Math.PI * .5}>
                <planeGeometry />
                <meshStandardMaterial color='greenyellow'/>
            </mesh>
        </group>
        <CustomObject />
    </>
}