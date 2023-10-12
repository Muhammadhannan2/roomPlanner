import contextState from "./contextState";
import React, { useState } from 'react';


const Data = (props: any) => {

    const [objectsData, setObjectsData] = useState<any>([])
    const [controls, setControls] = useState<boolean>()

  return (
    <contextState.Provider value={{objectsData,setObjectsData,controls, setControls}} >
        {props.children}
    </contextState.Provider>
  )
}

export default Data