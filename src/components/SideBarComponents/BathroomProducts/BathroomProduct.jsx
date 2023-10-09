import { Box, Button, Icon, Stack, Typography, Paper } from "@mui/material";
import React from "react";
import Door from "../../../assets/RoomElementIcons/door.svg";
import AddIcon from "@mui/icons-material/Add";
function BathroomProduct({title, srcImg}) {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#FFF",
        width: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
      }}
    >

      <img src={srcImg} style={{width:150}} />

      <Typography textAlign='center' sx={{fontWeight: 300, my: 2}}>{title}</Typography>
    </Paper>
  );
}

export default BathroomProduct;
