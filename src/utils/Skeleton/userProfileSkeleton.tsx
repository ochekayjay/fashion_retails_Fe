import { Skeleton } from '@mantine/core'
import React from 'react'




function UserProfileSkeleton() {
  return (
    <div style={{height:'40%',width:'100%'}}>
        <div style={{width:'30%',height:'55px',display:'flex',flexDirection:'column',margin:'5px auto',justifyContent:'space-between'}}>
            <Skeleton height={45} mt={6} radius={3} />
            <Skeleton height={45} mt={6} radius={3} />
        </div>

        <div style={{width:'45%',height:'auto',display:'flex',flexDirection:'column',margin:'10px 20px',justifyContent:'space-between'}}>
            <Skeleton height={45} mt={6} radius={3} />
            <Skeleton height={45} mt={6} radius={3} />
        </div>

        <div style={{width:'75%',height:'100px',display:'flex',margin:'10px 20px'}}>
            <Skeleton height="100%"  width="100%" radius={3} />
            
        </div>

        <div style={{width:'200px',height:'200px',margin:'20px 20px'}}>
            <Skeleton height="100%"  width="100%" radius={2} />
            
        </div>
    </div>
  )
}

export default UserProfileSkeleton