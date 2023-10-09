import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import SecondDrawer from "../components/SecondDrawer";
import PlannerDrawer from "../components/PlannerDrawer";
import PlannerAppBar from "../components/PlannerAppBar";
import ThreeDScene from '../components/ThreeDScene';

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [roomTitle, setRoomTitle] = React.useState("")


  const openMainDrawer = (buttonTitle) => {
    setOpen(false);
    setRoomTitle(buttonTitle)
    setOpenDrawer(true);
  };

  const closeMainDrawer = () => {
    setOpen(false);
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    console.log("Close")
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PlannerAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <PlannerDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        openMainDrawer={openMainDrawer}
      />
      <Box
        sx={{
          zIndex:2,
          display: "flex",
          width: "100%",
          height: "100vh",
          // marginTop: "4rem",
        }}
      >
        {openDrawer && <SecondDrawer roomTitle={roomTitle}  handleDrawerClose={closeMainDrawer}  />}
        <Box
          sx={{
            // display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "#e5e7eb",
            // alignItems: "center",
            // justifyContent: "center"
          }}
        >
          {/* 3JS MODEL */}
          <ThreeDScene />
        </Box>
      </Box>
    </Box>
  );
}
