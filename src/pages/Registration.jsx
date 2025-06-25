import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import RegistrationImage from '../assets/registration.png'
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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
  marginTop:"33px"

  
   

});
const MyButton = styled(Button)({
  width: '60%',
  background:"#5F35F5",
  padding:"19px 0px",
  borderRadius:"86px",
  marginTop:"33px",
  display:"inline-block"
  
});


const Registration = () => {
  let [showpass,setShowPass]=useState(false)

  let [email,setEmail]=useState("")
  let [name,setName]=useState("")
  let [password,setPassword]=useState("")

  let [emailerror,setEmailError]=useState("")
  let [nameerror,setNameError]=useState("")
  let [passworderror,setPasswordError]=useState("")

  let handleEmail=(e)=>{
    setEmail(e.target.value);
    setEmailError("")
    
  }
  let handleName=(e)=>{
    setName(e.target.value);
    setNameError("")
    
  }
  let handlePassword=(e)=>{
    setPassword(e.target.value);
     setPasswordError("")
    
  }


  let handleSignUp=()=>{
   if(!email){
    setEmailError("Email is Required")
    
   }else{
     if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setEmailError("Enter a valid Email");
      
     }
   }
   
   if(!name){
    setNameError("Name is Required")
    
   }if(!password){
    setPasswordError("Password is Required")
   }else if(!/(?=.*[a-z])/.test(password)){
    setPasswordError("Must be Lower Case")
   }
   else if(!/(?=.*[A-Z])/.test(password)){
     setPasswordError("Must be Upper Case")
   }
   else if(!/(?=.*\d)/.test(password)){
     setPasswordError("Must be One Number")
   }
   else if(!/(?=.*[@$!%*?&])/.test(password)){
     setPasswordError("special character")
   }
   else if(!/([A-Za-z\d@$!%*?&]{8,}$)/.test(password)){
     setPasswordError("Must be 8,16")
   }

   else{
    console.log("all done");
    
   }
    
    
  }
 
  return (
    <Grid container >
        <Grid size={6}>
           <div className='reg-content-box'>
            <div className='reg-content'>
               <h2>Get started with easily register</h2>
               <p>Free register and you can enjoy it</p>
                <MyInput onChange={handleEmail} className='sajibkhan' id="outlined-basic" label="Email Address" variant="outlined" />
                {
                emailerror && <p className='error-message'>{emailerror}</p>
                 }
                <MyInput onChange={handleName} id="outlined-basic" label="Full name" variant="outlined" />
                {
                nameerror && <p className='error-message'>{nameerror}</p>
                }
                <div className='password-input'>
                  <MyInput onChange={handlePassword} type={showpass?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
                  {
                   passworderror && <p className='error-message'>{passworderror}</p>
                  }
                  <div onClick={()=>setShowPass(!showpass)} className='icon-box'>
                    {
                      showpass 
                      ?
                      <FiEye />
                      :
                     <FiEyeOff />
                    }
                  </div>
                  
                </div>
                <MyButton onClick={handleSignUp} variant="contained">Sign up</MyButton>
                <p>Already  have an account ? <Link to='/login'><span>Sign In</span></Link></p>
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