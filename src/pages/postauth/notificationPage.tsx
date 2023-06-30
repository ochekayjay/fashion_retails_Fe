import React,{useState,useEffect} from 'react'
import HomeButton from '@/utils/pre_auth/homeButton'
import useWindowResize from '@/utils/windowdimension'
import { useRouter } from 'next/router'

function NotificationPage() {
    const {width,height} = useWindowResize()
    const [notifsArray,setNotifsArray] = useState<any>(null)
    const router = useRouter()

    
  useEffect(()=>{
    if(typeof window !== null){
      const token = window.localStorage.getItem('token')
      const userId = window.localStorage.getItem('id')
      const id = userId?userId:'null'
      const notificationData = async()=>{
        const fetchdata = await fetch(`https://fashion-r-services.onrender.com/notifs/project/?id=${id}`,{
          method: 'GET',  
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          
              }
          })
      const newData = await fetchdata.json()
      return newData
      }

      const newData = async()=>{
        const data = await notificationData()
        setNotifsArray(data)
      }

      newData()
    }
},[])


  return (
    <>
    <HomeButton/>
    <div style={{width:'100vw',height:'auto',backgroundColor:'rgb(228,228,228)',display:'flex',position:'relative',alignItems:"center",justifyContent:'center',padding:'0px'}}>
    {width<500 && <p onClick={()=>router.back()} style={{position:'absolute',cursor:'pointer', top:'15px',left:width*0.10,padding:'10px 15px',backgroundColor:'white',borderRadius:'10px'}}>back</p>}
        <div style={{width:'100%',marginTop:'60px',height:'auto'}}>
        {notifsArray && notifsArray.map((notif:any)=>
                                        <div style={{margin:"20px auto",display:"flex",alignItems:'center',justifyContent:"space-around",width:"90%",height:"100%",backgroundColor:"black",borderRadius:'12px'}}>
                                            <p style={{width:'45px',height:'80.0001px',border:'1.5px solid white'}}><img src={notif.imageLink} style={{width:'100%',height:"100%"}}/></p>
                                            <p>Oche tagged you to this project</p>
                                        </div>)}
        </div>
    </div>
    </>
  )
}

export default NotificationPage