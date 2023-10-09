import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function LoginLeft() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // padding: 4,
        m: 4,
      }}
    >
      <Typography
        sx={{ fontSize: "24px", fontWeight: "400", color: "#2d333a" }}
      >
        Welcome
      </Typography>
      <Typography
        sx={{ fontSize: "14px", color: "#2d333a", fontWeight: "300" }}
      >
        Login to your account below
      </Typography>
      <Box sx={{ mt: 2, width: "100%" }}>
        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth={true}
        />
        <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>

      <Link href="#" sx={{ mt: 2 }} color="#0063B5">
        Forgot password?
      </Link>

      <Button
        variant="contained"
        sx={{
          m: 2,
          height: "48px",
          backgroundColor: "#0063B5",
          fontWeight: "500",
        }}
        fullWidth={true}
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginLeft;
