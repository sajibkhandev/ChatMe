import React from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';

const BlockedUsersList = () => {
  return (
    <div className='userlist-box friendrequstlist-box'>
       <div className='userlist-input-box'>
            <IoSearch className='search' />
            <input  type="text" placeholder='Search' />
           <BsThreeDotsVertical  className='threedot'/>
       </div>
       <div className='userlist-profile-box'>
            <div className='title-box'>
                <h4>Blocked Users</h4>
                <BsThreeDotsVertical  className='threedot'/>
            </div>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            


       </div>
    </div>
  )
}

export default BlockedUsersList