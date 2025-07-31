import React, { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue } from "firebase/database";



const UserList = () => {
  const db = getDatabase();
  let [userlist,setUserList]=useState([])



  useEffect(() => {

    const userlistRef = ref(db, 'userlist/' );
    onValue(userlistRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        // console.log(item.val());
        arr.push({...item.val()})
      })
      setUserList(arr)
    });

  }, [])
  console.log(userlist);
  


  return (
    <div className='userlist-box'>
      <div className='userlist-input-box'>
        <IoSearch className='search' />
        <input type="text" placeholder='Search' />
        <BsThreeDotsVertical className='threedot' />
      </div>
      <div className='userlist-profile-box'>
        <div className='title-box'>
          <h4>User List</h4>
          <BsThreeDotsVertical className='threedot' />
        </div>
        {
          userlist.map(item=>(

             <SingleUser name={item.username} email={item.email}/> 
          ))

        }
       



      </div>
    </div>
  )
}

export default UserList