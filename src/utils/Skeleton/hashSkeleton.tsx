import { Skeleton } from '@mantine/core'
import useWindowResize from '../windowdimension'

function HashSkeleton() {
    const {width,height} = useWindowResize()
    const hashState = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <div style={{width:'100vw',height:'auto',marginTop:'100px',display:'flex',alignItems:'center',justifyContent:"center"}}>
                  <div style={{  width:'100vw',height:'auto',display:'grid',gridTemplateColumns:'auto auto',columnGap:'10px',padding:'5px',position: 'relative',rowGap: '25px',zIndex: '10'}}>
            {hashState.map((d:any)=><div style={{display:'flex',borderRadius:'10px',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',overflow:'hidden',backgroundColor: `${d?.backgroundColor}`,height:'120px'}}>
                <Skeleton height="100%"  width="100%" radius={10}/>
                              </div>
                      )
            }
      
            </div>
        </div>
    )

}

export default HashSkeleton