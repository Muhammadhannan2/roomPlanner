import { Box, Button, Stack, Typography } from "@mui/material";
import React,{useContext} from "react";
import CloseIcon from "@mui/icons-material/Close";
import SideBarHeader from "../SideBarHeader";
import FloorPlanMain from "./FloorPlanMain";
import RDInput from "./RDInput";
import contextState from "../../../context/contextState";
const fontStyle = {
  fontSize: "18px",
  fontWeight: 300,
};
function RoomLayout({handleDrawerClose}) {
  const data = useContext(contextState);
  const {roomWidth, setRoomWidth,roomLength, setRoomLength,wallHeight, setWallHeight} = data

  return (
    <Box>
      <SideBarHeader heading="Room Layout"   handleDrawerClose={handleDrawerClose}/>
      <Box sx={{ p: 2 }}>
        {/* <Typography sx={[fontStyle, { mb: 2 }]}>Floorplan</Typography>
        <FloorPlanMain /> */}
        <Typography sx={[fontStyle, { my: 2 }]}>Room Dimensions</Typography>
        <RDInput titleStart="Room Width" titleEnd="mm" value={roomWidth} setValue={setRoomWidth} />
        <RDInput titleStart="Room Length" titleEnd="mm" value={roomLength} setValue={setRoomLength} />
        <RDInput titleStart="Cutout Width" titleEnd="mm" value={298} setValue="" />
        <RDInput titleStart="Cutout Length" titleEnd="mm" value={900} setValue="" />
        <RDInput titleStart="Ceiling Height" titleEnd="mm" value={wallHeight} setValue={setWallHeight} />
      
      </Box>
    </Box>
  );
}

export default RoomLayout;
