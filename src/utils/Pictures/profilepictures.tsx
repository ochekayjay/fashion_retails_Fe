import React,{useEffect,useState} from 'react'
import useWindowResize from '../windowdimension'
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';

function Profilepictures({color,userId,setShowAvatar,showAvatar}:any) {
  const [imgUrl,setImgUrl] = useState('')
  const router = useRouter()

  type expectedType = {
    avatarLink: string
  }  

  const getFunc : () => Promise<any> = async()=>  {
    try{

      const res = await fetch(`https://fashion-r-services.onrender.com/creator/avatar/${userId}`,{
      method: 'GET',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          }
      });
      const data = await res.json()
     console.log(data)
        return data     
    }

    catch(error){
      console.log(error)
    }
  }


  type userType = () => Promise<expectedType>;

  
  useEffect(()=>{

    (async()=>{

      try{
       const data = await getFunc()
      setImgUrl(data?.avatarLink)
      }

      catch(error){
        console.log(error)
      } 
    })()
  },[])

  const {width,height} = useWindowResize()
  return (
    <div style={{position:'fixed',zIndex:'5000000',top:'0px',left:'0px',height:"100vh",width:"100vw",display:'flex',flexDirection:"column",paddingTop:'15px',alignItems:"center",justifyContent:'space-between',backgroundColor:color}}>
        
        <section style={{width:'100%',position:'absolute',top:'0px',left:'0px',height:'100vh',display:"flex",justifyContent:'center',alignItems:'center'}}>
        <p onClick={()=> setShowAvatar(!showAvatar)} style={{padding:'5px 15px',cursor:'pointer',top:'10px',left:"50%",transform:"translateX(-50%)",position:'absolute',backgroundColor:"white",color:"black",boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:'5px',width:'auto',height:'auto',display:"flex",alignItems:"center",justifyContent:"center"}}>back</p>
        { imgUrl===''?<Loader color="dark" variant="dots" />:
          <img  src ={imgUrl} style={{width:width>500?'500px':width,border:width>500?"5px solid white":"",boxShadow:width>500?'1px 1px 5px rgb(91, 90, 90)':"",height:width>500?'500px':width,objectFit:'cover'}}/>}
        </section>
          
    </div>
  )
}

export default Profilepictures