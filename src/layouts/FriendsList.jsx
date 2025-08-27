import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const FriendsList = ({designchange}) => {
  const db = getDatabase();
  let [friend,setFriend]=useState([])
  let data = useSelector((state) => (state.userinfo.value))

    useEffect(() => {
      const friendRef = ref(db, 'friend/');
      onValue(friendRef, (snapshot) => {
        let arr=[]
        snapshot.forEach(item=>{
          if(data.uid==item.val().receiverid || data.uid==item.val().senderid){
            arr.push({...item.val(),key:item.key});
          }
          
        })
        setFriend(arr)
       
      });
  
    }, [])


    let handleBlock=(item)=>{
      console.log(item);


      if(data.uid==item.senderid){
        set(push(ref(db, 'block/')), {

        block:item.receivername,
        blockid:item.receiverid,
        blockby:item.sendername,
        blockbyid:item.senderid
        }).then(()=>{
          remove(ref(db, 'friend/' +item.key))
        })
      }else{
         set(push(ref(db, 'block/')), {
        block:item.sendername,
        blockid:item.senderid,
        blockby:item.receivername,
        blockbyid:item.receiverid
    
        }).then(()=>{
          remove(ref(db, 'friend/' +item.key))
        })

      }
      
      
      
    }


  return (
     <div className={`userlist-box ${designchange}`}>
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
                                      <h4>{data.uid==item.receiverid ? item.sendername :item.receivername}</h4>
                                      <p>sdfsdf</p>
                                 </div>
                              </div>
                              <button onClick={()=>handleBlock(item)}>Block</button>
                          </div>
            ))
           }
           
            


       </div>
    </div>
  )
}

export default FriendsList