import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import LoginImage from '../assets/login.png'
import GoogleLogo from '../assets/googlelogo.png'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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




const Login = () => {
  const auth = getAuth();
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  
   

  let handleLogin=()=>{
      signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    console.log("done");
    
  })
  .catch((error) => {
    console.log(error);
    
  });
       
    
    
  }
  return (
    <Grid container >
        <Grid size={6}>
           <div className='reg-content-box'>
            <div className='reg-content'>
               <h2>Login to your account!</h2>
               <div className='logo-box'>
                 <img src={GoogleLogo} alt="" />
                 <p>Login with Google</p>
               </div>
                <MyInput onChange={(e)=>setEmail(e.target.value)} value={email} className='sajibkhan' id="outlined-basic" label="Email Address" variant="outlined" />
                <MyInput onChange={(e)=>setPassword(e.target.value)} value={password} type='password' id="outlined-basic" label="Password" variant="outlined" />
                <MyButton  onClick={handleLogin} variant="contained">Login to Continue</MyButton>
                <p>Don’t have an account ?<Link to='/'><span>Sign up</span></Link></p>
                 
           </div>
           </div>
           
        </Grid>
        <Grid size={6}>
           <img className='reg-image' src={LoginImage} alt="" />
        </Grid>
       
      </Grid>
    
  )
}

export default Login