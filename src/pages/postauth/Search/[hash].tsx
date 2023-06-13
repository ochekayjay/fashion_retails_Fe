import React, {useState,useEffect,useRef} from 'react'
import styles from './HashBrowse.module.css'
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import searchIcon from '../../../iconholder/search.svg'
import Image from 'next/image'
import addIcon from '../../../iconholder/addIcon.svg'
import editIcon from '../../../iconholder/editIcon.svg'
import likeIcon from '../../../iconholder/like.svg'
import tagIcon from '../../../iconholder/tag.svg'
import shareIcon from '../../../iconholder/share.svg'
import bookmarkIcon from '../../../iconholder/bookmark.svg'
import smalleditIcon from '../../../iconholder/smallEditIcon.svg'
import smalldeleteicon from '../../../iconholder/smallDeleteIcon.svg'
import rowIcon from '../../../iconholder/rows.svg'
import columnIcon from '../../../iconholder/column.svg'
import collectionIcon from '../../../iconholder/bookmarkCollection.svg'
import moreIcon from '../../../iconholder/moreIcon.svg'
import useWindowResize from '@/utils/windowdimension'



 

export default function HashDynamics() {

  const router = useRouter()
  const {width,height} = useWindowResize()
  const [hashState,setHashState] = useState<any>(null)
  const [searchValue,setSearchValue] = useState<any>('')
  const [searchLoading,setSearchLoading] = useState<any>(false)
  const [searchResults,setSearchResults] = useState<any>([''])
  const [displayData,setDisplayData] = useState<any>(null)
  const {userHashTags,searchedUserId,setFocusedItem,setUserData,searches,id} = useRetailContext()
  const imageHolderRef = useRef<HTMLDivElement>(null)
  const [imgHeight,setImgHeight] = useState<any>(0)
  const [mainContentDiv, setMainContentDiv] = useState<boolean>(true)
  const [moreOptions,setMoreOptions] = useState<any>(false)
  const [itemClicked,setItemClicked] = useState<any>('')
  const [determineBlur,setDetermineBlur] = useState<boolean>(false)
  const [firstLoad,setFirstLoad] = useState<any>(true)
  const { query: { message, hash } } = router



  useEffect(()=>{
    
    console.log(router.pathname)
    console.log(message)
    console.log(hash)
    const storedhash = window.sessionStorage.getItem(`hash${hash}`)

    if(!storedhash || storedhash!== hash){
        if(typeof message==='string' && typeof hash === 'string'){
            window.sessionStorage.setItem(`hash${hash}`,hash)
            window.sessionStorage.setItem(`message${message}`,message)
        }

        const dataFunc = async()=>{
            let fetchData = await fetch(`https://fashion-r-services.onrender.com/content/allSearchWithImg?message=${message}`,{
                method: 'GET',  
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
            
                    }
                });
        
                let newfetch  = await fetchData.json()
        
                if(newfetch.state){
                    setDisplayData(newfetch.UserSearch)
                    window.sessionStorage.setItem(`obj${hash}`,JSON.stringify(newfetch.UserSearch))
                    setSearchLoading(false)
                    let fetchedData = window.sessionStorage.getItem(`obj${hash}`)
                    if(typeof fetchedData === 'string'){
                        fetchedData = JSON.parse(fetchedData)
                    console.log(fetchedData)
                    }
                    
                }
                else{
                  setSearchLoading(true)
                }
            
        }

        dataFunc()
    }

    else{
        console.log('in here fixing')
        let fetchedData = window.sessionStorage.getItem(`obj${hash}`)
        if(typeof fetchedData === 'string'){
            fetchedData = JSON.parse(fetchedData)
            setDisplayData(fetchedData)
        }
        
    }
   

  },[message,hash])







  const onSearhChange = async(event:any)=>{
    setSearchLoading(true)

    
      let fetchData = await fetch(`https://fashion-r-services.onrender.com/content/allSearch?message=${event.target.value}`,{
        method: 'GET',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
    
            }
        });

        let newfetch  = await fetchData.json()

        if(newfetch.state){
            setSearchResults(newfetch.textdata)
            setSearchLoading(false)
        }
        else{
          setSearchLoading(true)
        }
    
     
  }


  const enterSearchdata = async(Id:any)=>{
      
    const data = await fetch(`https://fashion-r-services.onrender.com/content/user/singlecontent/${Id}`,{
     method: 'GET',  
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
   
 
         }
     });

     const newdata = await data.json()
     console.log(newdata)
     setFocusedItem(newdata.content)
     setUserData(newdata.userDetail)
     router.push(`../Project/${Id}`)
 }



 useEffect(()=>{
  
    if(imageHolderRef?.current){
  
      
      const height = imageHolderRef.current?.offsetWidth*1.777
  
      setImgHeight(height)
    }
  },[mainContentDiv,displayData])



  
  const encodeUri = (searchValue:any)=>{
    

    const hashobj = JSON.stringify({text:searchValue})
    //const encodedUrl = CryptoJS.SHA256(hashobj).toString();
    let a = Math.random()*134
    const parma = a.toString()

    router.push(`./${parma}?message=${searchValue}`)
    //console.log(encodedUrl);
  }

