import React, { useState } from 'react'
import "./Alert.css"

function Alert({message="welcome"}) {
  const [display,setDisplay] = useState(false)
  return (
    <div onClick={()=>setDisplay(true)} className= {`alert ${display? " hidden":""} `}>
        <p>{message}</p>
        <span>X</span>
    </div>
  )
}

export default Alert
