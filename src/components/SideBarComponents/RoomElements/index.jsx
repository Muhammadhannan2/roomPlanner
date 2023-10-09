import { Box, Typography } from "@mui/material";
import React from "react";
import SideBarHeader from "../SideBarHeader";
import RoomItem from "./RoomItem";
import { RoomElementData } from "./data";

const fontStyle = {
  fontSize: "18px",
  fontWeight: 300,
};
function RoomElement({handleDrawerClose}) {
  return (
    <Box >
      <SideBarHeader heading="Room Element"  handleDrawerClose={handleDrawerClose} />
      <Typography sx={[fontStyle, { my: 2, mx: 2 }]}>
        Add Room Elements
      </Typography>
      {/* <RoomItem /> */}
      <Box
        sx={{
          display: "flex ",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 2,
          gap: 2,
          justifyContent: "center",
        }}
      >
        {RoomElementData?.map((item, idx) => (
          <RoomItem srcImg={item.srcImg} model={item.model} key={idx} />
        ))}
      </Box>
    </Box>
  );
}

export default RoomElement;
