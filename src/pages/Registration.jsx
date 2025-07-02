import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import RegistrationImage from '../assets/registration.png'
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Audio, Bars } from 'react-loader-spinner';

const MyInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175D',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#11175D',
    },
  },
  width: "60%",
  marginTop: "33px"




});
const MyButton = styled(Button)({
  width: '60%',
  background: "#5F35F5",
  padding: "19px 0px",
  borderRadius: "86px",
  marginTop: "33px",
  display: "inline-block"

});


const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let [showpass, setShowPass] = useState(false)
  let [loader, setLoader] = useState(false)

  let [email, setEmail] = useState("")
  let [name, setName] = useState("")
  let [password, setPassword] = useState("")

  let [emailerror, setEmailError] = useState("")
  let [nameerror, setNameError] = useState("")
  let [passworderror, setPasswordError] = useState("")

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("")

  }
  let handleName = (e) => {
    setName(e.target.value);
    setNameError("")

  }
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("")

  }


  let handleSignUp = () => {
    if (!email) {
      setEmailError("Email is Required")

    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Enter a valid Email");

      }
    }

    if (!name) {
      setNameError("Name is Required")

    } if (!password) {
      setPasswordError("Password is Required")
    }

    if (email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && name && password) {
      setLoader(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // console.log(user.user);
              setEmail("")
              setName("")
              setPassword("")
              toast.success("Registration Successful")
              setLoader(false)
              setTimeout(() => {
                navigate('/login')
              }, 2000)


            });

        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);

        });

    }



  }

  return (
    <Grid container >
      <Grid size={6}>
        <div className='reg-content-box'>
          <div className='reg-content'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"

            />
            <MyInput value={email} onChange={handleEmail} className='sajibkhan' id="outlined-basic" label="Email Address" variant="outlined" />
            {
              emailerror && <p className='error-message'>{emailerror}</p>
            }
            <MyInput value={name} onChange={handleName} id="outlined-basic" label="Full name" variant="outlined" />
            {
              nameerror && <p className='error-message'>{nameerror}</p>
            }
            <div className='password-input'>
              <MyInput value={password} onChange={handlePassword} type={showpass ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" />
              {
                passworderror && <p className='error-message'>{passworderror}</p>
              }
              <div onClick={() => setShowPass(!showpass)} className='icon-box'>
                {
                  showpass
                    ?
                    <FiEye />
                    :
                    <FiEyeOff />
                }
              </div>

            </div>
            {
              loader
                ?

                <div>
                  <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />

                </div>

                :
                <MyButton onClick={handleSignUp} variant="contained">Sign up</MyButton>
            }
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