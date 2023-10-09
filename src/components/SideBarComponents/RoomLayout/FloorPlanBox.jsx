import { Box, Button } from "@mui/material";
import React from "react";

function FloorPlanBox({imgSrc}) {
  return (
    <Button>
      <Box
        height="80px"
        width="100px"
        boxShadow={3}
        sx={{
          backgroundColor: "#FFF",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={imgSrc} />
      </Box>
    </Button>
  );
}

export default FloorPlanBox;
