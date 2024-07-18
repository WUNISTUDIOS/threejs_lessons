import { useEffect, useRef, useState } from "react"

export default function Clicker({increment, keyName, color}){
    
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
    const randColor = {color: `hsl(${Math.random() * 360}deg,100%, 70%)`}
    const buttonRef = useRef()

    // const color = {color: 'red'}


    useEffect(()=>{
       return () => {
        localStorage.removeItem(keyName)
    }
    },[])

    useEffect(()=>{
        localStorage.setItem(keyName, count)
    },[count])

    const buttonClick = () =>{
        
        setCount(count + 1)
        increment()
    }

    return <div>
                <div style={{color}}>clicker count:{count}</div>
                <button ref={buttonRef} style={{color}}onClick={buttonClick}>click me</button>
            </div>
}