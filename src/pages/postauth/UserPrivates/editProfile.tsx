import React, {useEffect,useState} from 'react'
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useWindowResize from '@/utils/windowdimension';
import addIcon from '../../../iconholder/addIcon.svg'
import styles from './Editprofile.module.css'
import editIcon from '../../../iconholder/editIcon.svg'


export async function getServerSideProps(context:any) {
    const { query } = context;
    // Fetch data from external API
    const id = query?.id
    const token = query?.token
  
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


export default function EditProfile({data}:any) {

  const [showAvatar,setShowAvatar] = useState(false)
  const [shownormal,setshowNormal] = useState(true)
  const [userId, setUserId] = useState<any>('')
  const router = useRouter()
  const {width,height} = useWindowResize()
  const {viewmobile,setViewMobile,signed,name,username,avatarUrl,setAvatarUrl,setUsername,setName} = useRetailContext()
  const bioValue = 'Lorem Ipsum is simply dummy text of the printing and tyIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  const [enlistUserObj,setEnlistUserObj] = useState<any>({
    name:"",
    username: "",
    password: "",
    twitter:"",
    facebook: "",
    instagram : "",
    email: "",
    bio: "",
})

const updateUserObj = (event:any)=>{
    setEnlistUserObj({...enlistUserObj,...{[event.target.name] : event.target.value}})
    
}


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
            router.push(`../../postauth/UserPrivates/editProfile${queryParam}`)
          }
        }
            
          },[])


  return (
    <div style={{width:'100vw',minHeight:'100vh',display:'flex',alignItems:"center",justifyContent:'center',padding:width>500?'30px 0px':'0px'}}>
        <section style={{width:width>500?'auto':'100%',height:width>500?'auto':'100%',padding:'15px',backgroundImage: `linear-gradient(to bottom , ${data?.color},white)`,boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:width>500?"15px":'',paddingTop:width>500?'30px':'80px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
            {width<500 && <p onClick={()=>router.back()} style={{position:'absolute',cursor:'pointer', top:'15px',left:width*0.10,padding:'10px 15px',backgroundColor:'white',borderRadius:'10px'}}>back</p>}
            <div style={{height:width>500?"350px":width*0.80,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',marginBottom:'30px',boxSizing:'border-box',borderRadius:'15px'}}>
                <img onClick={()=>setShowAvatar(true)} src={avatarUrl} alt='user avatar' style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'15px'}}/>
                <p style={{position:'absolute',backgroundColor:'white',boxShadow:'1px 1px 5px rgb(91, 90, 90)',bottom:'15px',right:'15px',width:'35px',height:'35px',padding:'15px',borderRadius:"50%",display:'flex',alignItems:"center",justifyContent:"center"}}><Image src={editIcon} alt='' style={{width:"24px",height:'24px'}}/></p>
            </div>

            <div style={{height:"50px",width:width>500?'350px':width*0.80,margin:'30px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Name &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj.name} type='text' placeholder="name" name='name' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.name===""?styles.forminputUnfilled: styles.forminput}/>
            </div>


            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Bio &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={bioValue} placeholder='user bio' name='bio' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminputTextArea:enlistUserObj.bio===""?styles.forminputTextAreaUnfilled: styles.forminputTextArea}/>
            </div>

            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Bio &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={enlistUserObj.bio} placeholder='user bio' name='bio' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminputTextArea:enlistUserObj.bio===""?styles.forminputTextAreaUnfilled: styles.forminputTextArea}/>
            </div>


            </section>
    </div>
  )
}

