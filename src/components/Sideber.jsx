
import React, { createRef, useEffect, useRef, useState } from 'react'
import Profile from '../assets/profile.png'
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import { FaCloudUploadAlt } from "react-icons/fa";

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { userdetails } from '../slices/userInfoSlice';





const MyButton = styled(Button)({
    width: '40%',
    background: "#5F35F5",
    padding: "12px 0px",
    borderRadius: "86px",
    marginTop: "33px",
    display: "inline-block"

});




const Sideber = () => {
    let [visiblepopup, setVisiblePopup] = useState(false)
    let sajibRef = useRef(null)

    let [activevalue, setActiveValue] = useState("")
    let locotion = useLocation()


    const auth = getAuth();
    let nevigate = useNavigate()

    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    const storage = getStorage();

    const data=useSelector((state)=>state.userinfo.value)
    const dispatch=useDispatch()
    // console.log(data.photoURL);

    let hanldeLogout = () => {
        signOut(auth).then(() => {
            nevigate('/login')
            localStorage.removeItem("userinfo")


        }).catch((error) => {
            toast.error("Some Error here")

        });

    }
    let handleUpdateProfile = () => {
        setVisiblePopup(true)

    }
    let handleBack = () => {
        setVisiblePopup(false)

    }
    let handlePopupImage = (e) => {
        // console.log(!sajibRef.current.contains(e.target))
        if (!sajibRef.current.contains(e.target)) {
            setVisiblePopup(false)
        }
    }
    useEffect(() => {
        setActiveValue(locotion.pathname.replace("/pages/", ""))
    },)

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

            const storageRef = ref(storage, auth.currentUser.uid);

            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
             uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
                });

                getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                 updateProfile(auth.currentUser, {
                    photoURL:downloadURL 
                    }).then(()=>{
                        dispatch(userdetails({...data,photoURL:downloadURL}))
                        localStorage.setItem("userinfo",JSON.stringify({...data,photoURL:downloadURL}))

                        setImage("")
                        setVisiblePopup(false)
                        setCropData("")
                       
                    })


                });
               
                

        }
    };







    return (
        <div className='sideber-layout'>
            <div className='possition-h4'>
                <div onClick={handleUpdateProfile} className='profile-layout'>
                <img src={data.photoURL} alt="Profile Image" />
                <div className='overly'>
                    <FaCloudUploadAlt className='icon' />
                </div>
            </div>
            <h4>{data.displayName}</h4>
            </div>
            <div className='page-layout'>
                <Link to='/pages/home' className={activevalue == "home" && "active"}><IoHomeOutline className='page-icon' /></Link>
                <Link to='/pages/message' className={activevalue == "message" && "active"}><LuMessageCircleMore className='page-icon' /></Link>
                <Link to='/pages/notification' className={activevalue == "notification" && "active"}><IoMdNotificationsOutline className='page-icon' /></Link>
                <Link to='/pages/setting' className={activevalue == "setting" && "active"}><CiSettings className='page-icon' /></Link>


            </div>

            <div className='logout-layout'>
                <IoLogOutSharp onClick={hanldeLogout} className='page-icon logout-icon' />
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
            {
                visiblepopup &&
                <div onClick={handlePopupImage} className='popup-image'>
                    <div ref={sajibRef} className='popup-image-box'>
                        <h2 >Update Your Profile</h2>
                        <input type="file" onChange={onChange} />
                        <div className='preview-box'>
                            <div className="img-preview preview-round"></div>
                        </div>
                        {
                            image && <Cropper
                                ref={cropperRef}
                                style={{ height: 400, width: "100%" }}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                guides={true}
                            />
                        }

                        <div>
                            <MyButton onClick={handleBack} variant="contained">Back</MyButton>
                            <MyButton onClick={getCropData} variant="contained">Update</MyButton>
                        </div>
                    </div>

                </div>
            }


        </div>
    )
}

export default Sideber