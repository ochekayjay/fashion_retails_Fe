import React from 'react'
import { useRouter } from 'next/router'

function HomeButton() {
    const router = useRouter()
    const home = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
  return (
    <div onClick={()=>router.push('../../postauth/landingpage')} style={{position:"fixed",cursor:"pointer",boxShadow:'1px 1px 5px rgb(91, 90, 90)',zIndex:'4000',borderRadius:"50%",top:'120px',right:'20px',width:'35px',height:"35px",backgroundColor:"white",display:'flex',alignItems:"center",justifyContent:"center"}}>
        {home}
    </div>
  )
}

export default HomeButton