import React, {useState,useRef,useEffect} from 'react'
import useWindowResize from '@/utils/windowdimension';
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';
import searchIcon from '../../../iconholder/search.svg'
import styles from './SearchUserContent.module.css'
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
import { Loader } from '@mantine/core';
import Image from 'next/image';

function SearchUserContent() {
    const router = useRouter()
    const {width,height} = useWindowResize()
    const {userHashTags,searchedUserId,setFocusedItem,setUserData,searches} = useRetailContext()
    const [isLoading,setIsLoading] = useState<any>(false)
    const [searchgalleryData,setSearchGalleryData] = useState<any>([''])
    const [mainContentDiv, setMainContentDiv] = useState<boolean>(true)
    const [moreOptions,setMoreOptions] = useState<any>(false)
    const imageHolderRef = useRef<HTMLDivElement>(null)
    const [itemClicked,setItemClicked] = useState<any>('')
    const [imgHeight,setImgHeight] = useState<any>(0)
    const [searchLoading,setSearchLoading] = useState<any>(false)
    const [searchValue,setSearchValue] = useState<any>('')
    const [searchResults,setSearchResults] = useState<any>([''])
    const [tokenString,setTokenString] = useState<any>('')


    useEffect(()=>{
     
      

      if(router.isReady){
        console.log('search page')
        console.log(router.pathname)
  
      }
  
      else{
        console.log('search page not ready')
        console.log(router.pathname)
      }


      const token = window.localStorage.getItem('token')
      setTokenString(token)

      if(searches){

        setSearchGalleryData(searches)
      }
      
    },[])






    const filterbyHash = async (hash:any)=>{
      console.log(searchedUserId)
      const hashed = `%23${hash.slice(1)}`
      setIsLoading(true)
      const projects = await fetch(`https://fashion-r-services.onrender.com/content/user/hashtag?creator=${searchedUserId}&hashtag=${hashed}`,{
        method: 'GET',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
    
            }
        });
        
      const searchCollect = await projects.json()
      console.log(searchCollect)
      if(searchCollect.userImages.length>=1){
        console.log('works')
        setSearchGalleryData(searchCollect.userImages)
        setIsLoading(false)
      }

      else{
        console.log('cant work')
        setIsLoading(false)
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

    const onSearhChange = async(event:any)=>{
      setSearchLoading(true)

      if(!searchedUserId){
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

      else{
        let fetchData = await fetch(`https://fashion-r-services.onrender.com/content/user/search/${searchedUserId}?message=${event.target.value}`,{
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
       
    }



    useEffect(()=>{
      console.log('a in userp')
      if(imageHolderRef?.current){
    
        console.log('b in userp')
        const height = imageHolderRef.current?.offsetWidth*1.777
    
        setImgHeight(height)
      }
    },[mainContentDiv,searchgalleryData,mainContentDiv])



    
  return (
    <div style={{width:'100%',minHeight:'100vh',position:'relative'}}>
        <div style={{width:'100%',display:searchValue===''?'none':'block',backgroundColor:'transparent',backdropFilter:'blur(4px)',height:'100%',position:'fixed',top:'0px',left:'0px',zIndex:'150'}}>
          
        </div>
        
        <div className={searchValue===''?styles.searchSectionSmall:styles.searchSectionBig}>
            <p style={{width:'80%',position:'relative',height:'50px',margin:'15px auto',borderRadius:'10px'}}>
              <input value={searchValue} onChange={(event)=>{setSearchValue(event.target.value);onSearhChange(event)}} placeholder='search user contents' style={{width:'100%',fontFamily:'NexaTextLight',color:'black',height:'100%',borderRadius:'10px',paddingLeft:'10px',outline:'none',borderWidth:'0px 0px 0px'}}/>
              <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><Image alt='search' src={searchIcon}/></span>
            </p>
            <div style={{width:'100%',height:'auto',display:searchValue===''?'none':'block',padding:'15px'}}>
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

        {isLoading && searchgalleryData[0]===''?
        <div style={{width:'90%',height:'150px',backgroundColor:'white',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:'1',borderRadius:'15px',boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Loader color="black" size="sm" variant="bars" />
        </div>: searchgalleryData[0]==='' && isLoading===false?
        <div style={{display:userHashTags?'block':'null',width:'90%',height:'auto',backgroundColor:'white',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:'1',borderRadius:'15px',boxShadow:'1px 1px 5px rgb(91, 90, 90)'}}>
        {userHashTags?.map((hash:any)=><p onClick={()=> filterbyHash(hash)} style={{width:'100%',color:'black',fontFamily:'NexaTextBold',fontSize:'20px',margin:'10px 0px 0px',height:'40px',display:'flex',alignItems:"center",justifyContent:"left",paddingLeft:'20px',border:userHashTags.indexOf(hash)===userHashTags.length-1?'': '1px solid black',borderWidth:userHashTags.indexOf(hash)===userHashTags.length-1?"0px 0px 0px":'0px 0px 1px'}}>{hash}</p>)}
        </div>:
        <section style={{width:width>1100?'65%':'100%',height:'auto',marginTop:'100px'}}>
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
          {searchgalleryData.map((d:any)=><div ref={imageHolderRef} style={mainContentDiv? {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(searchgalleryData.indexOf(d)+2)%2===0?'column':'column-reverse'}:
                                                                                      {display:'flex',position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',backgroundColor:d.backgroundColor,height:'auto',flexDirection:(searchgalleryData.indexOf(d)+2)%2===0?'column':'column-reverse',width:width*0.8,margin:'0px auto'}}>
            <div onClick={()=>{setFocusedItem(d);router.push(`../Project/${d._id}`)}} style={{width:'100%',height:imgHeight,position:'relative'}}>
                <Image fill={true}  quality={100} src={d.imageLink} alt={d.title} style={{width:'100%',objectFit:'cover',height:'100%'}}/>
            </div>
            {moreOptions && d._id===itemClicked? <div className={styles.moreItem}>
              <div onClick={()=>{setFocusedItem(d);router.push('../UserPrivates/editProject')}} style={{display:'flex',justifyContent:'space-between',width:'100%',margin:'10px 0px'}}><p>Edit</p><p style={{width:"20px",height:'20px'}}><Image src={smalleditIcon} alt='' style={{width:"100%",height:'100%'}}/></p></div>
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
      </section>}
    </div>
  )
}

export default SearchUserContent