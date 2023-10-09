import React from "react";

import FP1 from "../../../assets/floorplan1.svg";
import FP2 from "../../../assets/fp2.svg";
import FP3 from "../../../assets/fp3.svg";
import FP4 from "../../../assets/fp4.svg";
import FP5 from "../../../assets/fp5.svg";
import FloorPlanBox from "./FloorPlanBox";
import { Box } from "@mui/material";

const allFloorPlans = [
  { src: FP1 },
  { src: FP2 },
  { src: FP3 },
  { src: FP4 },
  { src: FP5 },
];
function FloorPlanMain() {
  return (
    <Box>
      {allFloorPlans?.map((item, index) => (
        <FloorPlanBox imgSrc={item.src} key={index} />
      ))}
    </Box>
  );
}

export default FloorPlanMain;
