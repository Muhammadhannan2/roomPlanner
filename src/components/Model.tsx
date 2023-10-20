import  { useEffect, useMemo, useState,useRef,useContext} from 'react';
import { Mesh, MeshPhongMaterial } from 'three'
// import { useLoader } from '@react-three/fiber'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import React from 'react';
import { Wireframe, useGLTF } from '@react-three/drei';
import { useLoader,useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import contextState from '../context/contextState';

// const loadModel = async (objLoader: any, mtlLoader: any, {materialUrl, modelUrl, name,positionX,positionY,positionZ,scaleX,scaleY,scaleZ,rotationX,rotationY,rotationZ,rotationAxis,restrictVertical,ground} :ModelProps) => {
const loadModel = async (objLoader: any, mtlLoader: any, props: ModelProps) => {

    const {
      id,
        materialUrl,
        modelUrl,
        name,
        positionX,
        positionY,
        positionZ,
        scaleX,
        scaleY,
        scaleZ,
        rotationX,
        rotationY,
        rotationZ,
        rotationAxis,
        restrictVertical,
        ground,
        size,
        minY,
        maxY
      } = props;
      const baseDevelopmetUrl = 'src/'
      const baseProductionUrl = '/'
    const materials = await mtlLoader.loadAsync(`${baseProductionUrl}assets/SceneAssets/gltfModel/toilet_seat/${materialUrl}`);
    materials.preload();
    objLoader.setMaterials(materials);
  
    const group = await objLoader.loadAsync(`${baseProductionUrl}assets/SceneAssets/gltfModel/toilet_seat/${modelUrl}`);
    console.log(`${name} Loaded`);
  
    const geometries: THREE.BufferGeometry[] = [];
    let i = 0;
  
    group.traverse((child: any) => {
      if (child instanceof Mesh) {
        child.userData.draggable = true;
        child.userData.name = `${name} ` + i;
        geometries.push(child.geometry.clone());
        i++;
      }
    });
  
    geometries.forEach((geometry) => {
      geometry.deleteAttribute('uv');
    });
    // console.log(materials.materials['toiletSeat'])
    const mergedGeometry = mergeGeometries(geometries, false);
    const material = new MeshPhongMaterial({ color: 0xffffff });
    const mesh = new Mesh(mergedGeometry, material);
  
    mesh.position.set(positionX, positionY, positionZ);
    mesh.scale.set(scaleX, scaleY, scaleZ);
    mesh.rotation.set(rotationX, rotationY, rotationZ);
  
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  
    mesh.userData.draggable = true;
    mesh.userData.id = id;
    mesh.userData.name = `${name}`;
    mesh.userData.size = `${size}`;
    mesh.userData.rotationAxis = rotationAxis;
    mesh.userData.restrictVertical = restrictVertical;
    mesh.userData.minY = minY;
    mesh.userData.maxY = maxY;
    mesh.userData.ground = ground;
  
    return mesh;
  };
  
interface ModelProps{
  id:number
    materialUrl:string,
    modelUrl:string,
    name:string

    positionX:number,
    positionY:number,
    positionZ:number,

    scaleX:number,
    scaleY:number,
    scaleZ:number,

    rotationX:number,
    rotationY:number,
    rotationZ:number,

    rotationAxis:string,
    restrictVertical:boolean,
    ground:boolean,
    size:string

    minY :number | null
    maxY :number | null
}
  

const Model: React.FC<ModelProps> = (props) => {

    const [mergedMesh, setMergedMesh] = useState<Mesh | undefined>(undefined);
    const objLoader = useMemo(() => new OBJLoader(), []);
    const mtlLoader = useMemo(() => new MTLLoader(), []);
  
    useEffect(() => {
      loadModel(objLoader, mtlLoader, props).then((mesh) => {
        setMergedMesh(mesh);
      });
    }, []);
    // [objLoader, mtlLoader, props]
    return mergedMesh ? <primitive object={mergedMesh} /> : null;
  };



  export default Model;


  
  
  export const Door = (props) => {
    // const gltf = useLoader(GLTFLoader, 'src/assets/SceneAssets/gltfModel/toilet_seat/door/scene.gltf')
    const {nodes,materials} = useGLTF('src/assets/SceneAssets/gltfModel/toilet_seat/door/scene.gltf')
    // console.log(gltf)
    // const rectangleGeometry = new THREE.BoxGeometry(1, 1, 1); 
    const doorRef:any = useRef();
    const rectangleRef:any = useRef();
  // Create a material for the rectangle
  // const rectangleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); 
  const data = useContext(contextState);
  const {activeCamera} = data
  // useFrame(() => {
  useEffect(() => {
    if (doorRef.current && activeCamera==='orthographic') {
      // Calculate the width and height of the door
      const doorBoundingBox = new THREE.Box3().setFromObject(doorRef.current);
      const doorWidth = doorBoundingBox.max.x - doorBoundingBox.min.x;
      const doorHeight = doorBoundingBox.max.y - doorBoundingBox.min.y;
      // const doorWidth = doorBoundingBox.max.x - doorBoundingBox.min.x;
      // Set the position to match the door's position
      rectangleRef.current.position.copy(doorRef.current.position);
      // rectangleRef.current.rotation.copy(doorRef.current.rotation);

      // Set the scale to match the door's width and height
      // rectangleRef.current.scale.set(doorWidth, 0.1, 2.3);
      if(doorRef.current.rotation.z === 0 ){
        rectangleRef.current.position.x = doorRef.current.position.x + -15
      }
      else if (doorRef.current.rotation.z === 3.15 ) {
        rectangleRef.current.position.x = doorRef.current.position.x + 15
      }
      else if (doorRef.current.rotation.z === 1.58 ) {
        rectangleRef.current.rotation.y = Math.PI /2
        // rectangleRef.current.rotation.y = 1
        rectangleRef.current.position.z = doorRef.current.position.z +15
      }
      rectangleRef.current.scale.set(30, 0.4, 16);
      //     rectangleRef.current.position.y = 1; 
          // rectangleRef.current.position.x = 33; 

      // You can use an EdgesGeometry to create only the outline
      const edges = new THREE.EdgesGeometry(rectangleRef.current.geometry);
      const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const outline = new THREE.LineSegments(edges, outlineMaterial);
      outline.renderOrder = 1; // Ensure the outline appears over the filled rectangle
      rectangleRef.current.add(outline);
    }
  // });
  },[activeCamera]);

  useEffect(() => {
    if (doorRef.current) {
      doorRef.current.userData.name = 'door'; 
      doorRef.current.userData.draggable = true; 
      doorRef.current.userData.ground = false; 
    }
  }, [])
  
  // console.log(rectangleRef)
    return (
      <group {...props} dispose={null}>
      <mesh ref={doorRef} geometry={nodes.Door_low002_Door_0.geometry} material={materials.Door} rotation={[-Math.PI / 2, 0, 0]} scale={15} position={[48,17,0]} userData={{name:'door',draggable:true,ground:false,restrictVertical:true,size:'large',rotationAxis:'z',minY:18,maxY:18}}/>
            {activeCamera==='orthographic' && 
           <mesh ref={rectangleRef}>
         <boxGeometry args={[1, 1, 1]} />
       <meshBasicMaterial visible={false} /> 
      </mesh>
     } 
    </group>
    )
  }
  useGLTF.preload('src/assets/SceneAssets/gltfModel/toilet_seat/door/scene.gltf')
