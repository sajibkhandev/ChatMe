import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let nevigate=useNavigate()
  let data=useSelector((state)=>state.userinfo.value)
 

  useEffect(()=>{
    if(!data){
      nevigate('/login')

    }
  },[])
  
  return (
    <div>
      <h1>home</h1>
      
    </div>
  )
}

export default Home