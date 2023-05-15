import React,{useEffect} from 'react'
import Navbar from '@/utils/pre_auth/navbar'
import menuIcon from '../../iconholder/menu.svg'
import Image from 'next/image'
import addIcon from '../../iconholder/addIcon.svg'
import editIcon from '../../iconholder/editIcon.svg'
import useWindowResize from '@/utils/windowdimension'
import { useRouter } from 'next/router'
import { useRetailContext } from '@/context/context'


export async function getServerSideProps(context:any) {

  const { query } = context;
  // Fetch data from external API
  const id = query?.id
  const token = query?.token
  //https://fashion-r-services.onrender.com
  if(id && token){
    const res = await fetch(`http://localhost:5005/creator/personal/${id}`,{
    method: 'GET',  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
        }
    });
  const data = await res.json();
  return { props: { data} };
  }

  else{
    const data = {}
    return { props: { data} };
  }
  
 
  // Pass data to the page via props
  
}


export default function Userpage({data}:any) {

  const router = useRouter()
  const {width,height} = useWindowResize()
  const {viewmobile,setViewMobile,signed,name,username,avatarUrl,setAvatarUrl,setUsername,setName} = useRetailContext()

  

  useEffect(()=>{

    if(data?.avatarLink && data?.Username && data?.name){
      setAvatarUrl(data.avatarLink)
      setUsername(data.Username)
      setName(data.name)
    }

    else{
      const id = window.localStorage.getItem('id');
      const token = window.localStorage.getItem('token')
      const queryParam = token ? `?id=${id}&token=${token}` : '';
      router.push(`../../postauth/userpage${queryParam}`)
    }
    
  },[])


  return (
    <div style={{display:'flex',flexDirection:width>800?'row':'column',justifyContent:width>800?"space-around":"center",marginTop:'0px',minHeight:'100vh',backgroundColor:'rgb(228,228,228)',padding:'0px',boxSizing:"border-box",paddingBottom:'30px'}}>
        
        {width>800?<section style={{width:'30%',height:'auto',backgroundColor:'white',boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:"15px",paddingTop:'30px',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
            <div style={{backgroundColor:'pink',height:"350px",width:'350px',marginBottom:'30px'}}>

            </div>

            <div style={{backgroundColor:'pink',height:"150px",width:'350px',marginBottom:'30px'}}>

            </div>

            <div style={{backgroundColor:'pink',height:"150px",width:'350px',marginBottom:'30px'}}>

            </div>

            <div style={{backgroundColor:'pink',height:"150px",width:'350px',marginBottom:'30px'}}>

            </div>

        </section>:
        <section style={{width:'100%',position:"relative",margin:"0px auto",border:'1px solid green',height:"600px",paddingTop:'15px',display:"flex",flexDirection:"column",alignItems:"center",backgroundImage: `linear-gradient(to bottom left, rgb(228,228,228) , ${data.color})`}}>
            <div style={{textAlign:'center'}}>
                <p style={{width:'80%',height:'20px',fontFamily:'NexaTextBold',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{name}</p>
                <p style={{width:'80%',height:'20px',fontFamily:'NexaTextLight',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{username}</p>
            </div>
            <p style={{fontFamily:'NexaTextLight',fontSize:'15px',margin:'10px',width:"100%",padding:'20px',boxSizing:'border-box'}}>
            Lorem Ipsum is simply dummy text of the printing and tyIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <div style={{width:"100%",paddingLeft:'10px',boxSizing:"border-box"}}>
              <p style={{fontFamily:"NexaTextBold",textAlign:"left",fontSize:'15px'}}><strong>Subscribers</strong> &nbsp; &nbsp; 345</p>
              <p style={{fontFamily:"NexaTextBold",textAlign:"left",fontSize:'15px'}}><strong>Accumulated Views</strong> &nbsp; &nbsp; 13456</p>
            </div>

            <div style={{width:"90%",boxSizing:"border-box",marginTop:'40px',display:'flex',alignItems:"center",justifyContent:"space-around"}}>
              <section style={{width:'150px',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Add Project</p><p style={{width:"24px",height:'24px'}}><Image src={addIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
              <section style={{width:'150px',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Edit Account</p><p style={{width:"24px",height:'24px'}}><Image src={editIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
            </div>

            <div style={{boxShadow:'1px 1px 5px rgb(91, 90, 90)',position:'absolute',bottom:'-50px',left:'10px',border:'3px solid white',borderRadius:"15px",width:'150px',backgroundColor:"white",height:'150px'}}>
                <img src={avatarUrl} alt='user avatar' style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'15px'}}/>
            </div>
        </section>}
        <section style={{width:width>800?'65%':'100%',height:width>800?'100vh':'75vh',margin:"0px auto",backgroundColor:'red'}}>

        </section>
    </div>
  )
}
