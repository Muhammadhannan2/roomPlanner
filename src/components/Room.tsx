import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef} from "react";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import Model from './Model';
import { Vector2, Vector3 } from "three";
import React from "react";
import axios from "axios";
//import contextState from "../context/contextState";

// const objectsData=[
//   {
//       id:1,
//       materialUrl:'toiletSeat.mtl',
//       modelUrl:'noir.obj',
//       name:'Tub_Model',
//       positionX:0,
//       positionY:0,
//       positionZ:0,
//       scaleX:0.02,
//       scaleY:0.02,
//       scaleZ:0.02,
//       rotationX:0,
//       rotationY:0,
//       rotationZ:-0.02,
//       minY:null,
//       maxY:null,
//       rotationAxis:'y',
//       restrictVertical:false,
//       ground:false,
//       size:'large'
//   },
//   {
//       id:2,
//       materialUrl:'toiletSeat.mtl',
//       modelUrl:'toiletSeat.obj',
//       name:'Toilet_seat',
//       positionX:20,
//       positionY:0,
//       positionZ:0,
//       scaleX:0.04,
//       scaleY:0.04,
//       scaleZ:0.04,
//       rotationX:-89.5,
//       rotationY:0,
//       rotationZ:11,
//       minY:null,
//       maxY:null,
//       rotationAxis:'z',
//       restrictVertical:false,
//       ground:false,
//       size:'small'
//   },
//   {
//       id:3,
//       materialUrl:'toiletSeat.mtl',
//       modelUrl:'shower.obj',
//       name:'shower',
//       positionX:0,
//       positionY:29,
//       positionZ:-49.5,
//       scaleX:0.023,
//       scaleY:0.023,
//       scaleZ:0.023,
//       rotationX:29.85,
//       rotationY:0,
//       rotationZ:0,
//       minY:28,
//       maxY:34,
//       rotationAxis:'z',
//       restrictVertical:true,
//       ground:false,
//       size:'small'
//   },
// ]
// const objectsData:any = []
// const tub = {
//   id:1,
//   materialUrl:'toiletSeat.mtl',
//   modelUrl:'noir.obj',
//   name:'Tub_Model',
//   positionX:0,
//   positionY:0,
//   positionZ:0,
//   scaleX:0.02,
//   scaleY:0.02,
//   scaleZ:0.02,
//   rotationX:0,
//   rotationY:0,
//   rotationZ:-0.02,
//   minY:null,
//   maxY:null,
//   rotationAxis:'y',
//   restrictVertical:false,
//   ground:false,
//   size:'large'
// }
// const toiletSeat = {
//   id:2,
//   materialUrl:'toiletSeat.mtl',
//   modelUrl:'toiletSeat.obj',
//   name:'Toilet_seat',
//   positionX:20,
//   positionY:0,
//   positionZ:0,
//   scaleX:0.04,
//   scaleY:0.04,
//   scaleZ:0.04,
//   rotationX:-89.5,
//   rotationY:0,
//   rotationZ:11,
//   minY:null,
//   maxY:null,
//   rotationAxis:'z',
//   restrictVertical:false,
//   ground:false,
//   size:'small'
// }
// const shower = {
//   id:3,
//   materialUrl:'toiletSeat.mtl',
//   modelUrl:'shower.obj',
//   name:'shower',
//   positionX:0,
//   positionY:29,
//   positionZ:-49.5,
//   scaleX:0.023,
//   scaleY:0.023,
//   scaleZ:0.023,
//   rotationX:29.85,
//   rotationY:0,
//   rotationZ:0,
//   minY:28,
//   maxY:34,
//   rotationAxis:'z',
//   restrictVertical:true,
//   ground:false,
//   size:'small'
// }
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
  // const data = useContext(contextState)
   const { camera, scene,raycaster} = useThree();
  //  console.log(size)
  // setSize(700,450,undefined,0,0)
 // const [isActionsEnabled, setisActionsEnabled] = useState(true)
  
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
          deleteButtonRef.current.style.display = 'block'; 
          //console.log(draggable)
        }
      }
      }

      function mouseDown(_event:any){
        if(draggable.current !=null){
  
          const found = intersect(clickMouse);
          //console.log(found)
          if (found.length > 0 && found[0].object.userData.draggable) {
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
          const newMousePosition = new Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
          );
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
      
      
              // const target = intersect(newMousePosition)[0].point.clone().add(offset);
                // const target = found[0].point.clone().add(offset);
              let target = found[i].point;
              // const initialOffset = newMousePosition.clone().sub(initialMousePosition);
              // const target = draggable.position.clone().add(initialOffset);
              // draggable.position.copy(target)
              // initialMousePosition.copy(newMousePosition);
             

              if (draggable.current.userData.restrictVertical) {
                const minX = -100;
                const maxX = 100;
                const minY = draggable.current.userData.minY;
                const maxY = draggable.current.userData.maxY;
                // const minZ = -46.6;
                // const maxZ = -46.6;
       
                if (
                  target.x >= minX && target.x <= maxX 
                  // && target.y >= minY && target.y <= maxY
                ) {
                 // target.z = Math.max(target.z, -46.7);
                  target.x = Math.max(Math.min(target.x, 49.3), -49.3);
                  target.z = Math.max(Math.min(target.z, 49.5), -49.5);
                  
                  target.y = Math.min(Math.max(target.y, minY), maxY);
                  draggable.current.position.y = target.y;
                  draggable.current.position.x = target.x;
                  draggable.current.position.z = target.z;
                  if (target.z <= -40.7) {
                    if(draggable.current.userData.rotationAxis==='y'){
                      draggable.current.rotation.y = 1.6;
                    }
                    else{
                      draggable.current.rotation.z = 0;
                    }
                    // Rotate for Z-axis hit
                    // Your rotation logic for Z-axis here
                    // target.z = Math.max(Math.min(target.z, 44.5), -46.7);
                  }
                  if (target.x >= 43 && target.z >=-49.5) {
                    // Rotate for X-axis hit
                    // Your rotation logic for X-axis here
                    if(draggable.current.userData.rotationAxis==='y'){
                      draggable.current.rotation.y = 6.3;
                    }
                    else{
                      draggable.current.rotation.z = 11;
                    }
                    // target.z = Math.max(Math.min(target.z, 44.5), -48);
                  }
                  if (target.x <= -43 && target.z >=-49.5) {
                    // Rotate for X-axis hit
                    // Your rotation logic for X-axis here
                    if(draggable.current.userData.rotationAxis==='y'){
                      draggable.current.rotation.y = 3.1;
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
                const maxZ = 35;
                if(draggable.current.userData.size==='small'){
                   minX = -48;
                   maxX = 48;
                   minZ = -49;
                }
                else if(draggable.current.userData.size==='large'){
                   minX = -42.5;
                   maxX = 42.5;
                   minZ = -33.5;
                }
                if (
                  target.x >= minX && target.x <= maxX &&
                  target.y >= minY && target.y <= maxY
                  && target.z >= minZ && target.z <= maxZ
                ) {
                  target.x = Math.max(Math.min(target.x, 49.3), -49.3);
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
        if (draggable.current !==null) {
          if(draggable.current.userData.restrictVertical){
            if(draggable.current.userData.rotationAxis==='y'){
              draggable.current.rotation.y +=0.5
            }
            else{
              draggable.current.rotation.z +=0.5
            }
          }
          else{
            if(draggable.current.userData.rotationAxis==='y'){
              draggable.current.rotation.y +=0.5
            }
            else if(draggable.current.userData.rotationAxis==='z'){
              draggable.current.rotation.z +=0.5
              console.log('2')
            }
            else if(draggable.current.userData.rotationAxis==='x'){
              draggable.current.rotation.x +=0.5
              console.log('3')
            }
          }
          
        }
      }
useEffect(() => {
  //activeCamera === 'perspective' ? setisActionsEnabled(true) : setisActionsEnabled(false); 
  // if(isActionsEnabled){
    raycaster.camera = camera;
    // deleteButtonRef.current.addEventListener('click',()=>removeObjects(draggable.current.userData.id))
    rotateButtonRef.current.addEventListener('click',rotate)
    window.addEventListener('click',onClick)
    window.addEventListener('mousemove',mouseMove)
    window.addEventListener('mousedown',mouseDown)
    window.addEventListener('mouseup',mouseUp)
  // }
  return () => {
    window.removeEventListener('click', onClick);
    window.removeEventListener('mousedown',mouseDown)
    window.removeEventListener('mousemove',mouseMove)
    window.removeEventListener('mouseup',mouseUp)
  }
}, [camera])

    return (
      <>
        {/* <button id='controlsButton' disabled={activeCamera==='orthographic'}onClick={switchControls} style={{top:'10%'}}>Controls {controls=== true ?"enabled":"disabled"}</button> */}
          <CreateFloor />
          <CreateWalls />
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

    const materials = useLoader(MTLLoader, `${baseProductionUrl}assets/SceneAssets/model/floor.mtl`);
    materials.preload();
     const customMaterial = materials.materials['lambert1'];
  
    
      return (
        <mesh receiveShadow castShadow userData={{ ground: true, name:'floor' }}>
          <boxGeometry args={[100, 2, 100]} />
          <meshPhongMaterial {...customMaterial} />
        </mesh>
      );
    
  
    return null;
  };
  

//   export default Room

  const wallThickness = 0.3;
  
export  function  CreateWalls () {
    // Front wall
  //createWall(100, 40, wallThickness, 0, 20, -46.8); //(length,height, thickness,left right,up down, forward backward)

  // Left wall
  //createWall(wallThickness, 40, 100, -49.8, 20, 3); //(thickness,height,length,forward backward, up down, left right)

  // Right wall
  //createWall(wallThickness, 40, 100, 49.8, 20, 3); //(thickness,height,left right, forward backdward,up down, left right)

    return (
      <>
        <Wall width={100} height={40} depth={wallThickness} x={0} y={20} z={-49.8} name="wall1" />
        <Wall width={wallThickness} height={40} depth={100} x={-49.8} y={20} z={0} name="wall2" />
        <Wall width={wallThickness} height={40} depth={100} x={49.8} y={20} z={0} name="wall3" />
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
}
  const Wall = ({ width, height, depth, x, y, z, name }:wallProps) => {

    const materials = useLoader(MTLLoader, `${baseProductionUrl}assets/SceneAssets/textures/wall.mtl`);
    materials.preload();
    const wallMaterial = materials.materials['wall'];
    console.log(wallMaterial)
    return (
      <mesh receiveShadow castShadow position={[x, y, z]} userData={{ ground: true, name }}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial map={wallMaterial.map} />
      </mesh>
    );
  };