
import React, {useState,useEffect,useRef} from 'react'
import Navbar from '@/utils/pre_auth/navbar'
import { useRouter } from 'next/router'
import styles from './UserPrivates/Userpage.module.css'
import menuIcon from '../../iconholder/menu.svg'
import rowIcon from '../../iconholder/rows.svg'
import columnIcon from '../../iconholder/column.svg'
import notificationIcon from '../../iconholder/notification.svg'
import notsOff from '../../iconholder/notificationOff.svg'
import notsOn from '../../iconholder/notificationOn.svg'
import searchIcon from '../../iconholder/search.svg'
import shareIcon from '../../iconholder/share.svg'
import smalldeleteicon from '../../iconholder/smallDeleteIcon.svg'
import editIcon from '../../iconholder/editIcon.svg'
import likeIcon from '../../iconholder/like.svg'
import tagIcon from '../../iconholder/tag.svg'
import bookmarkIcon from '../../iconholder/bookmark.svg'
import smalleditIcon from '../../iconholder/smallEditIcon.svg'
import collectionIcon from '../../iconholder/bookmarkCollection.svg'
import moreIcon from '../../iconholder/moreIcon.svg'
import Image from 'next/image'
import { Loader } from '@mantine/core';
import useWindowResize from '@/utils/windowdimension'
import { useRetailContext } from '@/context/context'
import FullUserSkeleton from '@/utils/Skeleton/fullUserSkeleton'
import ProjectSkeleton from '@/utils/Skeleton/projectSkeleton'
import GallerySkeleton from '@/utils/Skeleton/gallerySkeleton'
import { DeleteProject } from '@/utils/pre_auth/deleteProject'
import ShareLink from '@/utils/pre_auth/shareLink'
import TagOption from '@/utils/pre_auth/tagOption'
import ProjectNotification from '@/utils/pre_auth/projectNotification'


import io from 'socket.io-client'



/**
 * 
 * @param param0 export async function getServerSideProps() {
 
    const res = await fetch(`https://fashion-r-services.onrender.com/content/allProjects`,{
    method: 'GET',  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    
        }
    });
    const data = await res.json()
    
  return { props: { data} };
  
}
 * @returns 
 */





  
const Landingpage = ()=> {
  
  const {width,height} = useWindowResize()
  const {otherUsers,setOtherUsers,setServerSocket,userfile,setUserFile,viewmobile,setViewMobile,galleryData,setGalleryData,allGallery,setAllGallery,setFocusedItem,id,setId} = useRetailContext()
  const [mainContentDiv, setMainContentDiv] = useState<boolean>(true)
  const [moreOptions,setMoreOptions] = useState<any>(false)
  const [itemClicked,setItemClicked] = useState<any>('')
  const imageHolderRef = useRef<HTMLDivElement>(null)
  const [imgHeight,setImgHeight] = useState<any>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showfulluser,setShowfulluser] = useState<boolean>(false)
  const [loadProSkeleton,setLoadProSkeleton] = useState<any>(false)
  const [showTag,setShowTag] = useState<boolean>(false)
  const [tagimgUrl,setTagImgUrl] = useState<any>(null)
  const [newNotification,setNewNotification] = useState<boolean>(false)
  const [tagimgName,setTagImgName] = useState<any>(null)
  const [notificationObj,setNotificationObj] = useState<any>()
  const [notbar,setNotBar] = useState(false)
  const [tagTitle,setTagTitle] = useState<any>(null)
  const router = useRouter()
  let token:any
  let socket

  if(typeof window !== 'undefined'){
    token = window.localStorage.getItem('token')
  }
//http://localhost:5005
//https://fashion-r-services.onrender.com
  

  const socketInitializer = async () => {
    socket = io('https://fashion-r-services.onrender.com',
                {transports: ["websocket"]})
    setServerSocket(socket)
    socket.on('connect', () => {
      console.log('connected')
    });
     
    socket.emit('addSocketid', token)
    socket.on('notifications',(d)=>{setNewNotification(true);setNotBar(true);setNotificationObj({...d})})
  
  }

  useEffect(() => {
    if(typeof window !== 'undefined'){
      socketInitializer()
    }
    }, [])
 
 
 
 

