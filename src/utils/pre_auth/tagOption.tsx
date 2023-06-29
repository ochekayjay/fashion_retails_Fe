import React, {useState,useEffect} from 'react'
import Styles from './TagOption.module.css'
import { Skeleton } from '@mantine/core'
import { useRetailContext } from '@/context/context'
import { Loader } from '@mantine/core'

function TagOption({tagimgUrl,tagimgName,setShowTag,setTagImgUrl,setItemClicked,itemClicked,setMoreOptions}:any) {

    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [sendLoading,setSendLoading] = useState<boolean>(false)
    const [searchval,setSearchVal] = useState('')
    const [creatorArr,setCreatorArr] = useState<any>('')
    const [creatorholder,setCreatorHolder] = useState<any>('')
    const [taggedCreators,setTaggedCreators] = useState<any>([])
    const [taggedIds,setTaggedIds] = useState<any>([])
    const [taggedSockets,setTaggedSockets] = useState<any>([])
    const [creatorNotif,setCreatorNotif] = useState<any>([])
    const cancel = <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>
    const {serversocket}  = useRetailContext()


    useEffect(()=>{
        const id = 'null'
        console.log('abc')
        const extradata = async()=>{
            const fetchdata = await fetch(`https://fashion-r-services.onrender.com/creator/extras?id=${id}`,{
              method: 'GET',  
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              
                  }
              })
          const newData = await fetchdata.json()
          console.log(newData)
          return newData
          }
  
          const newData = async()=>{
            const data = await extradata()
            setCreatorArr(data.allCreators)
            setCreatorHolder(data.allCreators)
            setIsLoading(false)
            
          }
  
          newData()
        }
    ,[])


    const searchCreator = async(event:any)=>{
        
        console.log(event.target.value.length)
        setSearchVal(event.target.value)
        setIsLoading(true)
       if(event.target.value.length===0){
        console.log(event.target.value.length)
        setCreatorArr(creatorholder)
            setIsLoading(false)
       }
       else{

        let fetchData = await fetch(`https://fashion-r-services.onrender.com/creator/searchUser?message=${event.target.value}`,{
            method: 'GET',  
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
        
                }
            });
            let newfetch  = await fetchData.json()
            if(newfetch.state){
                setCreatorArr(newfetch.UserSearch)
                setIsLoading(false)
            }
    
            else{
               /**
                *  const myTimeout = setTimeout(()=>setCreatorArr(null), 12000);
                setIsLoading(false)
                */
            }
       }
    }


    const arr = [1,2,3]

    

    const updateTag = (user:any)=>{
      if(!taggedCreators.includes(user.avatarLink)){
        setTaggedCreators([...taggedCreators,user.avatarLink])
        setTaggedIds([...taggedIds,user._id])
        setTaggedSockets([...taggedSockets,user.socketId])
        setCreatorNotif([...creatorNotif,user._id])
      }
      }

      const removeTag = (index:any)=>{
        console.log(index)
        const arr = taggedCreators
        const sockets = taggedSockets
        const tagids = taggedIds
        const notif = creatorNotif
        arr.splice(index,1)
        sockets.splice(index,1)
        tagids.splice(index,1)
        notif.splice(index,1)

          setTaggedCreators([...arr])
          setTaggedIds([...tagids])
          setTaggedSockets([...sockets])
          setCreatorNotif([...notif])
        
        }



