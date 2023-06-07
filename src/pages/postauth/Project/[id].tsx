import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Project.module.css'
import { Carousel } from '@mantine/carousel';
import useWindowResize from '@/utils/windowdimension';
import { useRetailContext } from '@/context/context';
import mailicon from '../../../iconholder/mailIcon.svg'
import Image from 'next/image';



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
    const {focusedItem,userData,setFocusedItem,setUserData} = useRetailContext()
    const imageHolderRef = useRef<HTMLDivElement>(null)
    const [dynamicDimension,setDynamicDimension] = useState<any>({x:0,y:0})
    const [imageLoader,setImageLoader] = useState<boolean>(false)
    const [hideItem,setHideItem] = useState<any>(true)


    useEffect(()=>{
      console.log(userData)
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
        if(imageHolderRef?.current){
      
          console.log('b in userp')
          console.log(focusedItem)
          console.log(focusedItem.itemsArray[0].distance.x)
          const newWidth = imageHolderRef.current?.offsetWidth
          const newHeight = imageHolderRef.current?.offsetHeight
      
          setDynamicDimension({x:newWidth,y:newHeight})
        }
      }
    },[imageLoader,data])
    

  return (
    <>
  <div style={{width:'100vw',height:'auto',display:'flex',position:'relative',alignItems:"center",justifyContent:'center',backgroundImage: `linear-gradient(to bottom , ${focusedItem.backgroundColor},white)`,padding:'0px'}}>
        <section style={{width:width>500?'auto':'100%',minHeight:width>500?'auto':'100vh',padding:'15px',position:'relative',borderRadius:width>500?"15px":'',paddingTop:width>500?'30px':'80px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
        {width<500 && <p onClick={()=>router.back()} style={{position:'absolute',cursor:'pointer', top:'15px',left:width*0.10,padding:'10px 15px',backgroundColor:'white',borderRadius:'10px'}}>back</p>}
        {focusedItem? <>{hideItem?<div ref={imageHolderRef} style={{height:width>500?"350px":width*0.80*1.7777,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
            <div style={{width:'100%',height:'100%',boxShadow:'1px 1px 5px rgb(91, 90, 90)',}}>
                <Image fill={true} src={focusedItem.imageLink} onLoadingComplete={()=>setImageLoader(!imageLoader)} alt={focusedItem.title} style={{width:'100%',height:'100%',objectFit:"cover",}}/>
            </div>
            
        </div>:
        
          <Carousel maw={width*0.8} mx="auto" withIndicators height={width*0.80*1.7777}>
                <Carousel.Slide>
                <div ref={imageHolderRef} style={{height:width>500?"350px":width*0.80*1.7777,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
                    <div style={{width:'100%',height:'100%',boxShadow:'1px 1px 5px rgb(91, 90, 90)',}}>
                        <Image fill={true} src={focusedItem.imageLink} onLoadingComplete={()=>setImageLoader(!imageLoader)} alt={focusedItem.title} style={{width:'100%',height:'100%',objectFit:"cover",}}/>
                    </div>
                    <div className={styles.itemPop}>
                        {focusedItem.itemsArray.map((item:any)=><p style={{width:'25px',position:'absolute',height:'25px',backgroundColor:"black",borderRadius:"50%",display:item.distance?.x?"flex":"none",alignItems:"center",justifyContent:"center",color:'white',left:item.distance?.x?`${item.distance.x * dynamicDimension.x}px`:'',top:item.distance?.y?`${item.distance.y * dynamicDimension.y}px`:''}}>{item.itemNumber}</p>)}
                    </div>
                </div>
                </Carousel.Slide>
                {focusedItem.itemsArray.map((item:any)=> 
                <Carousel.Slide>
                    <div style={{height: '100%',padding:'15px 0px',paddingBottom:'20px',boxSizing:'border-box', width: width*0.8,color:'white',backgroundColor:focusedItem.backgroundColor,display:item.distance?.x?"flex":"none",flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                            <p>Item Number :</p>
                            <p style={{display:'block',overflow:'hidden'}}>{item.itemNumber?item.itemNumber:''}</p>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                            <p>Item Name :</p>
                            <p style={{display:'block',overflow:'hidden'}}>{item.itemName?item.itemName:''}</p>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                            <p>Email :</p>
                          
                            <a href={item.Email?item.Email:''}><Image alt='' src={mailicon} style={{width:'30px',height:'30px',display:'flex',alignItems:'center',justifyContent:"center"}}/></a>
                          </div>
                        </div>
                        <div style={{backgroundColor:'transparent',height:'40px',position:'relative',width:'85%',margin:'auto'}}>
                          <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.4',zIndex:'3'}}></div>
                          <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:'center',width:'100%',height:'100%'}}>
                            <p>Company Name :</p>
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
                            <p style={{display:'block',overflow:'hidden'}}>{item.Delivery?item.Delivery:''}</p>
                          </div>
                        </div>
                    </div>
                </Carousel.Slide>)}
          </Carousel>
        }<div style={{display:'flex',justifyContent:'space-around',marginTop:'25px',width:width*0.8,height:'auto'}}>
        <p onClick={()=>setHideItem(false)} style={{width:'100px',height:'40px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:'3',color:'white',backgroundColor:'rgb(156, 154, 154)'}}>show Items</p>
        <p onClick={()=>setHideItem(true)} style={{width:'100px',height:'40px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:'3',color:'white',backgroundColor:'rgb(156, 154, 154)'}}>Hide Items</p>
      </div>
      <div style={{margin:'20px auto',width:width*0.8,height:'auto'}}>
        <p style={{width:'100%',textAlign:'left',fontFamily:'NexaTextBold',margin:'20px 0px',fontSize:'30px'}}>{focusedItem?.title}</p>
        <p style={{width:'100%',textAlign:'left',fontFamily:'NexaTextLight',margin:'20px 0px',fontSize:'15px'}}>{focusedItem?.projectDescription}</p>
        <p style={{width:'100%',textAlign:'left',fontFamily:'NexaTextLight',margin:'20px 0px',fontSize:'15px',display:'flex',justifyContent:'left',flexWrap:'wrap'}}>{focusedItem?.hashtag.map((hash:any)=><span style={{margin:'0px 5px'}}>{hash}</span>)}</p>

      </div></>
        :<p>''</p>}

        {userData?<div style={{margin:'20px auto',width:width*0.8,display:'flex',justifyContent:"space-around",alignItems:"center",boxSizing:'border-box',flexDirection:'column',height:'auto'}}>

            <div onClick={()=>router.push(`../UserPrivates/${userData._id}`)} style={{height:'80px',cursor:'pointer',width:'80px',borderRadius:'50%',border:'3px solid rgb(70, 70, 70)',position:'relative'}}><Image quality={100} fill={true} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:"cover"}}  src={userData.avatarLink} alt="user avatar"/></div>
            <div style={{height:'auto',display:'flex',flexDirection:'column',justifyContent:"space-around",marginTop:'15px',alignItems:"center"}}>
              <p onClick={()=>router.push(`../UserPrivates/${userData._id}`)} style={{fontFamily:"NexaTextLight",cursor:'pointer',fontSize:'18px',textAlign:"center",marginBottom:"10px"}}>{userData.Username}</p>
              <p style={{fontFamily:"NexaTextLight",fontSize:'12px',textAlign:"center",marginBottom:"10px"}}>{userData.name}</p>
            </div>
        </div>:<p>''</p>}
        </section>
    </div>

    </>
  )
}


 