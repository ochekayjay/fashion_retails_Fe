import { Skeleton } from '@mantine/core'
import useWindowResize from '../windowdimension'

function NotificationSkeleton() {
    const {width,height} = useWindowResize()
    const hashState = [1,2,3,4,]
    
    return (
        <div style={{width:'100vw',height:'auto',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:"space-between"}}>
                  <p style={{width:'70px',height:"30px",margin:'25px auto',borderRadius:'5px'}}><Skeleton height="100%"  width="100%" radius={5}/></p>
                  {hashState.map((notif:any)=>
                                        <div style={{margin:"20px auto",display:"flex",alignItems:'center',justifyContent:"space-around",width:"90%",height:"100px",backgroundColor:"rgb(91, 90, 90)",borderRadius:'15px'}}>
                                           <Skeleton height="100%"  width="100%" radius={15}/>
                   </div>)}
      
            
        </div>
    )

}

export default NotificationSkeleton