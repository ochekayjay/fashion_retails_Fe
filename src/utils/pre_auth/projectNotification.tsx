import React, {useEffect} from 'react'
import styles from './ProjectNotification.module.css'
import { useRouter } from 'next/router'

function ProjectNotification({notificationObj,setNewNotification,setNotBar}:any) {
const router = useRouter()

  useEffect(()=>{
    const timer = setTimeout(() => {
      setNotBar(false);
    }, 10000);
    return () => clearTimeout(timer);
  },[])

  const cancel = <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>
  return (
    <div onClick={()=>{router.push(`./Project/${notificationObj.link}`);console.log(`./Project/${notificationObj.link}`)}} className={styles.notificationAlert}>
       <div style={{width:'300px',padding:'7px',height:"100%",display:'flex',justifyContent:"space-evenly",alignItems:"center"}}>
        <div style={{width:"40px",height:'40px',borderRadius:'50%',border:'1px solid white',marginRight:'10px'}}><img src={notificationObj.imageLink} style={{width:"100%",height:'100%',borderRadius:'50%'}}/></div>
        <div style={{color:'white',fontSize:'11px',fontFamily:'NexaTextLight',letterSpacing:'1.5px'}}>{`${notificationObj.creatorName} just tagged you to a project`}</div>
        <div onClick={()=>setNotBar(false)} style={{width:"30px",cursor:'pointer',height:"30px",border:'1px solid white',backgroundColor:'white',display:"flex",alignItems:'center',borderRadius:"5px",justifyContent:"center"}}>{cancel}</div>
       </div>
    </div>
  )
}

export default ProjectNotification