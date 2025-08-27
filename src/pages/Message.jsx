import React from 'react'
import Grid from '@mui/material/Grid';
import GroupsList from '../layouts/GroupsList'
import FriendsList from '../layouts/FriendsList'

const Message = () => {
  return (
    <Grid container spacing={3}>
             <Grid size={4}>
                <GroupsList />
                <FriendsList designchange="margintop"/>
            </Grid>
             <Grid size={8}>
                Messages
            </Grid>
        </Grid>
  )
}

export default Message