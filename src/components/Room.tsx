import { useLoader, useThree,useFrame } from "@react-three/fiber";
import { useEffect, useRef,useContext,useState} from "react";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import Model from './Model';
import { Vector2, Vector3 } from "three";
import React from "react";
import axios from "axios";
import contextState from '../context/contextState';
interface props{
  rotateButtonRef:any
  deleteButtonRef:any
  objectsData: any
  removeObjects:any
  // activeCamera:any
}

const baseDevelopmetUrl = 'src/'
const baseProductionUrl = '/'

export function Room  ({rotateButtonRef, deleteButtonRef,objectsData,removeObjects}:props) {

  // const [wall4Visibility, setWall4Visibility] = useState(true)
  const data = useContext(contextState);
  const {setControls,controls,roomWidth,roomLength,activeCamera} = data
  // const data = useContext(contextState)
   const { camera, scene,raycaster} = useThree();
   const [wall4Visibility, setWall4Visibility] = useState(true)
  //  console.log(size)
  // setSize(700,450,undefined,0,0)
//  const [currentRotation, setCurrentRotation] = useState(0)
  
  //  const canvas = gl.domElement;
  var isDragging = false;
 //const [isDragging, setisDragging] = useState(false)
 const clickMouse = new Vector2();  // create once
 const draggable:any = useRef(null);
    function intersect(pos: THREE.Vector2) {
        raycaster.setFromCamera(pos, camera);
        return raycaster.intersectObjects(scene.children, true);
      }
      
      function onClick(event:any){
        if (event.target && event.target instanceof HTMLElement) {
         // Check if the click event target is one of the excluded buttons
        // console.log('click a button')
         if (event.target.id === 'rotateButton' || event.target.id === 'switchCameraButton' || event.target.id ===  'controlsButton' || event.target.id ===  'rotateImage'|| event.target.id === 'deleteImage') {
           // Clicked on an excluded button, do not trigger the drop action
           // controls.enabled = false 
           return;
         }
       }
       if (draggable.current != null) {
        //if(found.length){}
        console.log(`dropping draggable ${draggable.current.userData.name}`)
        draggable.current = null as any
        //console.log(draggable)
        //  controls.enabled =true;
         rotateButtonRef.current.style.display = 'none';
         deleteButtonRef.current.style.display = 'none';
        return;
      }
      
    
      // THREE RAYCASTER
      clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      const found = intersect(clickMouse);
      if (found.length > 0) {
        console.log(found)
        if (found[0].object.userData.draggable) {
          draggable.current = found[0].object
          //console.log(found)
          console.log(`found draggable ${draggable.current.userData.name}`)
          //console.log(draggable.current.id)
          //controls.enabled =false;
          const buttonPosition = new Vector3(9, 0, 0);
          const objectPosition = draggable.current.position.clone();
          const buttonWorldPosition = buttonPosition.add(objectPosition);
    
          // Project the button's position to screen coordinates
          const buttonScreenPosition = buttonWorldPosition.clone().project(camera);
          const buttonX = (buttonScreenPosition.x + 1) * window.innerWidth * 0.5;
          const buttonY = -(buttonScreenPosition.y - 1) * window.innerHeight * 0.5;
    
          rotateButtonRef.current.style.left = buttonX + 'px';
          rotateButtonRef.current.style.top = buttonY + 'px';
          rotateButtonRef.current.style.display = 'block';

          deleteButtonRef.current.style.left = buttonX + 60 + 'px'; // Adjust the 40 value as needed
          deleteButtonRef.current.style.top = buttonY + 'px'; 
          deleteButtonRef.current.style.display = 'block'
         
          //console.log(draggable)
        }
      }
      }

      function mouseDown(_event:any){
        
        if(draggable.current !=null){
          const found = intersect(clickMouse);
          //console.log(found)
          if (found.length > 0 && found[0].object.userData.draggable) {
            setControls(false)
             isDragging = true
            //setisDragging(true);
            draggable.current = found[0].object;
            // Store the initial mouse position
            // initialMousePosition.set(
            //   (event.clientX / window.innerWidth) * 2 - 1,
            //   -(event.clientY / window.innerHeight) * 2 + 1
            // );
          }
            // Calculate the offset between the object's position and the initial mouse position
            // const intersections = intersect(initialMousePosition);
            // if (intersections.length > 0) {
            //   // Calculate the offset between the object's position and the initial mouse position
            //  // offset.copy(draggable.position).sub(intersections[0].point);
              
            // } else {
            //   // Handle the case when there are no intersections (optional)
            //   console.log('No intersections found.');
            // }
          }
      }
      function mouseMove(event:any){

        if (isDragging && draggable.current != null ) {
          // setControls(false)
          const newMousePosition = new Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
          );
          // console.log(draggable.current.position)
         const found = intersect(newMousePosition);
          if (found.length > 0) {
            for (let i = 0; i < found.length; i++) {
              const object = found[i].object;
              if (!object.userData.ground) {
                continue;
              }
              const buttonPosition = new Vector3(1.5, 0, 0); // Relative to the object
              const objectPosition = draggable.current.position.clone();
              const buttonWorldPosition = buttonPosition.add(objectPosition);
          
              // Project the button's position to screen coordinates
              const buttonScreenPosition = buttonWorldPosition.clone().project(camera);
              const buttonX = (buttonScreenPosition.x + 1) * window.innerWidth * 0.5;
              const buttonY = -(buttonScreenPosition.y - 1) * window.innerHeight * 0.5;
          
              // Update the button's position
              rotateButtonRef.current.style.left = buttonX + 'px';
              rotateButtonRef.current.style.top = buttonY + 'px';

              // deleteButtonRef.current.style.left = buttonX + 40 + 'px';
              deleteButtonRef.current.style.left = buttonX + 60 + 'px'; // Adjust the 40 value as needed
              deleteButtonRef.current.style.top = buttonY + 'px'; 

              let target = found[i].point;
 
              if (draggable.current.userData.restrictVertical) {
                // const minX = -100;
                // const maxX = 100;
                minX = -((roomWidth/2));
                maxX = ((roomWidth/2));
                const minY = draggable.current.userData.minY;
                const maxY = draggable.current.userData.maxY;
                // const minZ = -46.6;
                // const maxZ = -46.6;
       
                if (
                  target.x >= minX && target.x <= maxX 
                  
                  // && target.y >= minY && target.y <= maxY
                ) {

                 // target.z = Math.max(target.z, -46.7);
                  // target.x = Math.max(Math.min(target.x, 49.3), -49.3);
                  // target.z = Math.max(Math.min(target.z, 49.5), -49.5);
                  target.y = Math.min(Math.max(target.y, minY), maxY);
                  draggable.current.position.x = target.x;
                  draggable.current.position.y = target.y;
                  draggable.current.position.z = target.z;
                  if (target.z <= -((roomLength/2)-10)) {
                    // if (target.z <= -40.7) {
                    if(draggable.current.userData.rotationAxis==='y'){
                      draggable.current.rotation.y = 1.6;
                      console.log('here')
                    }
                    else if(draggable.current.userData.rotationAxis==='z' && draggable.current.userData.name === 'door'){
                      draggable.current.rotation.z = 1.58;
                      console.log(draggable.current.rotation.z);
                    }
                    else{
                      draggable.current.rotation.z = 0;
                    }
                    // Rotate for Z-axis hit
                    // Your rotation logic for Z-axis here
                    // target.z = Math.max(Math.min(target.z, 44.5), -46.7);
                  }
                  if (target.x >= ((roomWidth/2)-8) && target.z >=-(roomLength/2)-2) {
                    // if (target.x >= 43 && target.z >=-49.5) {
                    // Rotate for X-axis hit
                    // Your rotation logic for X-axis here
                    if(draggable.current.userData.rotationAxis==='y'){
                      draggable.current.rotation.y = 6.3;
                    }
                    else if(draggable.current.userData.rotationAxis==='z' && draggable.current.userData.name === 'door'){
                      // draggable.current.rotation.z = 3.15;
                      draggable.current.rotation.z = 0;
                      console.log(draggable.current.rotation.z);
                    }
                    else{
                      draggable.current.rotation.z = 11;
                    }
                    // target.z = Math.max(Math.min(target.z, 44.5), -48);
                  }
                  if (target.x <= -((roomWidth/2)-8) && target.z >=-(roomLength/2)-2) {
                    // if (target.x <= -43 && target.z >=-49.5) {
                    // Rotate for X-axis hit
                    // Your rotation logic for X-axis here
                    if(draggable.current.userData.rotationAxis==='y'){
                      draggable.current.rotation.y = 3.1;
                    }
                    else if(draggable.current.userData.rotationAxis==='z' && draggable.current.userData.name === 'door'){
                      draggable.current.rotation.z = 3.15;
                      // draggable.current.rotation.z = 0;
                      console.log(draggable.current.rotation.z);
                    }
                    else{
                      draggable.current.rotation.z = -11;
                    }
                    // target.z = Math.max(Math.min(target.z, 44.5), -48);
                
                }
                }
              } else {
                var minX:any ;
                var maxX:any ;
                const minY = -1;
                const maxY = 10;
                // const minZ = -33.5;
                var minZ:any;
                var maxZ:any;
                // const maxZ = (roomLength/2)-20;
                // const maxZ = 35;
                if(draggable.current.userData.size==='small'){
                  //  minX = -48;
                  //  maxX = 48;
                  //  minZ = -49;
                   minX = -((roomWidth/2)-2);
                   maxX = ((roomWidth/2)-2);
                   minZ = -((roomLength/2)-1);
                   maxZ = Math.floor(roomLength/3-2);
                   if(roomLength>100){
                    minZ = -((roomLength/2)-1);
                    maxZ = Math.floor(roomLength/2-15);
                   }
                  //  maxZ = (roomLength/3)-1;
                  //  console.log(maxZ)
                }
                else if(draggable.current.userData.size==='large'){
                  //  minX = -42.5;
                  //  maxX = 42.5;
                  //  minZ = -33.5;
                  minX = -((roomWidth/2)-8.5);
                  maxX = ((roomWidth/2)-8.5);
                  minZ = -Math.floor((roomLength/3));
                  maxZ = Math.floor((roomLength/2)-10);
                  // console.log(minZ)
                  if(roomLength>100){
                    minZ = -((roomLength/2)-10);
                    maxZ = Math.floor(roomLength/2-10);
                   }
                  // minZ = -2;
                }
                if (
                  target.x >= minX && target.x <= maxX &&
                  target.y >= minY && target.y <= maxY
                  && target.z >= minZ && target.z <= maxZ
                ) {
                  // target.x = Math.max(Math.min(target.x, 40.3), -40.3);
                  // target.x = Math.max(Math.min(target.x, 49.3), -49.3);
                  draggable.current.position.x = target.x;
                  draggable.current.position.z = target.z;
      
                  // if(target.z<=-40.7){
                  //   draggable.rotation.z = 11
                  // }
                  // if(target.x>=47.6){
                  //   draggable.rotation.z = -3.15
                  // }
                  // if(target.x<=-47.6){
                  //   draggable.rotation.z = 0
                  // }
                }
              }
            }
          }
        }
      }
      function mouseUp(_event:any){
        // event.preventDefault();
        // event.stopPropagation()
        if (isDragging) {
          isDragging = false;
          setControls(true)
          // setisDragging(false) ;
          // draggable = null as any 
          // rotateButton.style.display = 'none';
          // if(controls.enabled===true){
          //   console.log('stopping controls')
          //   controls.enabled = true;
          // }
        }
      }
      function rotate(_event:any){
       // console.log(isObjectSelected)
       //let currentRotation = 0; 
      //  setCurrentRotation(currentRotation+(Math.PI / 4))
      //  currentRotation += Math.PI / 4;
      if (draggable.current !==null) {
        // let newRotation = currentRotation + (Math.PI / 4);
        // console.log(newRotation);
          if(draggable.current.userData.restrictVertical){
            if(draggable.current.userData.rotationAxis==='y'){
              // draggable.current.rotation.y +=0.5
              draggable.current.rotation.y += Math.PI / 2;
              console.log('rotation', draggable.current.rotation.y)
            }
            else{
              // draggable.current.rotation.z +=0.5
              draggable.current.rotation.z += Math.PI / 2;
              console.log('rotation', draggable.current.rotation.y)
            }
          }
          else{
            if(draggable.current.userData.rotationAxis==='y'){
              // draggable.current.rotation.y +=0.5
              draggable.current.rotation.y += Math.PI / 2;
              console.log('rotation', draggable.current.rotation.y)
            }
            else if(draggable.current.userData.rotationAxis==='z'){
              // draggable.current.rotation.z +=0.5
              draggable.current.rotation.z += Math.PI / 2;
              console.log('rotation', draggable.current.rotation.z)
              console.log('2')
            }
            else if(draggable.current.userData.rotationAxis==='x'){
              // draggable.current.rotation.x +=0.5
              draggable.current.rotation.x += Math.PI / 2;
              console.log('rotation', draggable.current.rotation.y)
              console.log('3')
            }
          }
        }
      }

