
import {
  Box,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import LoginLeft from "../components/AuthComponents/LoginLeft";
import LoginRight from "../components/AuthComponents/LoginRight";

function LoginPage() {

  return (
    <Box
      sx={{
        height: { xs: "200vh", md: "100vh" },
        width: "100vw",
        backgroundColor: "#DBDBDB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Grid
        container
        sx={{
          height: { xs: "100%", md: "90%" },
          width: { xs: "100%", md: "800px" },
          backgroundColor: "#fff",
        }}
      >
        <Grid item xs={12} md={6}>
          <LoginLeft />
        </Grid>
        <Grid item xs={12} md={6} sx={{ backgroundColor: "#003057" }}>
          <LoginRight />
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginPage;
