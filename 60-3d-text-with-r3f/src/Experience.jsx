import {useMatcapTexture, Center, OrbitControls, Text3D} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{

    useEffect(()=>{
        matcapTexture.encoding = THREE.SRGBColorSpace
        matcapTexture.addEventListener.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    },[])

    useFrame((state, delta) => {
        for(const donut of donutGroup.current.children){
            donut.rotation.y += delta * 0.2
        }
    })

    const donutGroup = useRef()

    const [matcapTexture] = useMatcapTexture("3E2335_D36A1B_8E4A2E_2842A5",256)

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <torusGeometry  />
        <meshMatcapMaterial matcap={matcapTexture} />



        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json"
            material={material}
            size={0.75}
            height={0.2}
            curveSegments={12}  
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            >
                Hello World
            </Text3D>
        </Center>

        <group ref={donutGroup}>
            {[...Array(100)].map((value, index)=>
                <mesh
                    key={index}
                    geometry={torusGeometry}
                    material={material}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}
                    scale={0.2 + Math.random() * 0.2}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                />
            )}
        </group>    
    </>
}