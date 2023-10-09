import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    const textFieldStyle = {
        background: 'transparent', // Set the background to transparent
        boxShadow: 'none', // Remove the elevation (box shadow)
      };
  return (
    <Paper
        elevation={3}
      sx={{
        width: '100%', // Adjust the width as needed
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '25px', // Adjust the border radius for the tube shape
        padding: 1, // Adjust the padding
      }}
    >
      <InputAdornment position="start">
        <SearchIcon
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        />
      </InputAdornment>
      <TextField
        fullWidth
        placeholder="Search..."
        variant="standard" // Use variant="standard" to remove the outline
        InputProps={{
            style: textFieldStyle,
            disableUnderline: true, // Remove the underline
        }}
        sx={{
          flex: 1,
          marginLeft: 1, // Adjust the margin
        }}
      />
    </Paper>
  );
}

export default SearchBar;
