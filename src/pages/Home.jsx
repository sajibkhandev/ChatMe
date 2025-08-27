import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import UserList from '../layouts/UserList';
import GroupsList from '../layouts/GroupsList';
import FriendsList from '../layouts/FriendsList';
import FriendRequestList from '../layouts/FriendRequestList';
import MyGroupsList from '../layouts/MyGroupsList';
import BlockedUsersList from '../layouts/BlockedUsersList';

const Home = () => {
  let nevigate=useNavigate()
  let data=useSelector((state)=>state.userinfo.value)
 

  useEffect(()=>{
    if(!data){
      nevigate('/login')

    }
  },[])
  
  return (
    <div className='grid-division'>
      <Grid container spacing={3}>
             <Grid size={4}>
                <GroupsList/>
            </Grid>
            <Grid size={4}>
                <FriendsList />
            </Grid>  
            <Grid size={4}>
                <UserList/>
            </Grid>  
            <Grid size={4}>
                <FriendRequestList/>
            </Grid>  
            <Grid size={4}>
                <MyGroupsList/>
            </Grid>  
            <Grid size={4}>
                <BlockedUsersList/>
            </Grid>  
        </Grid>
      
    </div>
  )
}

export default Home