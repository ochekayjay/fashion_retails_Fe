import React from 'react'
import useWindowResize from '../windowdimension'
import Link from 'next/link'



function AuthInfo({message,link,setShowError}:any) {
    const {width,height} = useWindowResize()
    const cancel = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
  return (
        <>
              <div style={{position:'fixed',backgroundColor:"black",top:'0px',left:'0px',width:"100vw",height:"100vh",opacity:"0.4"}}></div>
    <div style={{position:"fixed",display:'flex',flexDirection:'column',justifyContent:"space-around",alignItems:"center",width:width*0.8,height:width*0.8,boxShadow:'1px 1px 5px rgb(91, 90, 90)',top:'50%',left:"50%",transform:"translate(-50%,-50%)",backgroundColor:"white",zIndex:"10",borderRadius:'15px',}}>
        <div onClick={()=>setShowError(false)} style={{display:'flex',alignItems:"center",justifyContent:'right',paddingRight:'15px',marginTop:'15px',width:'100%'}}>
        <p style={{width:"20px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',height:"20px",display:'flex',alignItems:'center',justifyContent:"center",backgroundColor:"white",padding:'5px',borderRadius:"50%"}}>{cancel}</p>
        </div>
        <p style={{fontFamily:'NexaTextLight',width:"70%",margin:'auto',fontSize:'25px'}}>{message}</p>

        {link==='Sign Up'?<Link href={'../../preauth/signup'}><p style={{width:"100px",height:'40px',marginBottom:'15px',borderRadius:"10px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:'black',color:'white',display:'flex',alignItems:'center',justifyContent:"center"}}>Sign Up</p></Link>:link === 'Sign In'?<Link href={'../../preauth/signin'}><p style={{width:"100px",height:'40px',marginBottom:'15px',borderRadius:"10px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:'black',color:'white',display:'flex',alignItems:'center',justifyContent:"center"}}>Sign In</p></Link>:''}
    </div>
        </>
  )
}

export default AuthInfo