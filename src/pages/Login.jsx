import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import LoginImage from '../assets/login.png'
import GoogleLogo from '../assets/googlelogo.png'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { userdetails } from '../slices/userInfoSlice';

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

const Login = () => {
  const auth = getAuth();
  let navigate = useNavigate()

  let dispatch=useDispatch()
  
  const provider = new GoogleAuthProvider();
  let [showpass, setShowPass] = useState(false)
  let [loader, setLoader] = useState(false)

  let [forgetui, setForgetUI] = useState(false)

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [forgetemail, setforgetEmail] = useState("")

  let [emailerror, setEmailError] = useState("")
  let [passworderror, setPasswordError] = useState("")
  let [forgetemailerror, setforgetEmailError] = useState("")




  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("")

  }

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("")

  }
  let handleForgetEmail = (e) => {
    setforgetEmail(e.target.value);
    setforgetEmailError("")

  }

  let handleLogin = () => {
    if (!email) {
      setEmailError("Email is Required")

    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError("Enter a valid Email");

      }
    }

    if (!password) {
      setPasswordError("Password is Required")
    }

    if (email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && password) {

      setLoader(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          if (user.user.emailVerified) {
            // console.log(user.user);
            dispatch(userdetails(user.user))
            localStorage.setItem("userinfo",JSON.stringify(user.user))
            

            
            toast.success("login done");
            navigate("/home")
            setLoader(false)
            setLoader(false)
          } else {
            toast.error("Verify Your Email")
            setLoader(false)
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Give a Right Email and Password");
            setLoader(false)

          }else if(errorCode.includes("auth/too-many-requests")){
            toast.error("Try 30 secode Later");
            setLoader(false)

          }
        });

    }


  }

  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/home")


      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);


      });


  }

  let handleForgetPassword = () => {
    setForgetUI(true)

  }
  let handleBackToLogin = () => {
    setForgetUI(false)

  }

  let handleSand = () => {
    if (!forgetemail) {
      setforgetEmailError("give a emaill")

    } else {
      sendPasswordResetEmail(auth, forgetemail)
        .then(() => {
         toast.success("Check Your Email for Password");
         setTimeout(()=>{
          setForgetUI(false)

         },2000)
         
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if(errorCode.includes("auth/too-many-requests")){
           toast.error("Try Later");

          }
          
        });

    }
  }



  return (
    <>
      {
        forgetui
          ? <div className='new-ui-for-forgetpassword'>
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
            <div className='forgetpassword-box'>
              <MyInput onChange={handleForgetEmail} value={forgetemail} className='sajibkhan' id="outlined-basic" label="Email Address" variant="outlined" />
              {
                forgetemailerror && <p className='error-message'>{forgetemailerror}</p>
              }
              <div className='button-box'>
                <MyButton onClick={handleBackToLogin} variant="contained">Back to Login</MyButton>
                <MyButton onClick={handleSand} variant="contained">Sand</MyButton>
              </div>
            </div>
          </div>



          :
          <Grid container >
            <Grid size={6}>
              <div className='reg-content-box'>
                <div className='reg-content'>
                  <h2>Login to your account!</h2>
                  <div onClick={handleGoogle} className='logo-box'>
                    <img src={GoogleLogo} alt="" />
                    <p>Login with Google</p>
                  </div>
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
                  <MyInput onChange={handleEmail} value={email} className='sajibkhan' id="outlined-basic" label="Email Address" variant="outlined" />
                  {
                    emailerror && <p className='error-message'>{emailerror}</p>
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
                      ? <Bars
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                      :
                      <MyButton onClick={handleLogin} variant="contained">Login to Continue</MyButton>

                  }
                  <p>Don’t have an account ?<Link to='/'><span>Sign up</span></Link></p>

                  <h3 onClick={handleForgetPassword} className='forget-password'>Forget Password</h3>
                </div>
              </div>

            </Grid>
            <Grid size={6}>
              <img className='reg-image' src={LoginImage} alt="" />
            </Grid>

          </Grid>
      }
    </>

  )
}

export default Login