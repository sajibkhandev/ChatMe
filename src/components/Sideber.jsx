
import React, { useEffect, useState } from 'react'
import Profile from '../assets/profile.png'
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';




const Sideber = () => {
    let [activevalue, setActiveValue] = useState("")

    let locotion = useLocation()


    const auth = getAuth();
    let nevigate = useNavigate()
    let hanldeLogout = () => {
        signOut(auth).then(() => {
            nevigate('/login')


        }).catch((error) => {
            toast.error("Some Error here")

        });

    }
    useEffect(() => {
        setActiveValue(locotion.pathname.replace("/pages/", ""))
    }, )
   
    return (
        <div className='sideber-layout'>
            <div className='profile-layout'>
                <img src={Profile} alt="Profile Image" />
            </div>
            <div className='page-layout'>
                <Link to='/pages/home' className={activevalue=="home" && "active"}><IoHomeOutline className='page-icon' /></Link>
                <Link to='/pages/message' className={activevalue=="message" && "active"}><LuMessageCircleMore className='page-icon' /></Link>
                <Link to='/pages/notification' className={activevalue=="notification" && "active"}><IoMdNotificationsOutline className='page-icon' /></Link>
                <Link to='/pages/setting' className={activevalue=="setting" && "active"}><CiSettings className='page-icon' /></Link>


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

        </div>
    )
}

export default Sideber