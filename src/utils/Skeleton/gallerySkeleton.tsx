import { Skeleton } from '@mantine/core'
import useWindowResize from '../windowdimension'

function GallerySkeleton() {
    const {width,height} = useWindowResize()
    const hashState = [1,2,3,4,5,6,]
    const navigators = [1,2,3]
    return (
        <div style={{width:'100vw',height:'auto',marginTop:'100px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:"space-between"}}>
            <section style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:'100%',margin:'30px 0px'}}>{navigators.map(nav=><div style={{width:'50px',height:'50px',borderRadius:'50%'}}><Skeleton height="100%"  width="100%" radius="50%"/></div>)}</section>
                  <div style={{  width:'100vw',height:'auto',display:'grid',gridTemplateColumns:'auto auto',columnGap:'10px',padding:'5px',position: 'relative',rowGap: '25px',zIndex: '10'}}>
            {hashState.map((d:any)=><div style={{display:'flex',borderRadius:'10px',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',overflow:'hidden',backgroundColor: `${d?.backgroundColor}`,height:'300px'}}>
                <Skeleton height="100%"  width="100%" radius={10}/>
                              </div>
                      )
            }
      
            </div>
        </div>
    )

}

export default GallerySkeleton