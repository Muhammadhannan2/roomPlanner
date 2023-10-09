import  { Suspense, useCallback, useState,useEffect,useRef, useContext} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import {Room} from './Room';
import './ThreeDScene.css'
import React from 'react';
// import Data from '../context/Data';
import contextState from '../context/contextState';
// import SideBar from './sideBar/SideBar';

// const objectsData:any = []
const tub = {
  id:1,
  materialUrl:'toiletSeat.mtl',
  modelUrl:'noir.obj',
  name:'Tub_Model',
  positionX:0,
  positionY:0,
  positionZ:0,
  scaleX:0.02,
  scaleY:0.02,
  scaleZ:0.02,
  rotationX:0,
  rotationY:0,
  rotationZ:-0.02,
  minY:null,
  maxY:null,
  rotationAxis:'y',
  restrictVertical:false,
  ground:false,
  size:'large'
}
const toiletSeat = {
  id:2,
  materialUrl:'toiletSeat.mtl',
  modelUrl:'toiletSeat.obj',
  name:'Toilet_seat',
  positionX:20,
  positionY:0,
  positionZ:0,
  scaleX:0.04,
  scaleY:0.04,
  scaleZ:0.04,
  rotationX:-89.5,
  rotationY:0,
  rotationZ:11,
  minY:null,
  maxY:null,
  rotationAxis:'z',
  restrictVertical:false,
  ground:false,
  size:'small'
}
const shower = {
  id:3,
  materialUrl:'toiletSeat.mtl',
  modelUrl:'shower.obj',
  name:'shower',
  positionX:0,
  positionY:29,
  positionZ:-49.5,
  scaleX:0.023,
  scaleY:0.023,
  scaleZ:0.023,
  rotationX:29.85,
  rotationY:0,
  rotationZ:0,
  minY:28,
  maxY:34,
  rotationAxis:'z',
  restrictVertical:true,
  ground:false,
  size:'small'
}
const basin = {
  id:4,
  materialUrl:'toiletSeat.mtl',
  modelUrl:'basin.obj',
  name:'basin',
  positionX:-34,
  positionY:0,
  positionZ:-46.7,
  scaleX:0.03,
  scaleY:0.03,
  scaleZ:0.03,
  rotationX:29.85,
  rotationY:0,
  rotationZ:0,
  minY:0,
  maxY:12,
  rotationAxis:'z',
  restrictVertical:true,
  ground:false,
  size:'small'
}


const ThreeDScene = () => {
  const data = useContext(contextState);
  const {objectsData,setObjectsData} = data
  // const [objectsData, setObjectsData] = useState<any>([tub,toiletSeat,shower])
  const [activeCamera, setActiveCamera] = useState('perspective');
   const [controls, setControls] = useState(true);
   const rotateButtonRef = useRef<HTMLButtonElement>(null)
   const deleteButtonRef = useRef<HTMLButtonElement>(null)
  //  const tubButtonRef = useRef(null)
  //  const toiletSeatButtonRef = useRef(null)
  //  const showerButtonRef = useRef(null)

      const switchCamera = useCallback(() => {
        setActiveCamera((prevCamera) => (prevCamera === 'perspective' ? 'orthographic' : 'perspective'));
      }, []);
      const switchControls = useCallback(() => {
        setControls(!controls)
        // scene.children[i].userData.draggable = true
      }, [controls]);


      // const addObjects = useCallback((object:Object) => {
      //   setObjectsData((prevObjectsData:any) => [...prevObjectsData, object]);
      // }, []);

      const removeObjects = useCallback((id:number) => {
         setObjectsData((prevObjectsData:any) =>
         prevObjectsData.filter((object:any) => object.id !== id));
        if(rotateButtonRef.current && deleteButtonRef.current){
          rotateButtonRef.current!.style.display = 'none';
          deleteButtonRef.current!.style.display = 'none';
        }
      }, []);

      useEffect(() => {
        activeCamera ==="orthographic" ? setControls(false) : setControls(true)
        const canvas = document.getElementById('canvas');
        if (canvas) {
          canvas.style.position = 'static';
          // console.log(canvas)
        }
        return () => {
          
        }
      }, [activeCamera])
      console.log(document.getElementById('canvas')?.style.position)
      // document.getElementById('canvas')?.style.position = 'static'

    return (
      <>
      <div className='container' >
        {/* <div className='sidebar'>
      <SideBar/>
        </div> */}
        <div className='canvas-container'>
        {/* <SideBar /> */}
        <button id='switchCameraButton'style={{top:'8%'}} onClick={switchCamera} >Switch Camera</button>
        <button id='controlsButton' disabled={activeCamera==='orthographic'}onClick={switchControls} style={{top:'14%'}}>Controls {controls=== true ?"enabled":"disabled"}</button>
        <button id='rotateButton' ref={rotateButtonRef} style={{ borderRadius:"50%",padding:"10px",width:"max-content",height:"fit-content",border:'none',display:'none',}}>
        <img id='rotateImage' src="src/assets/SceneAssets/reload-icon-16903.png" alt="" style={{width:"2rem",height:"2rem"}}/>
      </button>
        <button id='deleteButton' ref={deleteButtonRef} style={{ borderRadius:"50%",padding:"10px",width:"max-content",height:"fit-content",border:'none',display:'none',}}>
        <img id='deleteImage' src="src/assets/SceneAssets/delete-icon3.png" alt="del" style={{width:"2rem",height:"2rem", background:'none'}}/>
      </button>
        {/* <button onClick={()=>addObjects(tub)} ref={tubButtonRef} id='tub' style={{top:'5%'}} >Add Tub</button>
        <button onClick={()=>addObjects(toiletSeat)} ref={toiletSeatButtonRef} id='toiletSeat'  style={{top:'15%'}}>Add toilet Seat</button>
        <button onClick={()=>addObjects(shower)} ref={showerButtonRef} id='shower'  style={{top:'20%'}}>Add shower</button>
        <button onClick={()=>addObjects(basin)} ref={showerButtonRef} id='shower'  style={{top:'25%'}}>Add Basin</button> */}
        <Canvas id='canvas'
        legacy
          shadows
          camera={{ position: [0, 100, 180], fov: 30 }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[-30, 50, -30]} intensity={1.4} castShadow />
  
          {activeCamera === 'perspective' ? (
            <PerspectiveCamera makeDefault position={[-25, 100, 180]} fov={40} />
          ) : (
            <OrthographicCamera
              makeDefault
              position={[0, 55, 0]}
              zoom={5}
              left={-window.innerWidth / 2}
              right={window.innerWidth / 2}
              top={window.innerHeight / 2}
              bottom={-window.innerHeight / 2}
            />
          )}
          <OrbitControls enabled={controls}/>  

          <Suspense fallback={null}>
            <Room rotateButtonRef={rotateButtonRef} deleteButtonRef={deleteButtonRef} objectsData={objectsData} removeObjects={removeObjects}  />
          </Suspense>
          
        </Canvas>
        </div>
        </div>
      </>
    );
}

export default ThreeDScene

