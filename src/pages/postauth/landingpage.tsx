
import React, {useState,useEffect,useRef} from 'react'
import Navbar from '@/utils/pre_auth/navbar'
import { useRouter } from 'next/router'
import styles from './UserPrivates/Userpage.module.css'
import menuIcon from '../../iconholder/menu.svg'
import rowIcon from '../../iconholder/rows.svg'
import columnIcon from '../../iconholder/column.svg'
import notificationIcon from '../../iconholder/notification.svg'
import notsOff from '../../iconholder/notificationOff.svg'
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
  const {viewmobile,setViewMobile,galleryData,setGalleryData,allGallery,setAllGallery,setFocusedItem} = useRetailContext()
  const [mainContentDiv, setMainContentDiv] = useState<boolean>(true)
  const [moreOptions,setMoreOptions] = useState<any>(false)
  const [itemClicked,setItemClicked] = useState<any>('')
  const imageHolderRef = useRef<HTMLDivElement>(null)
  const [imgHeight,setImgHeight] = useState<any>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showfulluser,setShowfulluser] = useState<boolean>(false)
  const router = useRouter()





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

    const promise: Promise<any> = allDataFunc()

    promise.then((resolvedValue) => {
      // Access the 'userImages' property on the resolved value
      const userImages = resolvedValue.userImages;
      console.log(userImages)
      setAllGallery(userImages)
      // Continue using 'userImages' here
      // ...
    }).catch((error) => {
      // Handle any errors that occurred during the promise execution
    });
    
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
  console.log('a in userp')
  if(imageHolderRef?.current){

    console.log('b in userp')
    const height = imageHolderRef.current?.offsetWidth*1.777

    setImgHeight(height)
  }
},[mainContentDiv,allGallery])


  return (
    <div style={{display:'flex'}}>
        {showfulluser && <FullUserSkeleton/>}
        <Navbar viewmobile={viewmobile} setViewMobile={setViewMobile} setShowfulluser={setShowfulluser}/>
        <div style={{width:width>800?'75%':'100%',minHeight:'100vh'}}>
          <div onClick={()=>setViewMobile(!viewmobile)} style={{height:'90px',display:'flex',backgroundColor:'rgb(91, 90, 90)',alignItems:'center',justifyContent:'space-between',position:'fixed',zIndex:'300',top:'0px',left:'0px',width:'100%',boxSizing:"border-box",padding:"15px"}}>
            <p style={{width:'24px',height:'24px',display:width>800?'none':'block'}}>{width>800?"" :<Image alt='menu' src={menuIcon} style={{width:'100%',height:'100%'}}/>}</p>
            <div style={{width:'65%',position:'relative',height:'50px',borderRadius:'15px',padding:"10px",backgroundColor:'white',margin:"15px auto"}}>
                <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><Image alt='search' src={searchIcon}/></span>
            </div>
            <p style={{width:'24px',height:'24px'}}><Image alt='' src={notsOff} style={{width:'100%',height:'100%'}}/></p>
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
            <div style={{width:"35px",height:'35px',position:'relative',display:'flex',alignItems:"center",justifyContent:'center'}}>
                <p style={{width:"24px",height:'24px'}}><Image src={collectionIcon} alt='' style={{width:"100%",height:'100%'}}/></p>
                <p style={{position:'absolute',zIndex:'1',borderRadius:"50%",backgroundColor:'black',opacity:'0.3',top:'0px',left:'0px',height:"100%",width:"100%"}}></p>
            </div>
          </div>
          <div className={mainContentDiv?styles.userMainUploads:styles.userMainUploadsColumn}>
            {allGallery.map((d:any)=><div ref={imageHolderRef} style={mainContentDiv? {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(allGallery.indexOf(d)+2)%2===0?'column':'column-reverse'}:
                                                                                        {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(allGallery.indexOf(d)+2)%2===0?'column':'column-reverse',width:width*0.8,margin:'0px auto'}}>
              <div onClick={()=>{setFocusedItem(d);router.push(`./Project/${d._id}`)}} style={{width:'100%',height:imgHeight,position:'relative'}}>
                  <Image fill={true}  quality={100} src={d.imageLink} alt={d.title} style={{width:'100%',objectFit:'cover',height:'100%'}}/>
              </div>
              {moreOptions && d._id===itemClicked? <div className={styles.moreItem}>
                <div onClick={()=>{setFocusedItem(d);router.push('./UserPrivates/editProject')}} style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Edit</p><p style={{width:"20px",height:'20px'}}><Image src={smalleditIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Delete</p><p style={{width:"20px",height:'20px'}}><Image src={smalldeleteicon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Share</p><p style={{width:"20px",height:'20px'}}><Image src={shareIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
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
        </section>: 
        <div style={{width:'70vw',height:'200px',margin:'100px auto',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Loader color="black" size="sm" variant="bars" />
        </div>}
        </div>
    </div>
  )
}

export default Landingpage