import {useEffect, useState } from "react"

export default function People(){
    const [people, setPeople ] = useState([])

    const getPeople = async () =>{
        const response = await fetch('http://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)
        
    }

    useEffect(()=>{
        getPeople()
    },[])

    return <div>
            <h2>People</h2>
            <ul>
            {/* {people.map((person)=>{return <Li>{person.name}</Li>})} */}
            {people.map((person) => <li key = {person.id}>{person.name}</li>)}
            </ul>
            </div>
}