import React from 'react'
import Navbar from '@/utils/pre_auth/navbar'



interface MyComponentProps {}

  
const Landingpage = ()=> {
  return (
    <div style={{display:'flex'}}>
        <Navbar/>
        <div style={{width:'75%',height:'100vh',position:'absolute',right:'0px',backgroundColor:'red'}}>

        </div>
    </div>
  )
}

export default Landingpage