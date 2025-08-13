import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUsersList = () => {
   const db = getDatabase();
  let [block,setBlock]=useState([])
  let data = useSelector((state) => (state.userinfo.value))

  useEffect(() => {
      const blockRef = ref(db, 'block/');
      onValue(blockRef, (snapshot) => {
        let arr=[]
        snapshot.forEach(item=>{
          
         if(data.uid==item.val().blockbyid){
          arr.push({
            id:item.key,
            block:item.val().block,
            blockid:item.val().blockid

          })

         }else if(data.uid==item.val().blockid){
          arr.push({
            id:item.key,
            blockby:item.val().blockby,
            blockbyid:item.val().blockbyid

          })

         }
          
        })
        setBlock(arr)
       
      });
  
    }, [])

  let handleUnblock=(item)=>{
    // console.log(item);
    set(push(ref(db, 'friend/')), {

      receiverid:data.uid,
      receivername:data.displayName,
      senderid:item.blockid,
      sendername:item.block

    }).then(()=>{
      remove(ref(db, 'block/'+item.id))
    });
    
  }
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
            {
              block.map(item=>(

                <div className='title-profile'>
                                <div className='title-pere'>
                                    <div className='image-box'><img src="https://firebasestorage.googleapis.com/v0/b/chatme-292ec.firebasestorage.app/o/avater.webp?alt=media&token=7dcec873-c670-4239-9326-c6a84fc24054" alt="" /></div>
                                    <div>
                                            <h4>{item.block}</h4>
                                             <h4>{item.blockby}</h4>
                                            <p>lsdfsdfsd</p>
                                   </div>
                                </div>
                               {
                                !item.blockby &&  <button onClick={()=>handleUnblock(item)}>Unblock</button> 
                               }
                            </div>
              ))
            }
           
            


       </div>
    </div>
  )
}

export default BlockedUsersList