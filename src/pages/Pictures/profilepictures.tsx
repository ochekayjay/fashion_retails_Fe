import React,{useEffect,useState} from 'react'
import useWindowResize from '@/utils/windowdimension';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import Image from 'next/image';



function Profilepictures() {
  const [imgUrl,setImgUrl] = useState('')
  const router = useRouter()
  const { query: { creatorId } } = router

  type expectedType = {
    avatarLink: string
  }  

  const getFunc : () => Promise<any> = async()=>  {
    try{

      const res = await fetch(`https://fashion-r-services.onrender.com/creator/avatar/${creatorId}`,{
      method: 'GET',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          }
      });
      const data = await res.json()
    
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

  //<img alt='avatar'   src ={imgUrl} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
  //<Image alt='avatar' fill={true} quality={100} src ={imgUrl} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
  const {width,height} = useWindowResize()
  return (
    <div style={{position:'fixed',zIndex:'5000000',top:'0px',left:'0px',height:"100vh",width:"100vw",display:'flex',flexDirection:"column",paddingTop:'15px',alignItems:"center",justifyContent:'space-between',backgroundColor:'black'}}>
        
        <section style={{width:'100%',position:'absolute',top:'0px',left:'0px',height:'100vh',display:"flex",justifyContent:'center',alignItems:'center'}}>
        <p onClick={()=> router.back()} style={{padding:'5px 15px',cursor:'pointer',top:'10px',left:"50%",transform:"translateX(-50%)",position:'absolute',backgroundColor:"white",color:"black",boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:'5px',width:'auto',height:'auto',display:"flex",alignItems:"center",justifyContent:"center"}}>back</p>
        { imgUrl===''?<Loader color="dark" variant="dots" />:
        <div style={{width:width>500?'500px':width,border:width>500?"5px solid white":'',position:'relative',boxShadow:width>500?'1px 1px 5px rgb(91, 90, 90)':"",height:width>500?'500px':width}}>
          <Image alt='avatar' fill={true} quality={100} src ={imgUrl} blurDataURL='./my_personal_image.jpg' style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>  
          }
        
        </section>
          
    </div>
  )
}

export default Profilepictures