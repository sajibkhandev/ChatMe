import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue,set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const GroupsList = () => {
  const db = getDatabase();
  let [allgrouplist,setAllgroupList]=useState([])
  let data = useSelector((state) => (state.userinfo.value))


   useEffect(()=>{
    const groupRef = ref(db, 'mygroup/');
      onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item => {
          if(item.val().adminid!=data.uid){
            arr.push({...item.val()})
  
          }
          
        })
        setAllgroupList(arr)
      });
  
  
   })
  
  return (
   <div className='userlist-box'>
       <div className='userlist-input-box'>
            <IoSearch className='search' />
            <input  type="text" placeholder='Search' />
           <BsThreeDotsVertical  className='threedot'/>
       </div>
       <div className='userlist-profile-box'>
            <div className='title-box'>
                <h4>Groups List</h4>
                <BsThreeDotsVertical  className='threedot'/>
            </div>

            {
              allgrouplist.map(item=>(
                <div className='title-profile'>
                                <div className='title-pere'>
                                    <div className='image-box'><img src="https://firebasestorage.googleapis.com/v0/b/chatme-292ec.firebasestorage.app/o/avater.webp?alt=media&token=7dcec873-c670-4239-9326-c6a84fc24054" alt="" /></div>
                                    <div>
                                            <h4>{item.groupname}</h4>
                                            <p>{item.grouptag}</p>
                                   </div>
                                </div>
                                <button>Join Request</button>
                            </div>

                
              ))
            }
            
            


       </div>
    </div>
  )
}

export default GroupsList