useEffect(()=>{
        if(searchValue!==''){
            setDetermineBlur(true)
        }
        else{
            setDetermineBlur(false)
        }
},[searchValue])


  return (
      <div style={{width:'100vw',minHeight:'100vh',position:'relative'}}>

<div style={{width:'100%',display:determineBlur===false?'none':'block',backgroundColor:'transparent',backdropFilter:'blur(4px)',height:'100%',position:'fixed',top:'0px',left:'0px',zIndex:'150'}}>
          
          </div>

      
<div className={determineBlur===false?styles.searchSectionSmall:styles.searchSectionBig}>
            <div className={styles.searchSectionSmallBlur}></div>
           <div style={{position:'absolute',top:'0px',left:'0px',height:'100%',width:"100%",zIndex:'30'}}>
           <p style={{width:'80%',position:'relative',height:'50px',margin:'15px auto',borderRadius:'10px'}}>
              <input value={searchValue} onChange={(event)=>{setSearchValue(event.target.value);onSearhChange(event)}} placeholder='search user contents' style={{width:'100%',fontFamily:'NexaTextLight',color:'black',height:'100%',borderRadius:'10px',paddingLeft:'10px',outline:'none',borderWidth:'0px 0px 0px'}}/>
              <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><img alt='search' src={searchIcon.src}/></span>
            </p>

            <p onClick={()=>{setDetermineBlur(false); encodeUri(searchValue)}}  style={{padding:'5px 10px',display:determineBlur===false?'none':'block',borderRadius:"7px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',width:'fit-content',margin:'10px auto',height:'auto',backgroundColor:'white',color:'black',letterSpacing:'2px',fontFamily:"NexaTextLight"}}>Enter</p>
            <div style={{width:'100%',height:'auto',display:determineBlur===false?'none':'block',padding:'15px'}}>
                <div style={{width:'80%',margin:'auto',backgroundColor:'white ',minHeight:'50px',maxHeight:'250px',overflow:'auto',borderRadius:'10px',display:'flex',alignItems:"center",justifyContent:"center"}}>
                    {searchLoading?<Loader color="black" size="sm" variant="bars" />:
                    <div style={{width:'100%',padding:'5px',height:'auto',}}>
                        {searchResults.map((result:any)=>
                        <div onClick={()=>enterSearchdata(result._id)} style={{height:'60px',border:searchResults.indexOf(result)===searchResults.length-1?"":'1px solid black',borderWidth:searchResults.indexOf(result)===searchResults.length-1?"0px 0px 0px":'0px 0px 1px',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column'}}>
                            <p style={{fontFamily:'NexaTextBold',fontSize:'20px'}}>{result.title}</p>
                    
                        </div>)}
                    </div>}
                </div>
            </div>
           </div>

        </div>
        {displayData?<section style={{width:width>1100?'65%':'100%',minHeight:width>1100?'100vh':'75vh',marginTop:'100px'}}>
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
            {displayData.map((d:any)=><div ref={imageHolderRef} style={mainContentDiv? {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(displayData.indexOf(d)+2)%2===0?'column':'column-reverse'}:
                   
                   {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(displayData.indexOf(d)+2)%2===0?'column':'column-reverse',width:width*0.8,margin:'0px auto'}}>

              <div onClick={()=>{setFocusedItem(d);router.push(`../Project/${d._id}`)}} style={{width:'100%',height:imgHeight,position:'relative'}}>
                  <Image fill={true}  quality={100} src={d.imageLink} alt={d.title} style={{width:'100%',objectFit:'cover',height:'100%'}}/>
              </div>
            
              {moreOptions && d._id===itemClicked? <div className={styles.moreItem}>
                <div onClick={()=>{setFocusedItem(d);router.push('./editProject')}} style={{display:id===null || id!==d.creator?"none":'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Edit</p><p style={{width:"20px",height:'20px'}}><Image src={smalleditIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
                <div style={{display:id===null || id!==d.creator?"none":'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Delete</p><p style={{width:"20px",height:'20px'}}><Image src={smalldeleteicon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
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
        </section>: <p>i would work</p>}
      </div>
  )
}