useEffect(() => {
  if(activeCamera==='orthographic'){
    deleteButtonRef.current.style.display = 'none'
    rotateButtonRef.current.style.display = 'none';
  }
    // console.log(camera.position) 
    raycaster.camera = camera;
    deleteButtonRef.current.addEventListener('click',()=>removeObjects(draggable.current.userData.id))
    // deleteButtonRef.current.addEventListener('click',setControls(true))
    rotateButtonRef.current.addEventListener('click',rotate)
    if(activeCamera==='perspective'){
      window.addEventListener('click',onClick)
      window.addEventListener('mousedown',mouseDown)
    }
    
    window.addEventListener('mousemove',mouseMove)
    window.addEventListener('mouseup',mouseUp)
    // if (camera.position.x >= 90 || camera.position.x <= 120) {
    //   setWall4Visibility(false);
    //   // setWall4Visibility(true);
    //   console.log(wall4Visibility)
    // } else {
    //   // setWall4Visibility(false);
    //   setWall4Visibility(true);
    //   console.log(wall4Visibility)
    // }
    // console.log(camera)
  return () => {
    window.removeEventListener('click', onClick);
    window.removeEventListener('mousedown',mouseDown)
    window.removeEventListener('mousemove',mouseMove)
    window.removeEventListener('mouseup',mouseUp)
  }
}, [camera,camera.position,roomLength,roomWidth])



    return (
      <>
        {/* <button id='controlsButton' disabled={activeCamera==='orthographic'}onClick={switchControls} style={{top:'10%'}}>Controls {controls=== true ?"enabled":"disabled"}</button> */}
          <CreateFloor />
          <CreateWalls camera = {camera} wall4Visibility={wall4Visibility} setWall4Visibility={setWall4Visibility}/>
          {/* <CreateWalls wall4Visibility= {wall4Visibility}/> */}
          {objectsData && objectsData.map((item:any) => (
                <Model
                key={item.id} // Don't forget to add a unique key when mapping through components
                id={item.id}
                materialUrl={item.materialUrl}
                modelUrl={item.modelUrl}
                name={item.name}
                positionX={item.positionX}
                positionY={item.positionY}
                positionZ={item.positionZ}
                scaleX={item.scaleX}
                scaleY={item.scaleY}
                scaleZ={item.scaleZ}
                rotationX={item.rotationX}
                rotationY={item.rotationY}
                rotationZ={item.rotationZ}
                rotationAxis={item.rotationAxis}
                minY={item.minY}
                maxY={item.maxY}
                restrictVertical={item.restrictVertical}
                ground={item.ground}
                size={item.size}
                />
            ))}
      </>
    );
  };
  




  export function CreateFloor () {
    const data = useContext(contextState);
    const {roomWidth,roomLength} = data

    const materials = useLoader(MTLLoader, `${baseProductionUrl}assets/SceneAssets/model/floor.mtl`);
    materials.preload();
     const customMaterial = materials.materials['lambert1'];
  
    
      return (
        <mesh receiveShadow castShadow userData={{ ground: true, name:'floor' }}>
          <boxGeometry args={[roomWidth, 1, roomLength]} />
          <meshPhongMaterial {...customMaterial} />
        </mesh>
      );
    
  
    return null;
  };
  

