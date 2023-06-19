import React,{useEffect,useState,useRef} from 'react'
import Navbar from '@/utils/pre_auth/navbar'
import UserProfileSkeleton from '@/utils/Skeleton/userProfileSkeleton'
import styles from './Userpage.module.css'
import Image from 'next/image'
import addIcon from '../../../iconholder/addIcon.svg'
import editIcon from '../../../iconholder/editIcon.svg'
import likeIcon from '../../../iconholder/like.svg'
import tagIcon from '../../../iconholder/tag.svg'
import shareIcon from '../../../iconholder/share.svg'
import bookmarkIcon from '../../../iconholder/bookmark.svg'
import smalleditIcon from '../../../iconholder/smallEditIcon.svg'
import smalldeleteicon from '../../../iconholder/smallDeleteIcon.svg'
import searchIcon from '../../../iconholder/search.svg'
import rowIcon from '../../../iconholder/rows.svg'
import columnIcon from '../../../iconholder/column.svg'
import collectionIcon from '../../../iconholder/bookmarkCollection.svg'
import moreIcon from '../../../iconholder/moreIcon.svg'
import useWindowResize from '@/utils/windowdimension'
import { useRouter } from 'next/router'
import { useRetailContext } from '@/context/context'
import Profilepictures from '@/utils/Pictures/profilepictures'
import FullUserSkeleton from '@/utils/Skeleton/fullUserSkeleton'
import ProjectSkeleton from '../../../utils/Skeleton/projectSkeleton'
import { DeleteProject } from '@/utils/pre_auth/deleteProject'
import ShareLink from '@/utils/pre_auth/shareLink'
import GallerySkeleton from '@/utils/Skeleton/gallerySkeleton'


export async function getServerSideProps(context:any) {
  const { params,query} = context
  const id = params?.id
  //https://fashion-r-services.onrender.com
  //http://localhost:5005
  if(id){
    const res = await fetch(`https://fashion-r-services.onrender.com/content/user/contents/${id}`,{
    method: 'GET',  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    
        }
    });
    const data = await res.json()
    
  return { props: { data} };
  }

  else{
    const data = null
    return { props: { data} };
  }
}
 



