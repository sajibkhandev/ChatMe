import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const FriendsList = () => {
  const db = getDatabase();
  let [friend,setFriend]=useState([])
  let data = useSelector((state) => (state.userinfo.value))

    useEffect(() => {
      const friendRef = ref(db, 'friend/');
      onValue(friendRef, (snapshot) => {
        let arr=[]
        snapshot.forEach(item=>{
          arr.push(item.val());
          
          
        })
        setFriend(arr)
       
      });
  
    }, [])


  return (
     <div className='userlist-box'>
       <div className='userlist-input-box'>
            <IoSearch className='search' />
            <input  type="text" placeholder='Search' />
           <BsThreeDotsVertical  className='threedot'/>
       </div>
       <div className='userlist-profile-box'>
            <div className='title-box'>
                <h4>Friends</h4>
                <BsThreeDotsVertical  className='threedot'/>
            </div>
           {
            friend.map(item=>(
              
               <div className='title-profile'>
                              <div className='title-pere'>
                                  <div className='image-box'><img src="https://firebasestorage.googleapis.com/v0/b/chatme-292ec.firebasestorage.app/o/avater.webp?alt=media&token=7dcec873-c670-4239-9326-c6a84fc24054" alt="" /></div>
                                  <div>
                                          <h4>{item.sendername}</h4>
                                          <p>sdfsdf</p>
                                 </div>
                              </div>
                              <button>Block</button>
                          </div>
            ))
           }
           
            


       </div>
    </div>
  )
}

export default FriendsList