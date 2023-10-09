import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import BathroomProduct from './BathroomProduct'
import SideBarHeader from '../SideBarHeader'
import { BathroomProductData } from './data'
import SearchBar from './SearchBar'

const fontStyle = {
    fontSize: "18px",
    fontWeight: 300,
  };

const BathroomProducts = ({handleDrawerClose}) => {
  return (
    <Box>
        <SideBarHeader heading="Bathroom Products"  handleDrawerClose={handleDrawerClose} />
        <Typography sx={[fontStyle, { my: 2, mx: 2 }]}>
            Add Bathroom Products
        </Typography>
        <Box p={4}><SearchBar/></Box>
        {/* <RoomItem /> */}
        <Box
            sx={{
            display: "flex ",
            flexWrap: "wrap",
            flexDirection: "row",
            mx:2,
            gap: 2,
            justifyContent: "center",
            }}
        >
            {BathroomProductData?.map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx} sx={{ padding: '0 8px' }}>
                    <BathroomProduct srcImg={item.srcImg} title={item.title}/>
                </Grid>
            ))}
        </Box>
  </Box>
  )
}

export default BathroomProducts