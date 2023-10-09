import {
  Box,
  Button,
  Checkbox,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import BathRoom from "../assets/bathroom.jpg";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Register() {
  return (
    <Grid container sx={{ background: "#FFF", width: "100%", height: "100vh" }}>
      <Grid item xs={12} md={6} height="100%">
        <img src={BathRoom} height="100%" width="100%" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ mx: 6, my: 2 }}>
          <Typography
            sx={{ fontSize: "36px", color: "#00497a", fontWeight: "500" }}
          >
            Register
          </Typography>

          <Stack flexDirection="row" justifyContent="space-between" mt={2}>
            <TextField
              id="fname"
              label="First Name"
              variant="outlined"
              fullWidth={true}
              sx={{ width: "48%" }}
            />
            <TextField
              id="lname"
              label="Last Name"
              variant="outlined"
              fullWidth={true}
              sx={{ width: "48%" }}
            />
          </Stack>

          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            fullWidth={true}
            sx={{ mt: 2 }}
          />

          <TextField
            id="postcode"
            label="Suburb / Postcode"
            variant="outlined"
            fullWidth={true}
            sx={{ mt: 2 }}
          />

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            sx={{ mt: 2 }}
          />

          <TextField
            id="rpassword"
            label="Re-enter Password"
            variant="outlined"
            fullWidth={true}
            sx={{ mt: 2 }}
          />

          <Stack flexDirection="row" alignItems="center" mt={2}>
            <Checkbox {...label} sx={{ m: 0 }} />
            <Typography
              sx={{
                color: "#222222",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: 1.2,
                ml: 1,
              }}
            >
              I'd like to sign up to receive news, tips, product information,
              updates and other communications from the Reece Group. I have read
              the Privacy Policy.
            </Typography>
          </Stack>

          <Typography
            sx={{ color: "#333", lineHeight: 1.4, fontSize: "14px", mt: 2 }}
          >
            By proceeding, you agree to our
            <Link href="#" sx={{ ml: 0.6, mr: 0.6, fontWeight: "500", color: "#000", textDecoration: "none" }}>
              Terms & Conditions
            </Link>
            and
            <Link href="#" sx={{ ml: 0.6, mr: 0.6, fontWeight: "500", color: "#000", textDecoration: "none" }}>
              {" "}
              Privacy Policy.
            </Link>

          </Typography>

          <Button variant="contained" sx={{width: "240px", mt: 2, borderRadius: 0, backgroundColor: "#6bccb8"}}>Register</Button>
         
         
          <Typography
            sx={{ color: "#333", lineHeight: 1.4, fontSize: "14px", mt: 2 }}
          >
            Already have an account?
            <Link href="#" sx={{ ml: 0.6, fontWeight: "500", color: "#000", textDecoration: "none" }}>
              {" "}
              Login Here
            </Link>

          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