const sendNotifs = async()=>{

  if(taggedSockets.length<1 || taggedIds.length<1){

  }

  else{
  setSendLoading(true)
  
  

  const data = {notifiedSockets:taggedSockets,link:itemClicked,notified:taggedIds,imageLink:tagimgUrl,imageName:tagimgName}
  const token = window.localStorage.getItem('token')

  const withImage = {method: 'POST',headers:{'Accept': '*/*',Authorization: `Bearer ${token}`}}
  const withoutImage = {method: 'POST',headers:{'Accept': 'application/json','Content-Type': 'application/json',Authorization: `Bearer ${token}`}}
  
      
  
      let createdNotif =  await fetch('https://fashion-r-services.onrender.com/notifs/project', {...withoutImage,body:JSON.stringify(data)});
      createdNotif= await createdNotif.json()
      if(createdNotif.status){
        setShowTag(null)
        setTagImgUrl(null)
        setMoreOptions(false)
        setItemClicked('')
        setTaggedCreators([])
        setTaggedIds([])
        setSendLoading(false)
      }
  }

    }

    const closetag = ()=>{
      setShowTag(null)
      setTagImgUrl(null)
      setMoreOptions(false)
      setItemClicked('')
    }

  return (
    <div className={Styles.tagHolder}>
        <p style={{width:'90%',margin:"3px auto",fontFamily:"NexaTextLight",color:'white',fontSize:"13px",textAlign:"center"}}>Tag people to project</p>
        <p style={{width:"70px",height:'124.39px',margin:'10px auto'}}><img src={tagimgUrl} style={{height:'100%',width:"100%"}}/></p>
        <p style={{width:"90%",height:'auto',margin:"10px auto"}}>
            <input  value={searchval} placeholder='search for creators' onChange={(event)=>searchCreator(event)} style={{width:'100%',backgroundColor:'rgb(84, 83, 83)',color:'white',boxShadow:'1px 1px 5px rgb(91, 90, 90)',fontFamily:'NexaTextLight',height:'35px',borderRadius:'10px',paddingLeft:'10px',outline:'none',borderWidth:'0px 0px 0px'}}/>
        </p>

        {taggedCreators.length>0 &&<div style={{width:'90%',height:'auto'}}>
        <div style={{width:'auto',margin:'5px auto',height:'75px',display:'flex',justifyContent:'space-around',alignItems:"center",padding:'0px 15px',paddingLeft:"40px",overflowX:'auto',borderRadius:'7px'}}>
            { taggedCreators.map((tags:any,index:any)=><div style={{width:'auto',height:'100%',padding:"5px",backgroundColor:"black",margin:'0px 6px',border:"1px solid white",borderRadius:'7px',display:'flex',justifyContent:"space-between",alignItems:"center"}}>
              <p style={{width:'35px',height:"35px",borderRadius:"50%",marginRight:'3px'}}>
                  <img src={tags} style={{width:'100%',height:"100%",borderRadius:'50%'}}/>
              </p>
              <p onClick={()=>{removeTag(index)}} style={{padding:"3px",cursor:'pointer',display:'flex',marginLeft:'3px',alignItems:"center",justifyContent:'center',borderRadius:'50%',backgroundColor:'white'}}>{cancel}</p>
            </div>)}
        </div>
        </div>}
        <div style={{width:'100%',marginBottom:'10px',maxHeight:'100px',minHeight:'100px',overflow:'auto'}}>
            {creatorArr===null?<p style={{color:'white',width:'100%',textAlign:"center",marginTop:'25px',fontFamily:"NexaTextLight",fontSize:'20px'}}>Creator not found!</p>:isLoading? arr.map((ar:any)=><p style={{width:'90%',height:"45px",margin:'15px auto',borderRadius:"10px"}}><Skeleton height="100%"  width="100%" radius={10}/></p>):
            <div style={{width:'100%',height:"100%",display:"flex",flexDirection:"column",}}>{
                creatorArr.map((user:any)=>
            
               <div  style={{backgroundColor:'transparent',height:'60px',boxShadow: '1px 1px 5px rgb(91, 90, 90)',borderRadius:'10px',position:'relative',width:'100%',margin:'15px auto'}}>
               <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.25',zIndex:'3'}}></div>
               <div onClick={()=>{updateTag(user)}}style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                 <p style={{width:'45px',height:'45px',borderRadius:"50%"}}><img src={user.avatarLink} style={{width:'100%',height:"100%",borderRadius:'50%'}}/></p>
                 <div style={{display:'flex',alignItems:'center',justifyContent:"space-around",flexDirection:"column",overflow:'hidden',color:'white',fontFamily:'NexaTextLight'}}>
                   <p>{user.Username}</p>
                   <p>{user.name}</p>
                 </div>
               </div>
             </div>)}</div>}
        </div>
        <div style={{width:'90%',margin:'10px auto',display:'flex',alignItems:"center",justifyContent:"space-around"}}>
            <p onClick={()=>{sendNotifs()}} style={{width:'70px',cursor:'pointer',boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'NexaTextBold',height:'30px',backgroundColor:'white',color:'black'}}>{sendLoading?<Loader color="black" size="sm" variant="bars" />:'tag'}</p>
            <p onClick={()=>{closetag()}} style={{width:'70px',cursor:'pointer',boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'NexaTextBold',height:'30px',backgroundColor:'white',color:'black'}}>close</p>
        </div>
    </div>
  )
}

export default TagOption