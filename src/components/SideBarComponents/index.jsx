import { Typography } from "@mui/material";
import React from "react";
import RoomLayout from "./RoomLayout";
import { ROOM_ELEMENT, ROOM_LAYOUT, BATHROOM_PRODUCTS } from "./MenuConstants.js";
import RoomElement from "./RoomElements";
import BathroomProducts from "./BathroomProducts";

function MainRoomItems({ roomTitle, handleDrawerClose }) {
  console.log(roomTitle);
  switch (roomTitle) {
    case ROOM_LAYOUT:
      return <RoomLayout  handleDrawerClose={handleDrawerClose} />;
    case ROOM_ELEMENT: 
      return <RoomElement  handleDrawerClose={handleDrawerClose} />
    case BATHROOM_PRODUCTS: 
      return <BathroomProducts handleDrawerClose={handleDrawerClose} />
    default:
      break;
  }
}

export default MainRoomItems;