//   export default Room

  const wallThickness = 0.3;
  
export  function  CreateWalls ({camera,wall4Visibility,setWall4Visibility}) {
    // Front wall
  //createWall(100, 40, wallThickness, 0, 20, -46.8); //(length,height, thickness,left right,up down, forward backward)

  // Left wall
  //createWall(wallThickness, 40, 100, -49.8, 20, 3); //(thickness,height,length,forward backward, up down, left right)

  // Right wall
  //createWall(wallThickness, 40, 100, 49.8, 20, 3); //(thickness,height,left right, forward backdward,up down, left right)

  //back wall
  //createWall(100, 40, wallThickness, 0, 20, -46.8); //(length,height, thickness,left right,up down, forward backward)
 
//   useEffect(() => { 
//     // && camera.position.z >=160 && camera.position.z <=132
//     if (camera.position.x >= -90 && camera.position.x <= 120  ) {
//      setWall4Visibility(false);
//      console.log(wall4Visibility)
//     //  console.log(first)
//    } else {
//      setWall4Visibility(true);
//      console.log(wall4Visibility)
//    }
//    console.log(camera.position);
// }, [wall4Visibility,camera.position.x,camera]); 
const data = useContext(contextState);
const {roomWidth,roomLength,wallHeight} = data
    return (
      <>
        <Wall width={roomWidth} height={wallHeight} depth={wallThickness} x={0} y={wallHeight/2} z={-((roomLength/2)-0.2)} name="wall1" visible={true} rotationX={0} rotationY={0} rotationZ={0}/>
        <Wall width={roomLength} height={wallHeight} depth={wallThickness} x={-(roomWidth/2)} y={wallHeight/2} z={0} name="wall2" visible={true} rotationX={0} rotationY={20.42} rotationZ={0}/>
        <Wall width={roomLength} height={wallHeight} depth={wallThickness} x={roomWidth/2} y={wallHeight/2} z={0} name="wall3" visible={true} rotationX={0} rotationY={-20.42} rotationZ={0}/>
        {/* <Wall width={wallThickness} height={40} depth={100} x={-49.8} y={20} z={0} name="wall2" visible={true} rotationX={} rotationY={} rotationZ={}/>
        <Wall width={wallThickness} height={40} depth={100} x={49.8} y={20} z={0} name="wall3" visible={true} rotationX={} rotationY={} rotationZ={}/> */}

        {/* <Wall width={100} height={40} depth={wallThickness} x={0} y={20} z={49.8} name="wall4" visible={wall4Visibility}/> */}
      </>
    );
  };
  


interface wallProps{
    width:any,
    height:any,
    depth:any,
    x:any,
    y:any,
    z:any,
    name:any,
    visible:boolean,
    rotationX :any
    rotationY :any
    rotationZ :any
}
  const Wall = ({ width, height, depth, x, y, z, name,visible,rotationX,rotationY,rotationZ }:wallProps) => {

    const materials = useLoader(MTLLoader, `${baseProductionUrl}assets/SceneAssets/textures/wall.mtl`);
    materials.preload();
    const wallMaterial = materials.materials['wall'];
    // console.log(wallMaterial)
    return (
      <mesh receiveShadow castShadow position={[x, y, z]} userData={{ ground: true, name }} visible={visible} rotation={[rotationX,rotationY,rotationZ]} >  
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial map={wallMaterial.map} />
      </mesh>
    );
  };