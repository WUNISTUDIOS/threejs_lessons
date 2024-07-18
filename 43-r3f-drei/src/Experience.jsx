import { MeshReflectorMaterial, OrbitControls } from "@react-three/drei"
import { MeshRefractionMaterial, Float, Text, Html, PivotControls, TransformControls } from "@react-three/drei"
import { useRef } from "react"

export default function Experience(){
    const cubeRef = useRef()
    const sphereRef = useRef()

    return <>

        <OrbitControls makeDefault />
        
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
        
        <PivotControls anchor={[0,0,0]}
            depthTest={false}
            lineWidth={1}
            scale={100}
            fixed={true}
        >
            <mesh ref={ sphereRef } position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    position={[1,1,0]}
                    wrapperClass="label"
                    center
                    distanceFactor={8}
                    occlude={[sphereRef, cubeRef]}
                >sphere</Html>
            </mesh>
        </PivotControls>

        <mesh ref={cubeRef} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <TransformControls object={cubeRef} mode='translate'>
        </TransformControls>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial
                resolution={512}
            />
        </mesh>

        <Float 
            floatIntensity={1}
        >
        <Text position-y={2}
            font="./bangers-v20-latin-regular.woff"
            color="blue"
            >Quenzil loves 3D
            <meshNormalMaterial />
        </Text>
        </Float>

    </>
}