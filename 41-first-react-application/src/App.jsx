import { useMemo, useState } from "react"
import Clicker from "./clicker.jsx"
import People from "./People.jsX"


export default  function App({clickersCount, children}){
    const [hasClicker, setHasClicker]= useState(true)
    const [count, setCount] = useState(0)

    const randColor = {color: `hsl(${Math.random() * 360}deg,100%, 70%)`}

    const toggleClickerClick = () =>{
        setHasClicker(!hasClicker)
    }

    const increment = () =>{
        setCount(count + 1)
    }

    // const tempArray = [...Array(clickersCount)]
    
    // tempArray.map(()=>{
    //     console.log('value');
    // })

    const colors = useMemo(()=>{
        const colors = [  ]
        for(let i = 0; i < clickersCount; i++){
            colors.push(`hsl(${Math.random() * 360}deg,100%, 70%)`)
        return colors
    } },[clickersCount])

    return <>
        {children}

        <div>Total Count:{ count }</div>

        <button style={randColor} 
            onClick={toggleClickerClick}>{hasClicker ? 'hide' : 'show'} Clickers
        </button>

        {/* { hasClicker ? <Clicker /> : null} */}

        {hasClicker && <> 
            {[...Array(clickersCount)].map((value, index)=>
                <Clicker
                     key={index} 
                    increment={increment} 
                    keyName={`count${index}`} 
                    color={colors[index]}
                />
            )}
        </> }
        <People />
    </>
}