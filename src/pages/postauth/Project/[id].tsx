import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Project.module.css'
import { Carousel } from '@mantine/carousel';
import useWindowResize from '@/utils/windowdimension';
import { useRetailContext } from '@/context/context';
import mailicon from '../../../iconholder/mailIcon.svg'
import mailer from '../../../iconholder/mailIcon.svg'
import Image from 'next/image';
import FullUserSkeleton from '@/utils/Skeleton/fullUserSkeleton';
import ProjectSkeleton from '@/utils/Skeleton/projectSkeleton';



export async function getServerSideProps(context:any){
  const { params,query} = context
  const id = params?.id
  //const token = query?.token

  if(id){
    const res = await fetch(`https://fashion-r-services.onrender.com/content/user/singlecontent/${id}`,{
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

export default function Project({data}:any) {
    const router = useRouter()
    const { query: { id } } = router;
    const {width,height} = useWindowResize()
    const {focusedItem,userData,setFocusedItem,setUserData,setGalleryData,searches,setSearches} = useRetailContext()
    const imageHolderRef = useRef<HTMLDivElement>(null)
    const [dynamicDimension,setDynamicDimension] = useState<any>({x:0,y:0})
    const [imageLoader,setImageLoader] = useState<boolean>(false)
    const [hideItem,setHideItem] = useState<any>(true)
    const [showfulluser,setShowfulluser] = useState<boolean>(false)
    const [loadProject,setLoadProject] = useState(true)
    const [showItems,setShowItems] = useState<boolean>(false)
    const mailicon = <svg xmlns="http://www.w3.org/2000/svg" height="24" fill='#FFFFFF' viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>

//router.isReady


const filterbyHash = async (hash:any)=>{
  let a = Math.random()*134
  const parma = a.toString()
  const hashString = hash.slice(1)
  router.push(`../Search/${parma}?message=${hashString}`)

  }

    useEffect(()=>{
    


      if(router.isReady){
        
  
      }
  
      else{
    
      }



  if(typeof window !== 'undefined'){
  
    const id = window.localStorage.getItem('id');
    if(data){
      
    }
  
    else{
      const { query: { id } } = router;
      //const token = window.localStorage.getItem('token')
      //const queryParam = token ? `?token=${token}` : '';
      if(!focusedItem || !userData){

        router.push(`../../postauth/Project/${id}`)
      }
    }
  }
      
    },[])




    useEffect(()=>{
      if(data){

        setFocusedItem(data.content)
        setUserData(data.userDetail)
        setLoadProject(false)
        if(imageHolderRef?.current){
      
          
          const newWidth = imageHolderRef.current?.offsetWidth
          const newHeight = imageHolderRef.current?.offsetHeight
      
          setDynamicDimension({x:newWidth,y:newHeight})
        }
      }
    },[imageLoader,data])
    


    const [scrollable,setScrollable] = useState<boolean>(false)
   // Restore scroll position on route change
  useEffect(() => {
    const {id} = router.query
    const uniqueId = `Projects ${id}`
    const keystring = window.sessionStorage.getItem(uniqueId)
    console.log(keystring)
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
    const {id} = router.query

    const uniqueId = `Projects ${id}`
    const handleScroll = () => {
  
      const scrollKey = uniqueId;
      
      const key = window.sessionStorage.getItem(scrollKey)
      
      const scrollString = window.scrollY.toString()
      console.log(scrollString)
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



    if(loadProject){
      return <ProjectSkeleton/>
    }

  return (
    <>
  <div style={{width:'100vw',height:'auto',display:'flex',position:'relative',alignItems:"center",justifyContent:'center',backgroundImage: `linear-gradient(to bottom , ${focusedItem?.backgroundColor},white)`,padding:'0px'}}>
        {showfulluser&& <FullUserSkeleton/>}
        <section style={{width:width>500?'auto':'100%',minHeight:width>500?'auto':'100vh',padding:'15px',position:'relative',borderRadius:width>500?"15px":'',paddingTop:width>500?'30px':'80px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
        {width<500 && <p onClick={()=>router.back()} style={{position:'absolute',cursor:'pointer', top:'15px',left:width*0.10,padding:'10px 15px',backgroundColor:'white',borderRadius:'10px'}}>back</p>}
        {focusedItem? <>{hideItem?<div ref={imageHolderRef} style={{height:width>500?"350px":width*0.80*1.7777,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
            <div style={{width:'100%',height:'100%',boxShadow:'1px 1px 5px rgb(91, 90, 90)',}}>
                <img  src={focusedItem.imageLink}  alt={focusedItem?.title} style={{width:'100%',height:'100%',objectFit:"cover",}}/>
            </div>
            
        </div>:
        
          <Carousel maw={width*0.8} mx="auto" withIndicators height={width*0.80*1.7777}>
                <Carousel.Slide>
                <div ref={imageHolderRef} style={{height:width>500?"350px":width*0.80*1.7777,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
                    <div style={{width:'100%',height:'100%',boxShadow:'1px 1px 5px rgb(91, 90, 90)',}}>
                        <Image fill onLoad={()=>setImageLoader(true)}  src={focusedItem?.imageLink} alt={focusedItem?.title} style={{width:'100%',height:'100%',objectFit:"cover",}}/>
                    </div>
                    <div className={styles.itemPop}>
                      {focusedItem?.itemsArray.map((item:any)=><p style={{width:'25px',position:'absolute',height:'25px',backgroundColor:"black",borderRadius:"50%",display:item.distance?.x?"flex":"none",alignItems:"center",justifyContent:"center",color:'white',left:item.distance?.x?`${item.distance.x * dynamicDimension.x}px`:'',top:item.distance?.y?`${item.distance.y * dynamicDimension.y}px`:''}}>{item.itemNumber}</p>)}
                    </div>
                </div>
                </Carousel.Slide>
                {focusedItem?.itemsArray.map((item:any)=> 
                <Carousel.Slide>
                    <div style={{height: '100%',padding:'45px 0px',paddingBottom:'20px',boxSizing:'border-box', width: width*0.8,color:'white',backgroundColor:focusedItem?.backgroundColor,display:item.distance?.x?"flex":"none",flexDirection:'column',justifyContent:'space-around',alignItems:'center',position:'relative'}}>
                      <div style={{position:'absolute',color:"white",display:'flex',alignItems:'center',justifyContent:"space-between",width:"100px",height:"50px",padding:'5px',borderRadius:"50%",top:'10px', right:'10px'}}><span style={{height:'20px',boxShadow:'1px 1px 3px black',width:"20px",borderRadius:'50%',backgroundColor:item.verified?'green':'yellow'}}></span><span>{item.verified?'Verified':'Pending'}</span></div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                            <p>Number :</p>
                            <p style={{display:'block',overflow:'hidden'}}>{item.itemNumber?item.itemNumber:''}</p>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                            <p>Item:</p>
                            <p style={{display:'block',overflow:'hidden'}}>{item.itemName?item.itemName:''}</p>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                            <p>Email :</p>
                          
                            <a href={item.Email?`mailto:${item.Email}`:''}><span style={{display:item.Email?'block':'none'}}>{mailicon}</span></a>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:'center',width:'100%',height:'100%'}}>
                            <p>Company:</p>
                            <p style={{display:'block',overflow:'hidden'}}>{item.companyName?item.companyName:''}</p>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:"black",position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:'10px',boxSizing:'border-box',alignItems:'center',width:'100%',height:'100%'}}>
                            <p>Phone :</p>
                            <p style={{display:item.Phone===''?'none':'block'}}>{item.Phone?item.Phone:''}</p>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:"black",position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:'10px',boxSizing:'border-box',alignItems:'center',width:'100%',height:'100%'}}>
                            <p>Delivery :</p>
                            <p style={{display:'block',overflow:'hidden',fontSize:'9px'}}>{item.Delivery?item.Delivery:''}</p>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:"black",position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:'10px',boxSizing:'border-box',alignItems:'center',width:'100%',height:'100%'}}>
                            <p>Link :</p>
                            <p style={{display:item.Phone===''?'none':'block'}}>{item.link?item.link:''}</p>
                          </div>
                        </div>
                    </div>
                </Carousel.Slide>)}
          </Carousel>
        }<div style={{display:'flex',justifyContent:'space-around',marginTop:'25px',width:width*0.8,height:'auto'}}>
        <p onClick={()=>setHideItem(false)} style={{width:'100px',height:'40px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:'3',color:hideItem?'white':'rgb(156, 154, 154)',cursor:'pointer',backgroundColor:hideItem?'rgb(156, 154, 154)':'white'}}>show Items</p>
        <p onClick={()=>setHideItem(true)} style={{width:'100px',height:'40px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:'3',color:hideItem?'rgb(156, 154, 154)':'white',cursor:'pointer',backgroundColor:hideItem?'white':'rgb(156, 154, 154)'}}>Hide Items</p>
      </div>
      <div style={{margin:'20px auto',width:width*0.8,height:'auto'}}>
        <p style={{width:'100%',textAlign:'left',fontFamily:'NexaTextBold',margin:'20px 0px',fontSize:'30px'}}>{focusedItem?.title}</p>
        <p style={{width:'100%',textAlign:'left',fontFamily:'NexaTextLight',margin:'20px 0px',fontSize:'15px'}}>{focusedItem?.projectDescription}</p>
        <p style={{width:'100%',textAlign:'left',fontFamily:'NexaTextLight',margin:'20px 0px',fontSize:'15px',display:'flex',justifyContent:'left',flexWrap:'wrap'}}>{focusedItem?.hashtag.map((hash:any)=><span onClick={()=>filterbyHash(hash)} style={{margin:'0px 5px',color:'blue'}}>{hash}</span>)}</p>

      </div></>
        :<p>''</p>}

        {userData?<div style={{margin:'20px auto',width:width*0.8,display:'flex',justifyContent:"space-around",alignItems:"center",boxSizing:'border-box',flexDirection:'column',height:'auto'}}>

            <div onClick={()=>{setShowfulluser(true);setGalleryData(null);router.push(`../UserPrivates/${userData._id}`)}} style={{height:'80px',cursor:'pointer',width:'80px',borderRadius:'50%',border:'3px solid rgb(70, 70, 70)',position:'relative'}}><Image fill style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:"cover"}}  src={userData.avatarLink} alt="user avatar"/></div>
            <div style={{height:'auto',display:'flex',flexDirection:'column',justifyContent:"space-around",marginTop:'15px',alignItems:"center"}}>
              <p onClick={()=>{setShowfulluser(true);setGalleryData(null);router.push(`../UserPrivates/${userData._id}`)}} style={{fontFamily:"NexaTextLight",cursor:'pointer',fontSize:'18px',textAlign:"center",marginBottom:"10px"}}>{userData.Username}</p>
              <p style={{fontFamily:"NexaTextLight",fontSize:'12px',textAlign:"center",marginBottom:"10px"}}>{userData.name}</p>
            </div>
        </div>:<p>''</p>}
        </section>
    </div>

    </>
  )
}


 