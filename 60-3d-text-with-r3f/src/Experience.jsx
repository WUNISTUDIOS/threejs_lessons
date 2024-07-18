import {useMatcapTexture, Center, OrbitControls, Text3D} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { MeshMatcapMaterial } from 'three'
import {useState} from 'react'


export default function Experience()
{
    const [matcapTexture] = useMatcapTexture("3E2335_D36A1B_8E4A2E_2842A5",256)

    // const tempArray = [...Array(100)]
    // tempArray.map(()=>{
    //     console.log('value')
    // })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Center>
            <Text3D font="./fonts/helvetiker_regular.typeface.json"
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
                <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>
        </Center>

        {[...Array(100)].map((value, index)=>
            <mesh
                key={index}
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
            
            >
                <torusGeometry />
                <meshMatcapMaterial matcap={matcapTexture} />
            </mesh>
        )}


    </>
}