import React,{useState} from 'react'
import useWindowResize from '../windowdimension'
import Link from 'next/link'
import { Loader } from '@mantine/core'



function AuthInfo({message,link,setShowError,mail,setSignError}:any) {
    const {width,height} = useWindowResize()
    const [isLoading, setIsLoading] = useState(false)
    const cancel = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
  
    
    
    const submitUserInfo = async (event:any)=>{
        event.preventDefault()
        const enlistUserObj = {Email:mail}
       

        try{
        setIsLoading(true)
        
        const createdCreator = await fetch('https://fashion-r-services.onrender.com/creator/reverify', {
            method: 'POST',  
            headers: {
                    'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },    
            body: JSON.stringify(enlistUserObj)
            }); 
        const res = await createdCreator.json()
        if(res.verification==='mail sent'){
            setIsLoading(false)
            setSignError({message:'A mail has been sent to your account for confirmation, kindly look up and sign in',link:'Sign In'})
        
        }
      
      else{
            setIsLoading(false)
            setSignError({message:'User exists but mail is unverified',link:'verify'})
        }
        console.log(res)
        }

    catch(error){
        console.log('error here')
        setIsLoading(false)
    }
    }
  
  
  
  
  return (
        <>
              <div style={{position:'fixed',backgroundColor:"black",top:'0px',left:'0px',width:"100vw",height:"100vh",opacity:"0.4"}}></div>
    <div style={{position:"fixed",display:'flex',flexDirection:'column',justifyContent:"space-around",alignItems:"center",width:width*0.8,height:width*0.8,boxShadow:'1px 1px 5px rgb(91, 90, 90)',top:'50%',left:"50%",transform:"translate(-50%,-50%)",backgroundColor:"white",zIndex:"10",borderRadius:'15px',}}>
        <div onClick={()=>setShowError(false)} style={{display:'flex',alignItems:"center",justifyContent:'right',paddingRight:'15px',marginTop:'15px',width:'100%'}}>
        <p style={{width:"20px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',height:"20px",display:'flex',alignItems:'center',justifyContent:"center",backgroundColor:"white",padding:'5px',borderRadius:"50%"}}>{cancel}</p>
        </div>
        <p style={{fontFamily:'NexaTextLight',width:"70%",margin:'auto',fontSize:'25px'}}>{message}</p>

        {link==='Sign Up'?<Link href={'../../preauth/signup'}><p style={{width:"100px",height:'40px',marginBottom:'15px',borderRadius:"10px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:'black',color:'white',display:'flex',alignItems:'center',justifyContent:"center"}}>Sign Up</p></Link>:link === 'Sign In'?<Link href={'../../preauth/signin'}><p style={{width:"100px",height:'40px',marginBottom:'15px',borderRadius:"10px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:'black',color:'white',display:'flex',alignItems:'center',justifyContent:"center"}}>Sign In</p></Link>:link==='verify'?<p onClick={(event)=>submitUserInfo(event)} style={{width:"100px",height:'40px',marginBottom:'15px',borderRadius:"10px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:'black',color:'white',display:'flex',alignItems:'center',justifyContent:"center"}}>{isLoading?<Loader color="white" size="sm" variant="bars" />:'Re-verify'}</p>:''}
    </div>
        </>
  )
}

export default AuthInfo