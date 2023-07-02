import React, {useState,useEffect} from 'react'
import styles from './HashBrowse.module.css'
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import searchIcon from '../../../iconholder/search.svg'
import HashSkeleton from '@/utils/Skeleton/hashSkeleton';
import HomeButton from '@/utils/pre_auth/homeButton';





 

export default function HashBrowse() {

  const router = useRouter()

  useEffect(()=>{
      const asyncData = async ()=>{
        const res = await fetch(`https://fashion-r-services.onrender.com/content/hashBrowse`,{
    method: 'GET',  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    
        }
    });
    const data = await res.json()

    return data
      }

      const newData = async()=>{
        const data = await asyncData()

        setHashState(data)
      }

      newData()
  },[])

 

  const [hashState,setHashState] = useState<any>(null)
  const [searchValue,setSearchValue] = useState<any>('')
  const [searchLoading,setSearchLoading] = useState<any>(false)
  const [searchResults,setSearchResults] = useState<any>([''])
  const {userHashTags,searchedUserId,setFocusedItem,setUserData,searches} = useRetailContext()
  const originalUrl = "https://example.com/my page?param=value";


  const encodeUri = (searchValue:any)=>{
    const uri = `http://localhost:3000/postauth/Search${searchValue}`

    const hashobj = JSON.stringify({text:searchValue})
    //const encodedUrl = CryptoJS.SHA256(hashobj).toString();
    let a = Math.random()*134
    const parma = a.toString()

    router.push(`./${parma}?message=${searchValue}`)
    //console.log(encodedUrl);
  }


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



 const filterbyHash = async (hash:any)=>{
  let a = Math.random()*134
  const parma = a.toString()
  const hashString = hash.slice(1)
  router.push(`./${parma}?message=${hashString}`)

  }



  return (
      <div style={{width:'100vw',minHeight:'100vh',position:'relative'}}>
        <HomeButton/>
<div style={{width:'100%',display:searchValue===''?'none':'block',backgroundColor:'transparent',WebkitBackdropFilter:'blur(4px)',backdropFilter:'blur(4px)',height:'100%',position:'fixed',top:'0px',left:'0px',zIndex:'150'}}>
          
          </div>

      
<div className={searchValue===''?styles.searchSectionSmall:styles.searchSectionBig}>
            <div className={styles.searchSectionSmallBlur}></div>
           <div style={{position:'absolute',top:'0px',left:'0px',height:'100%',width:"100%",zIndex:'30'}}>
           <p style={{width:'80%',position:'relative',height:'50px',margin:'15px auto',borderRadius:'10px'}}>
              <input value={searchValue} onChange={(event)=>{setSearchValue(event.target.value);onSearhChange(event)}} placeholder='search user contents' style={{width:'100%',fontFamily:'NexaTextLight',color:'black',height:'100%',borderRadius:'10px',paddingLeft:'10px',outline:'none',borderWidth:'0px 0px 0px'}}/>
              <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><img alt='search' src={searchIcon.src}/></span>
            </p>

            <p onClick={()=>encodeUri(searchValue)} style={{padding:'5px 10px',display:searchValue===''?'none':'block',borderRadius:"7px",boxShadow:'1px 1px 5px rgb(91, 90, 90)',width:'fit-content',margin:'10px auto',height:'auto',backgroundColor:'white',color:'black',letterSpacing:'2px',fontFamily:"NexaTextLight"}}>Enter</p>
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

        </div>
          {hashState?
            <div style={{width:'100vw',height:'auto',marginTop:'100px',display:'flex',alignItems:'center',justifyContent:"center"}}>
            <div className={styles.elementHolder}>
            {hashState.map((d:any)=>
              < div className={styles.hashMap}>
                
                <div style={{display:'flex',borderRadius:'10px',position:"relative",overflow:'hidden',backgroundColor: `${d?.backgroundColor}`,height:'100%',width:'100%'}}>
            <div style={{position:'absolute',borderRadius:'5px',height:'88.9px',zIndex:'100',width:'50px',boxShadow:'1px 1px 5px rgb(91, 90, 90)',bottom:'0px',right:'0px',transform:'rotate(45deg)'}}>
                <img src={d?.imageLink} style={{position:'absolute',borderRadius:'5px',height:'100%',width:"100%",top:'0px',left:"0px"}}/>
            </div>
            <p onClick={()=>filterbyHash(d.hash)} style={{position:'absolute',zIndex:'200',top:'0px',left:'0px',height:'100%',width:'100%',padding:'5px',paddingLeft:'10px',fontFamily:'NexaTextBold',fontSize:'20px',letterSpacing:'1.5px',color:'white'}}>{d?.hash}</p>
            </div>
              </ div>
                      )
            }
      
            </div>
          </div>:<HashSkeleton/>}
      </div>
  )
}
