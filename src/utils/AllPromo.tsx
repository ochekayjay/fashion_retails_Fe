import React,{useEffect,useState} from 'react'
import useWindowResize from './windowdimension'

function AllPromo() {

    const [allPromo,setAllPromo] = useState<any>(null)
    const{width,height} = useWindowResize()

    useEffect(()=>{
        
          const extradata = async()=>{
            const fetchdata = await fetch('https://fashion-r-services.onrender.com/promo/getallPromos',{
              method: 'GET',  
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              
                  }
              })
          const newData = await fetchdata.json()
          return newData
          }
  
          const newData = async()=>{
            const data = await extradata()
            setAllPromo(data)
          }
  
          newData()
        
    },[])


  return (
        <>
  
   {allPromo? 
   <div style={{width:"100%",height:'auto',margin:'60px auto'}}>
<p style={{width:'100%',fontFamily:'NexaTextBold',fontSize:"30px",textAlign:"center",marginBottom:'15px'}}>PROMOTED SECTION</p>

<div style={{width:'100%',height:'auto',overflowX:'auto',display:'flex',justifyContent:"space-around",alignItems:"center"}}>

{allPromo.map((promo:any)=> 
                            <div style={{width:'30%',height:'100%',display:'flex',alignItems:"center",justifyContent:"center",position:"relative"}}>
                                <div style={{width:width*0.7*0.9*0.3,height:width*0.7*0.9*0.3,borderRadius:"50%",border:`5px solid ${promo.backgroundColor}`,position:'relative'}}>
                                    <img src={promo.imageLink} style={{height:"100%",width:"100%",borderRadius:"50%"}}/>
                                    <div style={{width:'40px',border: `3px solid ${promo.promoCreator.backgroundColor}`,height:'40px',borderRadius:"50%",position:'absolute',bottom:"10px",right:"13px"}}><img src={promo.creatorImage} style={{height:'100%',width:'100%',borderRadius:'50%',}}/></div>    
                                </div>
                                
                            </div>)}
</div>
   </div> : <p></p>}

    </>
  )
}


export default AllPromo