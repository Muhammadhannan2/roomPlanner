// import Door from "../../../assets/RoomElementIcons/door.svg";
// import GSS from "../../../assets/RoomElementIcons/genericShower.svg";
// import internalWall from "../../../assets/RoomElementIcons/internalWall.svg";
// import niche from "../../../assets/RoomElementIcons/niche.svg";
// import obstacle from "../../../assets/RoomElementIcons/obstacle.svg";
// import window from "../../../assets/RoomElementIcons/window.svg";
import tub from "../../../assets/SceneAssets/modelsImg/tub.jpg";
import shower from "../../../assets/SceneAssets/modelsImg/shower.jpg";
import toiletSeat from "../../../assets/SceneAssets/modelsImg/toiletSeat.jpg";
import basin from "../../../assets/SceneAssets/modelsImg/basin.jpg";
export const RoomElementData = [
  { srcImg: tub, 
     model : {
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
  }},
  { srcImg: toiletSeat, 
    model : {
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
  }},
  { srcImg: shower,
    model :{
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
  }},
  { srcImg: basin,
    model : {
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
    }},
  // { srcImg: obstacle },
  // { srcImg: window },s
];
