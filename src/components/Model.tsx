import  { useEffect, useMemo, useState} from 'react';
import { Mesh, MeshPhongMaterial } from 'three'
// import { useLoader } from '@react-three/fiber'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import React from 'react';


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