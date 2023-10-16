import contextState from "./contextState";
import React, { useState } from 'react';


const Data = (props: any) => {

    const [objectsData, setObjectsData] = useState<any>([])
    const [controls, setControls] = useState<boolean>()
    const [roomWidth, setRoomWidth] = useState(100)
    const [roomLength, setRoomLength] = useState(100)
    const [wallHeight, setWallHeight] = useState(40)

  return (
    <contextState.Provider value={{objectsData,setObjectsData,controls, setControls,roomWidth, setRoomWidth,roomLength, setRoomLength,wallHeight, setWallHeight}} >
        {props.children}
    </contextState.Provider>
  )
}

export default Data