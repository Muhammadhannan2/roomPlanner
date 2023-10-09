import contextState from "./contextState";
import React, { useState } from 'react';


const Data = (props: any) => {

    const [objectsData, setObjectsData] = useState<any>([])
  return (
    <contextState.Provider value={{objectsData,setObjectsData}} >
        {props.children}
    </contextState.Provider>
  )
}

export default Data