useEffect(()=>{
    const allDataFunc = async()=>{
      const fetchdata = await fetch('https://fashion-r-services.onrender.com/content/allProjects',{
        method: 'GET',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        
            }
        })

        const fetched = await fetchdata.json()
        return fetched
    }

 if(!allGallery){
  
  const promise: Promise<any> = allDataFunc()

  promise.then((resolvedValue) => {
    // Access the 'userImages' property on the resolved value
    const userImages = resolvedValue.userImages;
    setAllGallery(userImages)
    const userId = window.localStorage.getItem('id')
    userId? setId(userId): ''
    // ...
  }).catch((error) => {
    // Handle any errors that occurred during the promise execution
  });
 }
    
},[])
 


/**
 * useEffect(()=>{
  if(typeof window !== 'undefined'){
  }

  else{
    router.push('../../postauth/landingpage')
  }
},[])
 */



/**
 * useEffect(()=>{
  setAllGallery(data.userImages)
},[data])
 */



useEffect(()=>{
  if(imageHolderRef?.current){
    const height = imageHolderRef.current?.offsetWidth*1.777

    setImgHeight(height)
  }
},[mainContentDiv,allGallery])


const onDelete = (id:any)=>{
  const asyncDel = async()=>{
    const newdata = await DeleteProject(id)
    setAllGallery(newdata.userImages)
  }

  asyncDel()
}


