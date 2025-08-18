import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import { getDatabase, ref, onValue,set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const MyButton = styled(Button)({
    width: '40%',
    background: "#5F35F5",
    padding: "12px 0px",
    borderRadius: "86px",
    marginTop: "33px",
    display: "inline-block"

});

const MyInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175D',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#11175D',
    },
  },
  width: "60%",
  marginTop: "33px"




});

const MyGroupsList = () => {
  const db = getDatabase();
  let [grouppopup,setGroupPopup]=useState(false)
  let [groupname,setGroupName]=useState('')
  let [grouptag,setGrouptTag]=useState('')
  let [allgrouplist,setAllgroupList]=useState([])

   let data = useSelector((state) => (state.userinfo.value))
  
 
 
 let handleCreate=()=>{
   set(push(ref(db, 'mygroup/')), {
  
       groupname:groupname,
       grouptag:grouptag,
       admin:data.displayName,
       adminid:data.uid
  
      }).then(()=>{
        setGroupPopup(false)
      });
  
 }

 useEffect(()=>{
  const groupRef = ref(db, 'mygroup/');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if(item.val().adminid==data.uid){
          arr.push({...item.val()})

        }
        
      })
      setAllgroupList(arr)
    });


 })
  return (
    <div className='userlist-box friendrequstlist-box'>
       <div className='userlist-input-box'>
            <IoSearch className='search' />
            <input  type="text" placeholder='Search' />
           <BsThreeDotsVertical  className='threedot'/>
       </div>
       <div className='userlist-profile-box'>
            <div className='title-box'>
                <h4>My Groups</h4>
                <button onClick={()=>setGroupPopup(true)} className='create-group'>Create Group</button>


               {
                grouppopup &&  
                <div  className='popup-image'>
                    <div  className='popup-image-box'>
                        <h2 >Create Group</h2>
                        <MyInput onChange={(e)=>setGroupName(e.target.value)} className='sajibkhan' id="outlined-basic" label="Group Name" variant="outlined" />
                        <MyInput onChange={(e)=>setGrouptTag(e.target.value)} className='sajibkhan' id="outlined-basic" label="Group Tag" variant="outlined" />

                        <div>
                            <MyButton onClick={()=>setGroupPopup(false)} variant="contained">Back to Home</MyButton>
                            <MyButton onClick={handleCreate} variant="contained">Create</MyButton>
                        </div>
                    </div>

                </div>
               }


            </div>

            {
              allgrouplist.map(item=>(
                <div className='title-profile'>
                                <div className='title-pere'>
                                    <div className='image-box'><img src='https://firebasestorage.googleapis.com/v0/b/chatme-292ec.firebasestorage.app/o/avater.webp?alt=media&token=7dcec873-c670-4239-9326-c6a84fc24054' alt="" /></div>
                                    <div>   
                                            <h4>{item.groupname}</h4>
                                            <p>{item.grouptag}</p>
                                   </div>
                                </div>
                                <button>Add</button>
                            </div>
                
              ))

            }
          
           
            


       </div>
    </div>
  )
}

export default MyGroupsList