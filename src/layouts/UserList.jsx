import React, { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue,set, push } from "firebase/database";
import { useSelector } from 'react-redux';




const UserList = () => {
  const db = getDatabase();
  let [userlist, setUserList] = useState([])
  let [concatFriendRequest,setConcatFriendRequest]=useState([])
  let [concatFriend,setConcatFriend]=useState([])
  let data = useSelector((state) => (state.userinfo.value))

  useEffect(() => {

    const userlistRef = ref(db, 'userlist/');
    onValue(userlistRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (data.uid != item.key) {
          arr.push({ ...item.val(), id:item.key })
        }
      })
      setUserList(arr)
    });

  }, [])


let handleFriendRequest = (item) => {
    console.log(item);
    set(push(ref(db, 'frendrequest/')), {

      receiverid:item.id,
      receivername:item.username,
      senderid:data.uid,
      sendername:data.displayName

    });

  }


  

    useEffect(() => {
      const frendrequestRef = ref(db, 'frendrequest/');
      onValue(frendrequestRef, (snapshot) => {
        let arr=[]
        snapshot.forEach(item=>{
          arr.push(item.val().receiverid + item.val().senderid);
          
        })
        setConcatFriendRequest(arr)
       
      });
  
    }, [])


     useEffect(() => {
      const friendRef = ref(db, 'friend/');
      onValue(friendRef, (snapshot) => {
        let arr=[]
        snapshot.forEach(item=>{
          arr.push(item.val().receiverid+item.val().senderid);
          
          
          
          
        })
        setConcatFriend(arr)
       
      });
  
    }, [])

    
    


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
          userlist.map(item => (

            <div className='title-profile'>
              <div className='title-pere'>
                <div className='image-box'><img src={item.photo} alt="" /></div>
                <div>
                  <h4>{item.username}</h4>
                  <p>{item.email}</p>
                </div>
              </div>

              {
                concatFriend.includes(item.id+data.uid)||
                concatFriend.includes(data.uid+item.id)
                ?
                <button>Friend</button>
                :
                 concatFriendRequest.includes(item.id+data.uid) ||
                 concatFriendRequest.includes(data.uid+item.id) 
                ? 
                <button>panding</button>
               
                :
                <button onClick={() => handleFriendRequest(item)}>Add</button>

              }
              
              
            </div>
          ))

        }




      </div>
    </div>
  )
}

export default UserList