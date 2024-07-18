import './style.css'
import ReactDOM from 'react-dom/client'
import {Canvas} from '@react-three/fiber'
import Experience from './Experience'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Canvas dpr={[1,2]} gl={{antialias: true}} camera={{
            fov: 108,
            near: 0.1,
            far:200,
            }}>
            <Experience />
        </Canvas> 
    </>
)