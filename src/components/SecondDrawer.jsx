import { Box, Typography } from "@mui/material";
import React from "react";
import MainRoomItems from "./SideBarComponents";

function SecondDrawer({ roomTitle,  handleDrawerClose }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "-webkit-fill-available",
        backgroundColor: "rgba(255,255,255,0.5)",
        position: "absolute",
        left:"3.4%",
        top:"7%",
        overflowY: "scroll"
      }}
    >
      <MainRoomItems roomTitle={roomTitle}   handleDrawerClose={handleDrawerClose}/>
    </Box>
  );
}

export default SecondDrawer;
