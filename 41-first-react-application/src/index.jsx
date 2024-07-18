import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Clicker from './clicker.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    <div>
        <App clickersCount={3}>
            <h1>Testing</h1>
        </App>
    </div>
) 