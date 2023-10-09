import { InputAdornment, TextField } from "@mui/material";
import React from "react";

function RDInput({ titleStart, titleEnd, value, setValue }) {
  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      id="outlined-start-adornment"
      sx={{ mx: 2, backgroundColor: "#FFF", my: 1 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{titleStart}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">{titleEnd}</InputAdornment>
        ),
        inputProps: {
          style: { textAlign: "right" },
        },
      }}
    />
  );
}

export default RDInput;
