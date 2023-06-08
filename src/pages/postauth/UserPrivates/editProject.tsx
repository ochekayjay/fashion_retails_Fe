import useWindowResize from '@/utils/windowdimension'
import React, {useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import { useRetailContext } from '@/context/context'
import { Loader } from '@mantine/core';
import Image from 'next/image';
import styles from './Editprofile.module.css'


function EditProject() {
    const router = useRouter()
    const {width,height} = useWindowResize()
    const {focusedItem,userData,setFocusedItem,setUserData} = useRetailContext()
    const [isLoading, setIsLoading] = useState(false)
    const [hashtagHold,setHashtagHold] = useState<any>('')
    const [enlistUserObj,setEnlistUserObj] = useState<any>({
        title:"",
        projectDescription: "",
        hashtag:[],
    })

    useEffect(()=>{
        setHashtagHold(focusedItem?.hashtag.join(','))
        setEnlistUserObj({title:focusedItem?.title,
                          projectDescription:focusedItem?.projectDescription,
                          })
    },[])

    const updateUserObj = (event:any)=>{
        setEnlistUserObj({...enlistUserObj,...{[event.target.name] : event.target.value}})    
    }

    const updateHashtag = (event:any)=>{
        const hashArray = event.target.value
        const hashholder  = hashArray.split(' ')
        console.log(enlistUserObj)

        console.log(hashholder)
        console.log(hashtagHold)
        setHashtagHold(event.target.value)
        setEnlistUserObj({...enlistUserObj, hashtag : hashholder})   
    }
    
const submitUserInfo = async (event:any,enlistUserObj:any)=>{
    event.preventDefault()
    
  console.log(enlistUserObj)

  
  
    const token = window.localStorage.getItem('token')
    setIsLoading(true)
  
  
  const withoutImage = {method: 'POST',headers:{'Accept': 'application/json','Content-Type': 'application/json',Authorization: `Bearer ${token}`}}
  
    //'https://fashion-r-services.onrender.com/creator/editProfile
    
      console.log('a')
      const createdCreator =  await fetch(`https://fashion-r-services.onrender.com/content/creation/edit/${focusedItem._id}`, {...withoutImage,body: JSON.stringify(enlistUserObj)});
      const res = await createdCreator.json()
    if(res.verified===true){
      
      setIsLoading(false)
    }
    console.log(`${JSON.stringify(res)} got it out`)

  }



  return (
    <>
    {focusedItem?<div style={{width:'100vw',height:'auto',display:'flex',position:'relative',alignItems:"center",justifyContent:'center',backgroundImage: `linear-gradient(to bottom , ${focusedItem.backgroundColor},white)`,padding:'0px'}}>
        <section style={{width:width>500?'auto':'100%',minHeight:width>500?'auto':'100vh',padding:'15px',position:'relative',borderRadius:width>500?"15px":'',paddingTop:width>500?'30px':'80px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
        {width<500 && <p onClick={()=>router.back()} style={{position:'absolute',cursor:'pointer', top:'15px',left:width*0.10,padding:'10px 15px',backgroundColor:'white',borderRadius:'10px'}}>back</p>}
        <div style={{height:width>500?"350px":width*0.80*1.7777,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
            <div style={{width:'100%',height:'100%',boxShadow:'1px 1px 5px rgb(91, 90, 90)',}}>
                <Image fill={true} src={focusedItem.imageLink}  alt={focusedItem.title} style={{width:'100%',height:'100%',objectFit:"cover",}}/>
            </div>
            
        </div>
       
        <div style={{height:"50px",width:width>500?'350px':width*0.80,margin:'30px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Title &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj?.title} type='text' placeholder="name" name='title' onChange={(event)=>{updateUserObj(event)}} className={styles.forminput}/>
            </div>


            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Project Description &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={enlistUserObj?.projectDescription} placeholder='project bio' name='projectDescription' onChange={(event)=>{updateUserObj(event)}} className={styles.forminputTextArea}/>
            </div>

            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Hashtags &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={hashtagHold} placeholder='#summer #outdoor #date-nights' name='hashtag' onChange={(event)=>{updateHashtag(event)}} className={styles.forminputTextArea}/>
            </div>

            <p onClick={(event)=>submitUserInfo(event,enlistUserObj)} style={{width:'100px',cursor:'pointer',height:'50px',display:'flex',alignItems:"center",justifyContent:"center",backgroundColor:'white',margin:'30px auto',fontFamily:"NexaTextight",borderRadius:'7px',boxShadow:'1px 1px 5px rgb(91, 90, 90)'}}>{isLoading?<Loader color="black" size="sm" variant="bars" />:'Save'}</p>


        </section>
    </div>:<p>''</p>}

    </>
  )
}

export default EditProject