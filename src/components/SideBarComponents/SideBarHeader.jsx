import { Button, Stack, Typography } from "@mui/material";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
function SideBarHeader({heading,  handleDrawerClose}) {
  return (
    <Stack
      flexDirection="row"
      sx={{
        width: "100%",
        height: "4rem",
        backgroundColor: "#FFF",
        padding: 3,
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography sx={{ fontWeight: "300" }}>{heading}</Typography>
      <Button onClick={handleDrawerClose}>
        <CloseIcon />
      </Button>
    </Stack>
  );
}

export default SideBarHeader;
