import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import GroupsList from '../layouts/GroupsList'
import FriendsList from '../layouts/FriendsList'
import Profile from '../assets/profile3.png'
import Image from '../assets/registration.png'
import { BsThreeDotsVertical, BsTriangleFill } from 'react-icons/bs';
import { CiCamera } from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import { RiSendPlaneFill } from "react-icons/ri";
import { getDatabase, ref, onValue, set, push, } from "firebase/database";

import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from 'react-icons/io5';
import { activeChat } from '../slices/activeSlice';

const Message = () => {
    const db = getDatabase();
    let data2 = useSelector((state) => state.activechat.value)

    let data = useSelector((state) => (state.userinfo.value))
    let [friend, setFriend] = useState([])
    let [input, setInput] = useState('')

    let dispatch = useDispatch()

    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (data.uid == item.val().receiverid || data.uid == item.val().senderid) {
                    arr.push({ ...item.val(), key: item.key });
                }

            })
            setFriend(arr)

        });

    }, [])

    let handleMessage = (item) => {

        if (data.uid == item.senderid) {
            dispatch(activeChat({
                status:"single",
                id: item.receiverid,
                name: item.receivername

            }))


        } else {
            dispatch(activeChat({
                status:"single",
                id: item.senderid,
                name: item.sendername

            }))



        }

    }


    let handleSend = () => {
       if(data2.status=="single"){
         set(push(ref(db, 'singlemessage/')), {
            message:input

        }).then(()=>{
            setInput("")
        });
       }else{

       }

    }
    return (
        <Grid container spacing={3}>
            <Grid size={4}>
                <GroupsList />

                <div className={`userlist-box extra-margin`}>
                    <div className='userlist-input-box'>
                        <IoSearch className='search' />
                        <input type="text" placeholder='Search' />
                        <BsThreeDotsVertical className='threedot' />
                    </div>
                    <div className='userlist-profile-box'>
                        <div className='title-box'>
                            <h4>Friends</h4>
                            <BsThreeDotsVertical className='threedot' />
                        </div>
                        {
                            friend.map(item => (

                                <div className='title-profile'>
                                    <div className='title-pere'>
                                        <div className='image-box'><img src="https://firebasestorage.googleapis.com/v0/b/chatme-292ec.firebasestorage.app/o/avater.webp?alt=media&token=7dcec873-c670-4239-9326-c6a84fc24054" alt="" /></div>
                                        <div>
                                            <h4>{data.uid == item.receiverid ? item.sendername : item.receivername}</h4>
                                            <p>sdfsdf</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleMessage(item)} >Message</button>
                                </div>
                            ))
                        }




                    </div>
                </div>
            </Grid>
            <Grid size={8}>

                <div className='sigle-box'>
                    <div className='chat-box'>
                        <div className='profile-box'>
                            <div className='profile-image'>
                                <img src={Profile} alt="" />

                            </div>
                            <div className='profile-name'>
                                <h4>{data2.name}</h4>
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
                            <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" />
                            <MdOutlineEmojiEmotions className='emoji' />
                            <CiCamera className='camera' />
                        </div>
                        <div onClick={handleSend} className='button'>
                            <RiSendPlaneFill className='send-icon' />
                        </div>
                    </div>



                    {/* Dynamic design */}

                </div>
            </Grid>
        </Grid>
    )
}

export default Message