import { Skeleton } from '@mantine/core'
import useWindowResize from '../windowdimension'

function ProjectSkeleton() {
    const {width,height} = useWindowResize()
  return (
    <div style={{width:'100vw',minHeight:'100vh',position:'fixed',top:'0px',left:'0px',right:'0px',bottom:'0px',zIndex:'3000000000',backgroundColor:'white'}}>
        <div style={{width:width*0.8,height:width*0.80*1.7777,margin:'30px auto'}}>
            <Skeleton height="100%"  width="100%" radius={10}/>
        </div>

        <div style={{width:'100%',height:'80px',margin:'15px auto',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Skeleton height="90%"  width="40%" radius={5}/>
            <Skeleton height="90%"  width="40%" radius={5}/>
        </div>

        <div style={{width:'50%',height:'150px',margin:'15px auto',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <Skeleton height="40%"  width="100%" radius={5}/>
            <Skeleton height="40%"  width="100%" radius={5}/>
        </div>
    </div>
  )
}

export default ProjectSkeleton