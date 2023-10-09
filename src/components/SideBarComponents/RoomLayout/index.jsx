import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SideBarHeader from "../SideBarHeader";
import FloorPlanMain from "./FloorPlanMain";
import RDInput from "./RDInput";
const fontStyle = {
  fontSize: "18px",
  fontWeight: 300,
};
function RoomLayout({handleDrawerClose}) {
  return (
    <Box>
      <SideBarHeader heading="Room Layout"   handleDrawerClose={handleDrawerClose}/>
      <Box sx={{ p: 2 }}>
        <Typography sx={[fontStyle, { mb: 2 }]}>Floorplan</Typography>
        <FloorPlanMain />
        <Typography sx={[fontStyle, { my: 2 }]}>Room Dimensions</Typography>
        <RDInput titleStart="Room Width" titleEnd="mm" value={299} setValue="" />
        <RDInput titleStart="Room Length" titleEnd="mm" value={2000} setValue="" />
        <RDInput titleStart="Cutout Width" titleEnd="mm" value={298} setValue="" />
        <RDInput titleStart="Cutout Length" titleEnd="mm" value={900} setValue="" />
        <RDInput titleStart="Ceiling Height" titleEnd="mm" value={2400} setValue="" />
      
      </Box>
    </Box>
  );
}

export default RoomLayout;