const [scrollable,setScrollable] = useState<boolean>(false)
   // Restore scroll position on route change
  useEffect(() => {
    const scrollKey = router.pathname?`scrollPosition_${router.pathname}`:'';
    const key = window.sessionStorage.getItem(scrollKey)
    
    const keystring = window.sessionStorage.getItem(scrollKey)
     if(keystring){
      const storedPosition = parseInt(keystring);
      if (!isNaN(storedPosition)) {
        setTimeout(() => {
          window.scrollTo(0, storedPosition);
        }, 0);
      }
     }

     setScrollable(true)
    
  }, [router.pathname]);


  // Store scroll position in session storage on route change
  useEffect(() => {
    const handleScroll = () => {
  
      const scrollKey = `scrollPosition_${router.pathname}`;
      
      const key = window.sessionStorage.getItem(scrollKey)
      
      const scrollString = window.scrollY.toString()
      if(scrollString !== '0'){
        sessionStorage.setItem(scrollKey,scrollString);
      }
    }

    const handleRouteChange = () => {
      // Your code logic here, which will run on every route change
      setScrollable(false);
    };
    

  
    if(scrollable){
      router.events.on('routeChangeComplete', handleRouteChange);
      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener on component unmount
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
        window.removeEventListener('scroll', handleScroll);
      };
    }  

    
  },);

  useEffect(()=>{
      if(!otherUsers || !userfile){
        const userId = window.localStorage.getItem('id')
        const id = userId?userId:'null'
        const extradata = async()=>{
          const fetchdata = await fetch(`https://fashion-r-services.onrender.com/creator/extras?id=${id}`,{
            method: 'GET',  
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            
                }
            })
        const newData = await fetchdata.json()
        return newData
        }

        const newData = async()=>{
          const data = await extradata()
          setOtherUsers(data.allCreators)
          setUserFile(data.creator)
        }

        newData()
      }
  },[])

  const clickingItem = (id:any)=>{
      if(itemClicked===id){
        setItemClicked(null)
      }

      else{
        setItemClicked(id)
      }
  }
  
  return (
    <div style={{display:'flex'}}>
        {loadProSkeleton && <ProjectSkeleton/>}
        {showfulluser && <FullUserSkeleton/>}
        {notbar  && <ProjectNotification  setLoadProSkeleton={setLoadProSkeleton} setNotBar={setNotBar} setNewNotification={setNewNotification} notificationObj={notificationObj}/>}
        <>
          <div style={{position:'fixed',height:'100%',zIndex:'1000',display:showTag?'block':'none',width:'100%',top:'0px',left:'0px',backdropFilter:'blur(4px)'}}></div>
          {showTag && <TagOption Username={userfile.Username} tagTitle={tagTitle} tagimgUrl={tagimgUrl} tagimgName={tagimgName} itemClicked={itemClicked} setItemClicked={setItemClicked} setTagImgUrl={setTagImgUrl} setShowTag={setShowTag} setMoreOptions={setMoreOptions}/>}
        </>
        <Navbar viewmobile={viewmobile} userfile={userfile} setUserFile={setUserFile} otherUsers={otherUsers} setViewMobile={setViewMobile} setShowfulluser={setShowfulluser}/>
        <div style={{width:width>800?'75%':'100%',minHeight:'100vh'}}>
          <div style={{height:'90px',display:'flex',backgroundColor:'rgb(91, 90, 90)',alignItems:'center',justifyContent:'space-between',position:'fixed',zIndex:'300',top:'0px',left:'0px',width:'100%',boxSizing:"border-box",padding:"15px"}}>
            <p onClick={()=>setViewMobile(!viewmobile)} style={{width:'24px',height:'24px',display:width>800?'none':'block'}}>{width>800?"" :<Image alt='menu' src={menuIcon} style={{width:'100%',height:'100%'}}/>}</p>
            <div onClick={()=>router.push('./Search/main')} style={{width:'65%',position:'relative',height:'50px',borderRadius:'15px',padding:"10px",backgroundColor:'white',margin:"15px auto"}}>
                <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><Image alt='search' src={searchIcon}/></span>
            </div>
            <p onClick={()=>router.push('./notificationPage')} style={{width:'24px',height:'24px',position:'relative'}}>
              <Image alt='' src={token?notsOn:notsOff} style={{width:'100%',height:'100%'}}/>
              <span style={{position:'absolute',width:'15px',display:newNotification?'block':'none',boxShadow:'1px 1px 5px rgb(91, 90, 90)',height:'15px',top:'-5px',right:'-3px',borderRadius:"50%",backgroundColor:"blue",zIndex:'5'}}></span>
            </p>
          </div>

          {allGallery?<section style={{width:width>1100?'65%':'100%',height:'auto',marginTop:'100px'}}>
          <div style={{width:'100%',height:'100px',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
            <div onClick={()=>setMainContentDiv(true)}  style={{width:"35px",cursor:'pointer',height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"24px",height:'24px'}}><Image src={columnIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'black',opacity:'0.3',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
            </div>
            <div onClick={()=>setMainContentDiv(false)} style={{width:"35px",cursor:'pointer',height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"24px",height:'24px'}}><Image src={rowIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'black',opacity:'0.3',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
            </div>

          </div>
          <div className={mainContentDiv?styles.userMainUploads:styles.userMainUploadsColumn}>
            {allGallery.map((d:any)=><div ref={imageHolderRef} style={mainContentDiv? {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(allGallery.indexOf(d)+2)%2===0?'column':'column-reverse'}:
                                                                                        {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(allGallery.indexOf(d)+2)%2===0?'column':'column-reverse',width:width*0.8,margin:'0px auto'}}>
              <div onClick={()=>{setFocusedItem(d);setLoadProSkeleton(true);router.push(`./Project/${d._id}`)}} style={{width:'100%',height:mainContentDiv?width*0.5*0.8*1.777:width*0.8*1.777,position:'relative'}}>
                  <img src={d.imageLink} alt={d.title} style={{width:'100%',objectFit:'cover',height:'100%'}}/>
                  <div style={{height:'100%',width:'100%',position:'absolute',top:'0px',left:'0px',zIndex:'2',backdropFilter:'blur(4px)',display:d._id===itemClicked?'block':'none'}}></div>
              </div>
              {moreOptions && d._id===itemClicked? <div className={styles.moreItem}>
                <div onClick={()=>{setFocusedItem(d);router.push('./UserPrivates/editProject')}} style={{display:id===null || id!==d.creator?"none":'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Edit</p><p style={{width:"20px",height:'20px'}}><Image src={smalleditIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div onClick={()=>onDelete(d._id)} style={{display: id===null || id!==d.creator?"none":'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Delete</p><p style={{width:"20px",height:'20px'}}><Image src={smalldeleteicon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div onClick={()=>ShareLink({title:d.title,description:d.projectDescription,link:`https://fashion-retails-fe-ashen.vercel.app/postauth/Project/${d._id}`})} style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Share</p><p style={{width:"20px",height:'20px'}}><Image src={shareIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Bookmark</p><p style={{width:"20px",height:'20px'}}><Image src={bookmarkIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
              </div>: null}

             
              
              <div  style={{width:'100%',height:'50px',display:mainContentDiv?'flex':'none',alignItems:'center',justifyContent:'space-around'}}>
                <p style={{width:"20px",height:'20px',display: id===null ?"none":'block'}}><Image src={likeIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p onClick={()=>{setTagImgUrl(d.imageLink),setTagTitle(d.title);setMoreOptions(false);setShowTag(true);setTagImgName(d.imageName);clickingItem(d._id)}} style={{width:"20px",height:'20px',display: id===null ?"none":'block',}}><Image src={tagIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <div  onClick={()=>{setMoreOptions(true);setShowTag(false);clickingItem(d._id)}} style={{width:"35px",cursor:'pointer',height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
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
        </section>: 
        <GallerySkeleton/>}
        </div>
    </div>
  )
}

export default Landingpage