import React,{useEffect,useState} from 'react'
import Navbar from '@/utils/pre_auth/navbar'
import menuIcon from '../../iconholder/menu.svg'
import Image from 'next/image'
import addIcon from '../../iconholder/addIcon.svg'
import editIcon from '../../iconholder/editIcon.svg'
import useWindowResize from '@/utils/windowdimension'
import { useRouter } from 'next/router'
import { useRetailContext } from '@/context/context'
import Profilepictures from '@/utils/Pictures/profilepictures'


export async function getServerSideProps(context:any) {
  const { query } = context;
  // Fetch data from external API
  const id = query?.id
  const token = query?.token

  console.log(id)
  console.log(token)
  //https://fashion-r-services.onrender.com
  //http://localhost:5005
  if(id && token){
    const res = await fetch(`https://fashion-r-services.onrender.com/creator/personal/${id}`,{
    method: 'GET',  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json()
    
  return { props: { data} };
  }

  else{
    const data = null
    return { props: { data} };
  }
  
 
  // Pass data to the page via props
  
}


export default function Userpage({data}:any) {

  const [showAvatar,setShowAvatar] = useState(false)
  const [userId, setUserId] = useState<any>('')
  const router = useRouter()
  const {width,height} = useWindowResize()
  const {viewmobile,setViewMobile,signed,name,username,avatarUrl,setAvatarUrl,setUsername,setName,userbio,setUserbio} = useRetailContext()

  

  useEffect(()=>{
if(typeof window !== 'undefined'){

  const id = window.localStorage.getItem('id');
  if(data?.avatarLink && data?.Username && data?.name){
    setUserId(id)
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
}
    
  },[])

  useEffect(()=>{
    const id = window.localStorage.getItem('id');
  if(data){
    setUserId(id)
    setAvatarUrl(data.avatarLink)
    setUsername(data.Username)
    setName(data.name)
    setUserbio(data.bio)
  }
  },[data])


  return (
    <div style={{display:'flex',position:'relative',flexDirection:width>1100?'row':'column',justifyContent:width>1100?"space-around":"center",marginTop:'0px',minHeight:'100vh',padding:width>1100?'60px 10px':'',backgroundColor:'rgb(228,228,228)',boxSizing:"border-box",paddingBottom:'30px'}}>
        {showAvatar && <Profilepictures color={data?.color} userId={userId} showAvatar={showAvatar} setShowAvatar={setShowAvatar}/>}
        {width>1100?<section style={{width:'auto',height:'auto',padding:'15px',backgroundImage: `linear-gradient(to bottom , ${data?.color},white)`,boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:"15px",paddingTop:'30px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
            <div style={{height:"350px",width:'350px',marginBottom:'30px',boxSizing:'border-box',borderRadius:'15px',position:'relative'}}>
                <Image fill={true}  onClick={()=>setShowAvatar(true)} src={avatarUrl} alt='user avatar' style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'15px'}}/>
            </div>

            <div style={{textAlign:'center',height:"50px",width:'350px',marginBottom:'30px'}}>
                <p style={{width:'auto',height:'20px',fontFamily:'NexaTextBold',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{name}</p>
                <p style={{width:'80%',height:'20px',fontFamily:'NexaTextLight',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{username}</p>
            </div>

            <div style={{height:"150px",width:'350px',overflow:'auto',marginBottom:'30px',display:'flex',alignItems:"center",justifyContent:"center"}}>
                <p style={{fontFamily:'NexaTextLight',fontSize:'15px',margin:'10px',width:"100%",padding:'20px',boxSizing:'border-box'}}>
                    {userbio}
                </p>
            </div>

            <div style={{height:"150px",width:'350px',display:'flex',flexDirection:'column',alignItems:"center",justifyContent:"center",marginBottom:'30px'}}>
              <p style={{fontFamily:"NexaTextBold",textAlign:"center",fontSize:'15px'}}><strong>Subscribers</strong> &nbsp; &nbsp; 345</p>
              <p style={{fontFamily:"NexaTextBold",textAlign:"center",fontSize:'15px'}}><strong>Accumulated Views</strong> &nbsp; &nbsp; 13456</p>
            </div>

            <div style={{height:"150px",width:'350px',display:'flex',flexDirection:'column',alignItems:"center",justifyContent:"space-around",marginBottom:'30px'}}>
              <section onClick={()=> router.push('./AddProject/createProject')} style={{width:'70%',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Add Project</p><p style={{width:"24px",height:'24px'}}><Image src={addIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
              <section onClick={()=>router.push('./UserPrivates/editProfile')} style={{width:'70%',cursor:'pointer',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Edit Account</p><p style={{width:"24px",height:'24px'}}><Image src={editIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
            </div>

        </section>:
        <section style={{width:'100%',position:"relative",margin:"0px auto",height:"600px",paddingTop:'15px',display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:'white'}}>
            <div style={{textAlign:'center'}}>
                <p style={{width:'auto',height:'20px',fontFamily:'NexaTextBold',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{name}</p>
                <p style={{width:'80%',height:'20px',fontFamily:'NexaTextLight',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{username}</p>
            </div>
            <p style={{fontFamily:'NexaTextLight',fontSize:'15px',margin:'10px',width:"100%",padding:'20px',boxSizing:'border-box'}}>
              {userbio}
            </p>
            <div style={{width:"100%",paddingLeft:'10px',boxSizing:"border-box"}}>
              <p style={{fontFamily:"NexaTextBold",textAlign:"left",fontSize:'15px'}}><strong>Subscribers</strong> &nbsp; &nbsp; 345</p>
              <p style={{fontFamily:"NexaTextBold",textAlign:"left",fontSize:'15px'}}><strong>Accumulated Views</strong> &nbsp; &nbsp; 13456</p>
            </div>

            <div style={{width:"90%",boxSizing:"border-box",marginTop:'40px',display:'flex',alignItems:"center",justifyContent:"space-around"}}>
              <section onClick={()=> router.push('./AddProject/createProject')} style={{width:'150px',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Add Project</p><p style={{width:"24px",height:'24px'}}><Image src={addIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
              <section onClick={()=>router.push('./UserPrivates/editProfile')} style={{width:'150px',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',cursor:'pointer',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Edit Account</p><p style={{width:"24px",height:'24px'}}><Image src={editIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
            </div>

            <div style={{boxShadow:'1px 1px 5px rgb(91, 90, 90)',position:'absolute',bottom:'-50px',left:'10px',border:'3px solid white',borderRadius:"15px",width:'150px',backgroundColor:"white",height:'150px'}}>
                <Image fill={true}  quality={100} onClick={()=>setShowAvatar(true)} src={avatarUrl} alt='user avatar' style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'15px'}}/>
            </div>
        </section>}
        <section style={{width:width>1100?'65%':'100%',height:width>1100?'100vh':'75vh',backgroundColor:'red'}}>

        </section>
    </div>
  )
}
