import React from 'react'
import Grid from '@mui/material/Grid';
import GroupsList from '../layouts/GroupsList'
import FriendsList from '../layouts/FriendsList'
import Profile from '../assets/profile3.png'
import { BsThreeDotsVertical } from 'react-icons/bs';

const Message = () => {
  return (
    <Grid container spacing={3}>
             <Grid size={4}>
                <GroupsList />
                <FriendsList designchange="margintop"/>
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
                            <h6>Hey There ! . </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                         <div className='sender-design'>
                            <h6>Hey There ! . </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                         <div className='sender-design'>
                            <h6>Hey There ! . </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                         <div className='sender-design'>
                            <h6>Hey There ! . </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                         <div className='sender-design'>
                            <h6>Hey There ! . </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        
                        <div className='receiver-design '>
                            <h6>Hey There ! </h6>
                            <p>Today, 2:01pm</p>
                        </div>
                        </div>
                        
                    
                       
                        {/* Dynamic design */}
                
                 </div>
            </Grid>
        </Grid>
  )
}

export default Message