import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Sideber from '../components/Sideber';

const RootLayout = () => {
  return (
    <div>
        
        <div className='w-10/12 bg-red-500 h-[400px]'></div>

         <Grid container spacing={2}>
             <Grid size={2}>
                <Sideber/>
            </Grid>
            <Grid size={10}>
                <Outlet/>
            </Grid>  
        </Grid>
          
        
    </div>
  )
}

export default RootLayout