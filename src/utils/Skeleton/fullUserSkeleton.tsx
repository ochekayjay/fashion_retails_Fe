import React from 'react'
import { Skeleton } from '@mantine/core'

function FullUserSkeleton() {
  return (
    <div style={{width:'100vw',minHeight:'100vh',position:'fixed',top:'0px',left:'0px',right:'0px',bottom:'0px',zIndex:'3000000000',backgroundColor:'white'}}>
        
        <div style={{width:'45%',height:'20%',display:'flex',flexDirection:'column',margin:'5px auto',marginTop:'15px',justifyContent:'space-between'}}>
            <Skeleton height={45} mt={6} radius={8} />
            <Skeleton height={45} mt={6} radius={8} />
        </div>

        <div style={{width:'90%',height:'30%',display:'flex',flexDirection:'column',margin:'10px auto',justifyContent:'space-between'}}>
            <Skeleton height='100%' mt={15} radius={10} />
        </div>

        <div style={{width:'90%',height:'40%',display:'flex',margin:'10px auto'}}>
            <Skeleton height="100%"  width="100%" radius={10} />
            
        </div>

        <div style={{width:'90%',height:'10%',display:'flex',alignItems:"center",margin:'auto',justifyContent:'space-between'}}>
            <Skeleton height='100%' width='45%' mt={15} radius={10} />
            <Skeleton height='100%' width='45%' mt={15} radius={10} />
        </div>

     
    </div>
  )
}

export default FullUserSkeleton