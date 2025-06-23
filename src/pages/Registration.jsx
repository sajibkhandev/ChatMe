import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import RegistrationImage from '../assets/registration.png'

const MyInput = styled(TextField)({
    '& label.Mui-focused': {
    color: '#11175D',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#11175D',
    },
  },
  width:"60%",
  marginBottom:"33px"
  
   

});
const MyButton = styled(Button)({
  width: '60%',
  background:"#5F35F5",
  padding:"19px 0px",
  borderRadius:"86px"
  
});


const Registration = () => {
  return (
    <Grid container >
        <Grid size={6}>
           <div className='reg-content-box'>
            <div className='reg-content'>
               <h2>Get started with easily register</h2>
               <p>Free register and you can enjoy it</p>
                <MyInput className='sajibkhan' id="outlined-basic" label="Email Address" variant="outlined" />
                <MyInput id="outlined-basic" label="Ful name" variant="outlined" />
                <MyInput id="outlined-basic" label="Password" variant="outlined" />
                <MyButton variant="contained">Sign up</MyButton>
                <p>Already  have an account ? <span>Sign In</span></p>
           </div>
           </div>
        </Grid>
        <Grid size={6}>
           <img className='reg-image' src={RegistrationImage} alt="" />
        </Grid>
       
      </Grid>
  )
}

export default Registration