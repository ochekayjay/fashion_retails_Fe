import React from 'react'
import { Skeleton } from '@mantine/core'

function FullUserSkeleton() {
  return (
    <div style={{width:'100vw',minHeight:'100vh',position:'fixed',top:'0px',left:'0px',right:'0px',bottom:'0px',zIndex:'3000000000',backgroundColor:'white'}}>
        <div style={{height:'40%',width:'100%'}}>
        <div style={{width:'30%',height:'55px',display:'flex',flexDirection:'column',margin:'5px auto',justifyContent:'space-between'}}>
            <Skeleton height={45} mt={6} radius={3} />
            <Skeleton height={45} mt={6} radius={3} />
        </div>

        <div style={{width:'45%',height:'auto',display:'flex',flexDirection:'column',margin:'10px 20px',justifyContent:'space-between'}}>
            <Skeleton height={45} mt={6} radius={3} />
            <Skeleton height={45} mt={6} radius={3} />
        </div>

        <div style={{width:'75%',height:'80px',display:'flex',margin:'10px 20px'}}>
            <Skeleton height="100%"  width="100%" radius={3} />
            
        </div>

        <div style={{width:'100px',height:'100px',margin:'20px 20px'}}>
            <Skeleton height="100%"  width="100%" radius={2} />
            
        </div>
    </div>

    <div style={{height:'200px',marginTop:'100px',width:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
        <div style={{width:'45%',height:'100%'}}><Skeleton height="100%"  width="100%" radius={3}/></div>
        <div style={{width:'45%',height:'100%'}}><Skeleton height="100%"  width="100%" radius={3}/></div>
    </div>
    </div>
  )
}

export default FullUserSkeleton