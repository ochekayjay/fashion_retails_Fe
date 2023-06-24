import React, {useState,useEffect} from 'react'
import Styles from './TagOption.module.css'
import { Skeleton } from '@mantine/core'
import { Loader } from '@mantine/core'

function TagOption({tagimgUrl,setShowTag,setTagImgUrl,setItemClicked,setMoreOptions}:any) {

    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [searchval,setSearchVal] = useState('')
    const [creatorArr,setCreatorArr] = useState<any>('')
    const [creatorholder,setCreatorHolder] = useState<any>('')

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
  return (
    <div className={Styles.tagHolder}>
        <p style={{width:"70px",height:'124.39px',margin:'10px auto'}}><img src={tagimgUrl} style={{height:'100%',width:"100%"}}/></p>
        <p style={{width:"90%",height:'auto',margin:"10px auto"}}>
            <input  value={searchval} placeholder='search for creators' onChange={(event)=>searchCreator(event)} style={{width:'100%',backgroundColor:'rgb(84, 83, 83)',color:'white',boxShadow:'1px 1px 5px rgb(91, 90, 90)',fontFamily:'NexaTextLight',height:'45px',borderRadius:'10px',paddingLeft:'10px',outline:'none',borderWidth:'0px 0px 0px'}}/>
        </p>
        <div style={{width:'100%',marginBottom:'10px',maxHeight:'150px',minHeight:'150px',overflow:'auto'}}>
            {creatorArr===null?<p style={{color:'white',width:'100%',textAlign:"center",marginTop:'25px',fontFamily:"NexaTextLight",fontSize:'20px'}}>Creator not found!</p>:isLoading? arr.map((ar:any)=><p style={{width:'90%',height:"45px",margin:'15px auto',borderRadius:"10px"}}><Skeleton height="100%"  width="100%" radius={10}/></p>):
            <div style={{width:'100%',height:"100%",display:"flex",flexDirection:"column",}}>{
                creatorArr.map((user:any)=>
            
               <div onClick={()=>{}} style={{backgroundColor:'transparent',height:'60px',boxShadow: '1px 1px 5px rgb(91, 90, 90)',borderRadius:'10px',position:'relative',width:'100%',margin:'15px auto'}}>
               <div style={{width:'100%',height:'100%',borderRadius:'10px',backgroundColor:'black',position:'absolute',top:'0px',left:'0px',opacity:'0.25',zIndex:'3'}}></div>
               <div style={{display:'flex',position:'absolute',top:'0px',left:'0px',zIndex:'4',justifyContent:'space-between',padding:"5px",boxSizing:"border-box",alignItems:"center",width:'100%',height:'100%'}}>
                 <p style={{width:'45px',height:'45px',borderRadius:"50%"}}><img src={user.avatarLink} style={{width:'100%',height:"100%",borderRadius:'50%'}}/></p>
                 <div style={{display:'flex',alignItems:'center',justifyContent:"space-around",flexDirection:"column",overflow:'hidden',color:'white',fontFamily:'NexaTextLight'}}>
                   <p>{user.Username}</p>
                   <p>{user.name}</p>
                 </div>
               </div>
             </div>)}</div>}
        </div>
        <p onClick={()=>{setShowTag(null);setTagImgUrl(null);setMoreOptions(false);setItemClicked('')}} style={{width:'70px',cursor:'pointer',boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'NexaTextBold',height:'30px',margin:'10px auto',backgroundColor:'white',color:'black'}}>close</p>
    </div>
  )
}

export default TagOption