import React from 'react'
import Grid from '@mui/material/Grid';
import GroupsList from '../layouts/GroupsList'
import FriendsList from '../layouts/FriendsList'
import Profile from '../assets/profile3.png'
import Image from '../assets/registration.png'
import { BsThreeDotsVertical, BsTriangleFill } from 'react-icons/bs';
import { CiCamera } from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import { RiSendPlaneFill } from "react-icons/ri";

import ModalImage from "react-modal-image";

const Message = () => {
    let handleSend=()=>{
        console.log("send messsage");
        
    }
    return (
        <Grid container spacing={3}>
            <Grid size={4}>
                <GroupsList />
                <FriendsList designchange="margintop" />
            </Grid>
            <Grid size={8}>

                <div className='sigle-box'>
                    <div className='chat-box'>
                        <div className='profile-box'>
                            <div className='profile-image'>
                                <img src={Profile} alt="" />

                            </div>
                            <div className='profile-name'>
                                <h4>Swathi </h4>
                                <p>Online</p>
                            </div>
                        </div>
                        <div className='profile-design'>
                            <BsThreeDotsVertical className='threedot' />
                        </div>

                    </div>
                    {/* Dynamic design */}

                    <div className='box'>
                        <div className='sender-design'>
                            <div className="message-box">
                                <h6>Hey There ! <BsTriangleFill className='sender-icon' /></h6>
                                <p>Today, 2:01pm</p>
                            </div>
                        </div>

                        <div className='receiver-design'>
                            <div className="message-box">
                                <h6>Hey There   <BsTriangleFill className='receiver-icon' /></h6>
                                <p>Today, 2:01pm</p>
                            </div>
                        </div>

                        <div className='sender-design'>
                            <div className="message-box">
                                <ModalImage small={Image} large={Image} alt="Hello World!"
                                />
                               
                            </div>
                        </div>
                        <div className='receiver-design'>
                            <div className="message-box">
                                  <ModalImage small={Image} large={Image} alt="Hello World!"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='send-messages-box'>
                       <div className='input-box'>
                          <input type="text" />
                          <MdOutlineEmojiEmotions className='emoji'/>
                          <CiCamera  className='camera'/>
                       </div>
                        <div onClick={handleSend} className='button'>
                            <RiSendPlaneFill className='send-icon'/>
                        </div>
                    </div>



                    {/* Dynamic design */}

                </div>
            </Grid>
        </Grid>
    )
}

export default Message