export default function Userpage({data}:any) {

  const [showAvatar,setShowAvatar] = useState(false)
  const [userId, setUserId] = useState<any>('')
  const router = useRouter()
  const {width,height} = useWindowResize()
  const {setSearchedUserId,id,setFocusedItem,galleryData,setGalleryData,userData,setUserData,setSearches} = useRetailContext()
  const imageHolderRef = useRef<HTMLDivElement>(null)
  const [imgHeight,setImgHeight] = useState<any>(0)
  const [mainContentDiv, setMainContentDiv] = useState<boolean>(true)
  const [moreOptions,setMoreOptions] = useState<any>(false)
  const [itemClicked,setItemClicked] = useState<any>('')
  const [firstLoad,setFirstLoad] = useState<any>(true)
  const [loadProSkeleton,setLoadProSkeleton] = useState<any>(false)
  const [userHashtags,setUserHashtags] = useState<any>(null)
  const token = window.localStorage.getItem('token')
  



  const setPrimarydata = (data:any)=>{
    setGalleryData(data.userImages)
    setUserData(data.userDetail)
    
  }


  useEffect(()=>{
if(typeof window !== 'undefined'){

  const id = window.localStorage.getItem('id');
  if(data?.userDetail.avatarLink && data?.userDetail.Username && data?.userDetail.name){
    setUserId(id)

  }

  else{
    const { query: { id } } = router;
    //const id = window.localStorage.getItem('id');
    //const token = window.localStorage.getItem('token')
    //const queryParam = token ? `?id=${id}&token=${token}` : '';

    if(!userData && !galleryData){

      router.push(`../../postauth/userpage${id}`)
    }
  }
}
 
    
},[])

 

useEffect(()=>{
if(data){
          console.log(data.userDetail)
          setGalleryData(data.userImages);
          setUserData(data.userDetail);
          setFirstLoad(false)

          if(data.userDetail?.hashtag){
            const hashArray = data.userDetail?.hashtag.split(' ')
            if(hashArray){
              setUserHashtags(hashArray)
            }
          }
        
          else{
            setUserHashtags(null)
          }
}

},[data])
 


/**
 * 
  useEffect(()=>{
    const id = window.localStorage.getItem('id');
  if(data){
    console.log(data)
  /**
   *   setUserId(id)
    setAvatarUrl(data.userDetail.avatarLink)
    setUsername(data.userDetail.Username)
    setName(data.userDetail.name)
    setUserbio(data.userDetail.bio)
   

    setPrimarydata(data)
  }
  },[data])
 */


useEffect(()=>{
  
  if(imageHolderRef?.current){

    
    const height = imageHolderRef.current?.offsetWidth*1.777

    setImgHeight(height)
  }
},[mainContentDiv,galleryData,mainContentDiv])

const searchUserFunc = ()=>{
  if(userData?.hashtag){
    const hashArray = userData?.hashtag.split(' ')
    if(hashArray){
      setUserHashtags(hashArray)
    }
  }

  else{
    setUserHashtags(null)
  }
  
    setSearches(null)
    setSearchedUserId(userData._id)
    
    router.push('../Search/searchUserContent')
}


const onDelete = (id:any)=>{
  const asyncDel = async()=>{
    const newdata = await DeleteProject(id)
    setGalleryData(newdata.userImages)
  }

  asyncDel()
}

if(firstLoad){
  return <FullUserSkeleton/>
}

  return (<div style={{display:'flex',position:'relative',flexDirection:width>1100?'row':'column',backgroundColor:'white',justifyContent:width>1100?"space-around":"center",marginTop:'0px',minHeight:'100vh',padding:width>1100?'60px 10px':'',boxSizing:"border-box",paddingBottom:'30px'}}>
        {loadProSkeleton && <ProjectSkeleton/>}
        
        {showAvatar && <Profilepictures color={userData.color} userId={userData._id} showAvatar={showAvatar} setShowAvatar={setShowAvatar}/>}
       
       <>{width>1100?<section style={{width:'auto',height:'auto',padding:'15px',backgroundImage: `linear-gradient(to bottom , ${userData.color},white)`,boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:"15px",paddingTop:'30px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
            <div style={{height:"350px",width:'350px',marginBottom:'30px',boxSizing:'border-box',borderRadius:'15px',position:'relative'}}>
                <Image fill={true}  onClick={()=>setShowAvatar(true)} src={userData.avatarLink} alt='user avatar' style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'15px'}}/>
            </div>

            <div style={{textAlign:'center',height:"50px",width:'350px',marginBottom:'30px'}}>
                <p style={{width:'auto',height:'20px',fontFamily:'NexaTextBold',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{userData.name}</p>
                <p style={{width:'80%',height:'20px',fontFamily:'NexaTextLight',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{userData.Username}</p>
            </div>

            <div style={{height:"150px",width:'350px',overflow:'auto',marginBottom:'30px',display:'flex',alignItems:"center",justifyContent:"center"}}>
                <p style={{fontFamily:'NexaTextLight',fontSize:'15px',margin:'10px',width:"100%",padding:'20px',boxSizing:'border-box'}}>
                    {userData.bio}
                </p>
            </div>

            <div style={{height:"150px",width:'350px',display:'flex',flexDirection:'column',alignItems:"center",justifyContent:"center",marginBottom:'30px'}}>
              <p style={{fontFamily:"NexaTextBold",textAlign:"center",fontSize:'15px'}}><strong>Subscribers</strong> &nbsp; &nbsp; 345</p>
              <p style={{fontFamily:"NexaTextBold",textAlign:"center",fontSize:'15px'}}><strong>Accumulated Views</strong> &nbsp; &nbsp; 13456</p>
            </div>

            <div style={{height:"150px",width:'350px',display:'flex',flexDirection:'column',alignItems:"center",justifyContent:"space-around",marginBottom:'30px'}}>
              <section onClick={()=> router.push('../AddProject/createProject')} style={{width:'70%',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Add Project</p><p style={{width:"24px",height:'24px'}}><Image src={addIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
              <section onClick={()=>router.push('./editProfile')} style={{width:'70%',cursor:'pointer',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Edit Account</p><p style={{width:"24px",height:'24px'}}><Image src={editIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
            </div>

        </section>:
        <>{!userData||  !router.isReady? <FullUserSkeleton/>: <section style={{width:'100%',position:"relative",margin:"0px auto",boxShadow:'1px 1px 5px rgb(91, 90, 90)',height:id?"440px":"350px",paddingTop:'15px',display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:'white'}}>
            <div style={{textAlign:'center',position:'fixed',top:'0px',backgroundColor:'white',zIndex:"50000000",width:"100%",padding:'20px'}}>
                <p style={{width:'auto',height:'20px',fontFamily:'NexaTextBold',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{userData.name}</p>
                <p style={{width:'80%',height:'20px',fontFamily:'NexaTextLight',letterSpacing:'2.0px',fontSize:'15px',margin:'5px auto'}}>{userData.Username}</p>
            </div>
            <p style={{fontFamily:'NexaTextLight',fontSize:'15px',margin:'10px',marginTop:'70px',width:"100%",padding:'20px',boxSizing:'border-box'}}>
              {userData.bio}
            </p>
            <div style={{width:"100%",paddingLeft:'10px',boxSizing:"border-box"}}>
              <p style={{fontFamily:"NexaTextBold",textAlign:"left",fontSize:'15px'}}><strong>Subscribers</strong> &nbsp; &nbsp; 345</p>
              <p style={{fontFamily:"NexaTextBold",textAlign:"left",fontSize:'15px'}}><strong>Accumulated Views</strong> &nbsp; &nbsp; 13456</p>
            </div>

            <div style={{width:"90%",boxSizing:"border-box",marginTop:'40px',display:id?'flex':'none',alignItems:"center",justifyContent:"space-around"}}>
              <section onClick={()=> router.push('../AddProject/createProject')} style={{width:'150px',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Add Project</p><p style={{width:"24px",height:'24px'}}><Image src={addIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
              <section onClick={()=>router.push('./editProfile')} style={{width:'150px',padding:"10px",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',cursor:'pointer',display:'flex',justifyContent:'space-around',backgroundColor:'white',borderRadius:'5px'}}><p style={{fontFamily:"NexaTextLight",fontSize:'14px'}}>Edit Account</p><p style={{width:"24px",height:'24px'}}><Image src={editIcon} alt='' style={{width:"100%",height:'100%'}}/></p></section>
            </div>

            <div style={{boxShadow:'1px 1px 5px rgb(91, 90, 90)',position:'absolute',bottom:'-80px',left:'10px',border:'3px solid white',borderRadius:"15px",width:'150px',backgroundColor:"white",height:'150px'}}>
                <Image fill={true}  quality={100} onClick={()=>setShowAvatar(true)} src={userData.avatarLink} alt='user avatar' style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'15px'}}/>
            </div>
        </section>}
        </>}
        </>
        
      <div style={{width:'95%',margin:"150px auto",marginBottom:'20px',height:'auto'}}>
          <p style={{width:'fit-content',margin:'auto',letterSpacing:'1.5px',fontFamily:'NexaTextBold',fontSize:'22px'}}>PROMOTED SECTION</p>
          <p style={{width:'fit-content',height:'fit-content',margin:'auto',display:token?'block':'none'}}><p className={styles.appPromoButton}>Add Project</p></p>
      </div>
       

      {userData && <div style={{marginTop:'40px',width:'100%',height:'auto',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
      <p style={{width:'fit-content',margin:'auto',letterSpacing:'1.5px',fontFamily:'NexaTextBold',fontSize:'22px',marginBottom:'30px'}}>CONTENT SECTION</p>
        <div style={{width:'85%',margin:'30px auto', height:'150px'}}>
            <p style={{width:'100%',textAlign:"left",fontFamily:'NexaTextBold',margin:'10px auto'}}>#Creator hashtags</p>
            <div style={{width:'100%',height:'150px',overflow:'hidden',borderRadius:'10px',position:'relative',backgroundColor:'white',boxShadow:'1px 1px 5px rgb(91, 90, 90)'}}>
              <p style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid black', borderWidth:'0px 0px 1px',fontFamily:'NexaTextLight',fontSize:'20px',position:'absolute',top:"0px",left:'0px'}}>User Hashtags</p>
              <div style={{marginTop:'30px',maxHeight:'90%',overflow:'auto',width:'100%'}}>
                {userHashtags?<div style={{height:'150px',width:'100%',display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>{userHashtags.map((hash:any)=><span style={{color:'blue',margin:"10px",fontFamily:'NexaTextLight'}}>{hash}</span>)}</div>:
                <p style={{width:'100%',height:"100%",marginTop:'30px',display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"NexaTextLight"}}>No Hashtags Available!</p>}

              </div>
            </div>
        </div>
        <div style={{width:'85%',height:'auto',margin:'40px auto'}}>
        <p style={{width:'100%',textAlign:"left",fontFamily:'NexaTextBold',marginBottom:'10px'}}>Search</p>
        <div style={{width:'100%',position:'relative',height:'40px',borderRadius:'15px',padding:"10px",backgroundColor:'rgb(228,228,228)',margin:"0px auto"}}>
        <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><Image alt='search' src={searchIcon}/></span>
        </div>
        </div>
        </div>}

        {galleryData?<section style={{width:width>1100?'65%':'100%',minHeight:width>1100?'100vh':'75vh',marginTop:'15px'}}>
          <div style={{width:'100%',height:'100px',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
            <div onClick={()=>setMainContentDiv(true)}  style={{width:"35px",cursor:'pointer',height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"24px",height:'24px'}}><Image src={columnIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'black',opacity:'0.3',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
            </div>
            <div onClick={()=>setMainContentDiv(false)} style={{width:"35px",cursor:'pointer',height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"24px",height:'24px'}}><Image src={rowIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'black',opacity:'0.3',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
            </div>
            <div style={{width:"35px",height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"24px",height:'24px'}}><Image src={collectionIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'black',opacity:'0.3',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
            </div>
          </div>
          <div className={mainContentDiv?styles.userMainUploads:styles.userMainUploadsColumn}>
            {galleryData.map((d:any)=><div ref={imageHolderRef} style={mainContentDiv? {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(galleryData.indexOf(d)+2)%2===0?'column':'column-reverse'}:
                                                                                        {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(galleryData.indexOf(d)+2)%2===0?'column':'column-reverse',width:width*0.8,margin:'0px auto'}}>
              <div onClick={()=>{setFocusedItem(d);setLoadProSkeleton(true);router.push(`../Project/${d._id}`)}} style={{width:'100%',height:imgHeight,position:'relative'}}>
                  <Image fill={true}  quality={100} src={d.imageLink} alt={d.title} style={{width:'100%',objectFit:'cover',height:'100%'}}/>
              </div>
              {moreOptions && d._id===itemClicked? <div className={styles.moreItem}>
                <div onClick={()=>{setFocusedItem(d);router.push('./editProject')}} style={{display:id===null || id!==d.creator?"none":'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Edit</p><p style={{width:"20px",height:'20px'}}><Image src={smalleditIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div onClick={()=>onDelete(d._id)} style={{display:id===null || id!==d.creator?"none":'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Delete</p><p style={{width:"20px",height:'20px'}}><Image src={smalldeleteicon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div onClick={()=>ShareLink({title:d.title,description:d.projectDescription,link:`https://fashion-retails-fe-ashen.vercel.app/postauth/Project/${d._id}`})} style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Share</p><p style={{width:"20px",height:'20px'}}><Image src={shareIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Bookmark</p><p style={{width:"20px",height:'20px'}}><Image src={bookmarkIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
              </div>: null}
              
              <div  style={{width:'100%',height:'50px',display:mainContentDiv?'flex':'none',alignItems:'center',justifyContent:'space-around'}}>
                <p style={{width:"20px",height:'20px'}}><Image src={likeIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p style={{width:"20px",height:'20px'}}><Image src={tagIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <div  onClick={()=>{setMoreOptions(!moreOptions);setItemClicked(d._id)}} style={{width:"35px",cursor:'pointer',height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"35px",height:'35px',display:'flex',alignItems:'center',justifyContent:"center",backgroundColor:'transparent',position:'absolute',top:'0px',left:'0px',zIndex:'3'}}><Image src={moreIcon} alt='' style={{width:"24px",height:'24px'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'white',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
              </div>
              </div>
              <div  onClick={()=>{setMoreOptions(!moreOptions);setItemClicked(d._id)}} style={{width:"35px",cursor:'pointer',height:'35px',position:'absolute',bottom:'10px',right:'10px',display:mainContentDiv?'none':'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"35px",height:'35px',display:'flex',alignItems:'center',justifyContent:"center",backgroundColor:'transparent',position:'absolute',top:'0px',left:'0px',zIndex:'3'}}><Image src={moreIcon} alt='' style={{width:"24px",height:'24px'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'white',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
              </div>
            </div>)}
          </div>
        </section>: <GallerySkeleton/>}
    </div>
    
  )
}
