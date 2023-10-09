import { Box, Button, Icon, Stack, Typography } from "@mui/material";
import React, { useCallback, useContext } from "react";
import Door from "../../../assets/RoomElementIcons/door.svg";
import AddIcon from "@mui/icons-material/Add";
import contextState from "../../../context/contextState";

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



function RoomItem({srcImg,model}) {

  const data = useContext(contextState)
  const {setObjectsData} = data
  const addObjects = useCallback((object) => {
    setObjectsData((prevObjectsData) => [...prevObjectsData, object]);
  }, []);



  return (
    <Box
      boxShadow={2}
      sx={{
        backgroundColor: "#FFF",
        width: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2
      }}
    >
      <Typography sx={{fontWeight: 300, my: 2}}>{model.name}</Typography>

      <img src={srcImg} style={{width:'60%'}} />

      <Button
        flexDirection="row"
        alignItems="center"
        p={1}
        sx={{ borderRadius: 20, boxShadow: 2, color: "#303030", my: 2 }}
        onClick={()=>addObjects(model)}
      >
        <Typography sx={{ fontSize: "12px" }}>Add to Plan</Typography>
        <AddIcon ml={1} />
      </Button>
    </Box>
  );
}

export default RoomItem;
