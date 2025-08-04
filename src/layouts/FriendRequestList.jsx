import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequestList = () => {
  const db = getDatabase();
  let [friendrequest,setFriendrequest]=useState([])
  let data = useSelector((state) => (state.userinfo.value))

  useEffect(() => {
    const frendrequestRef = ref(db, 'frendrequest/');
    onValue(frendrequestRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        if(item.val().receiverid==data.uid){

          arr.push({...item.val()});
        }
        
      })
      setFriendrequest(arr)
     
    });

  }, [])
 
  
  return (
    <div className='userlist-box friendrequstlist-box'>
      <div className='userlist-input-box'>
        <IoSearch className='search' />
        <input type="text" placeholder='Search' />
        <BsThreeDotsVertical className='threedot' />
      </div>
      <div className='userlist-profile-box'>
        <div className='title-box'>
          <h4>Friend  Request</h4>
          <BsThreeDotsVertical className='threedot' />
        </div>

        {
          friendrequest.map(item=>(
             <div className='title-profile'>
                            <div className='title-pere'>
                                <div className='image-box'><img src="https://firebasestorage.googleapis.com/v0/b/chatme-292ec.firebasestorage.app/o/avater.webp?alt=media&token=7dcec873-c670-4239-9326-c6a84fc24054" alt="" /></div>
                                <div>
                                        <h4>{item.sendername}</h4>
                                        <p>sdfsdfsd</p>
                               </div>
                            </div>
                            <button>Acpect</button>
                            <button>delete</button>
                        </div>

          ))
        }
       



      </div>
    </div>
  )
}

export default FriendRequestList