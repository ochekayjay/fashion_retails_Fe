import React, {useEffect,useState,useRef} from 'react'
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useWindowResize from '@/utils/windowdimension';
import { Loader } from '@mantine/core';
import addIcon from '../../../iconholder/addIcon.svg'
import styles from './CreateProject.module.css'
import editIcon from '../../../iconholder/editIcon.svg'
import imageicon from '../../../iconholder/imageIcon.svg'
import dropDown from '../../../iconholder/drop_down.svg'
import dropRight from '../../../iconholder/drop_right.svg'
import addItem from '../../../iconholder/addItem.svg'
import closeItem from '../../../iconholder/closeItem.svg'
import ImageCropper from '@/utils/pre_auth/imageCropper';
import ColorThief from "color-thief-ts"
import MainCrop from './ProjectCrop/mainCrop';
import { ListItemArray } from '@/utils/itemArray';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'

/**
 * 
 * @returns 
export async function getServerSideProps(context:any) {
    const { query } = context;
    // Fetch data from external API
    console.log(query)
    const id = query?.id
    const token = query?.token
    console.log(`${id} case one fixed`)
    console.log(`${token} case two fixed`)
  
    //https://fashion-r-services.onrender.com
    //http://localhost:5005
    if(token){
      console.log('new but fixed latest')
      const res = await fetch(`https://fashion-r-services.onrender.com/creator/personal/${id}`,{
      method: 'GET',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
          }
      });
      const data = await res.json()

      //console.log(data)
      
    return { props: {data} };
    }
  
    else {
      console.log('new here latest')
      const data = null
      return { props: { data} };
    }
    
   
    // Pass data to the page via props
    
  }
 */


export default function CreateProject() {


    const draggableRefOne = useRef<HTMLParagraphElement>(null);
    const draggableRefTwo = useRef<HTMLParagraphElement>(null);
    const draggableRefThree = useRef<HTMLParagraphElement>(null);
    const draggableRefFour = useRef<HTMLParagraphElement>(null);
    const draggableRefFive = useRef<HTMLParagraphElement>(null);
    const mainHolder  = useRef<HTMLParagraphElement>(null);
    const droppableRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [currentRef,setCurrentRef] = useState<any>()
  const [showAvatar,setShowAvatar] = useState(false)
  const [shownormal,setshowNormal] = useState(true)
  const [userId, setUserId] = useState<any>('')
  const router = useRouter()
  const [datachecker,setDataChecker] = useState(false)
  const {width,height} = useWindowResize()
  const {viewmobile,setViewMobile,signed,username,avatarUrl,setAvatarUrl,setUsername,setName} = useRetailContext()
  const bioValue = 'Lorem Ipsum is simply dummy text of the printing and tyIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
  const [file,setFile] = useState<any>('')
  const [ImageUrl,setImageUrl] = useState<any>('')
  const [dominantColor, setDominantColor] = useState<any>(null);
  const [cropImage, setCropImage] = useState(false)
  const [cropImageUrl,setCroppedImageurl] = useState('')
  const [newAvatar, setNewAvatar] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sectionToShow, setSectionToShow] = useState<any>() 
  const [openBigDiv,setOpenBigDiv] = useState<boolean>(false)
  const [newName,setNewName] = useState('')

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [numberDisplay,setNumbDisplay] = useState(false)
  const [itemNumber,setItemNumber] = useState(0)
  const [popDistance,setPopDistance] = useState<any>({x:0,y:0})
  const [itemArray,setItemArray] = useState<any>([...ListItemArray])
  const [pTagArray,setPTagArray] = useState<any>([])
  const [itemPop,setItemPop] = useState<any>(false)
  const [hashtagHold,setHashtagHold] = useState<any>('')



  const [enlistUserObj,setEnlistUserObj] = useState<any>({
    title:"",
    projectDescription: "",
    hashtag:"",
    avatarUrl:'',
})



const [imgSrc, setImgSrc] = useState('')
const [crop, setCrop] = useState<Crop>()
const [aspect, setAspect] = useState<number | undefined>(9 / 16)
const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
const [newPIUrl, setNewPIUrl] = useState('')
const previewCanvasRef = useRef<HTMLCanvasElement>(null)
const [firstImage,setFirstImage] = useState('')
const firstImageRef = useRef<HTMLInputElement>(null)
const [touchTimeout, setTouchTimeout] = useState<any>(null);


const itemIds = ['refOne','refTwo','refThree','refFour','refFive']


// drag details here

//referene array
const reffs = [draggableRefOne,draggableRefTwo,draggableRefThree,draggableRefFour,draggableRefFive]
//elements
const elements = [1,2,3,4,5]
// drag functions



//Touch events

const handleTouchStart = (e:any) => {
  const touch = e.touches[0];
  if(itemNumber!==5 && numberDisplay===false){
    const toucherX = touch.clientX
    const toucherY = touch.clientY

    if(mainHolder.current){
      const leftOne = mainHolder.current.offsetLeft
      const topOne = mainHolder.current.offsetTop
      const leftValue = toucherX-leftOne - 40;
      const topValue = toucherY + window.scrollY -topOne - 40 ;

      setTouchTimeout(setTimeout(() => {
        setTouchStartX(touch.clientX)
        setTouchStartY(touch.clientY)
        setPopDistance({x:leftValue,y:topValue})
        setItemNumber(()=>itemNumber+1)
        setItemPop(false)
        setNumbDisplay(true);
      }, 700));
    }
    /*setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);*/
  }
  
};


const handleTouchEnd = () => {
    clearTimeout(touchTimeout);
    
  };

  useEffect(() => {
    return () => {
      clearTimeout(touchTimeout); 
    };
  }, [touchTimeout]);



const clearHistoricalData = ()=>{
  if(firstImageRef.current){
    firstImageRef.current.value = ''
  }
  setItemPop(false)
  setItemNumber(0)

}

const saveNewNumber = (id:any)=>{

if(mainHolder.current){

  let itemHolder = [...itemArray]


 

  const { top, left } = mainHolder.current.getBoundingClientRect()!;
 
  const leftOne = mainHolder.current.offsetLeft
  const topOne = mainHolder.current.offsetTop
        const leftValue = touchStartX-leftOne-12.5;
        const topValue = touchStartY + window.scrollY -topOne-12.5;


        const dat = {...itemHolder[id-1],itemNumber:id,verified:false,distance : {x:leftValue/mainHolder.current.offsetWidth,y:topValue/mainHolder.current.offsetHeight}}
        
        itemHolder[id-1] = dat
        
        
        const pData = {value:`${itemNumber}`,key:itemIds[id-1],justifyContent : "center",alignItems : 'center',display : 'flex',color:"white",boxShadow : '1px 1px 5px rgb(91, 90, 90)',position:'absolute',width:'25px',height:'25px',top:`${topValue}px`,left:`${leftValue}px`,borderRadius:'50%',backgroundColor:'black'}
     
        setPTagArray(()=>[...pTagArray,pData])
        setItemArray(itemHolder)
        setItemPop(true)
        setNumbDisplay(false)
        //droppableRef.current!.appendChild(pTag);
}
}





 








  const handleDragStart = (id:any)=>(e:any) => {
    
    const { offsetLeft, offsetTop } = reffs[id-1].current!;
        const x = e.clientX - offsetLeft;
        const y = e.clientY - offsetTop;
        setOffset({ x, y });
        setCurrentRef(reffs[id-1])
        setIsDragging(true);         
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
  };

  const handleDrop = (e:any) => {
    e.preventDefault();

 
    if(droppableRef.current){
      const { top, left } = droppableRef.current.getBoundingClientRect()!;
      const x = e.clientX - left - 12.5;
      const y = e.clientY - top - 12.5;
   
      if(currentRef?.current){
          currentRef.current.style.left = `${x}px`;
          currentRef.current.style.top = `${y}px`;
          droppableRef.current!.appendChild(currentRef.current!);
      }
    }
   
  };


    const handleDragEnd = () => {
    setIsDragging(false);
  };


  const controlSectionShown = (element:any)=>{
    if(element==sectionToShow){
      setOpenBigDiv(false)
      setSectionToShow('')
    }
    else{
      setOpenBigDiv(true)
      setSectionToShow(element)
    }
  }






// crop details
const onCrop = ()=>{
  handleUpload(previewCanvasRef)
  setCropImage(false) 

}

const onCancel = ()=>{
  setCropImage(false) 
  setCompletedCrop(undefined)
  if(firstImageRef.current){
    firstImageRef.current.value = ''
  }
  
  setCrop(undefined)
}

const extractColor = async(url:string)=>{
  const colorThief = new ColorThief();
  const dominantColor = await colorThief.getColorAsync(url);
  
  setDominantColor(dominantColor);

  
  }
  


  useEffect(()=>{
     if(firstImage!== ''){
      extractColor(firstImage)
     }
  },[imgSrc])

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}


function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
  if (e.target.files && e.target.files.length > 0) {
      const avatarpath = URL.createObjectURL(e.target.files[0])
      setFirstImage(avatarpath)
    setCrop(undefined) // Makes crop preview update between images.
    setPTagArray([])
    const reader = new FileReader()
    reader.addEventListener('load', () =>
      setImgSrc(reader.result?.toString() || ''),
    )
    reader.readAsDataURL(e.target.files[0])
    setCropImage(true)
  }
}


function handleUpload(canvasRef:any) {
  const canvas = canvasRef.current;
  canvas.toBlob((blob:any) => {
    const file = new File([blob], 'filename.png', { type: 'image/jpg' });; // 'filename.png' specifies the desired filename
    setFile(file)
 
  });
}
const updateUserObj = (event:any)=>{

    setEnlistUserObj({...enlistUserObj,...{[event.target.name] : event.target.value}})
    
    
}


const updateHashtag = (event:any)=>{
  const hashArray = event.target.value
  const hashholder  = hashArray.split(" ")
  console.log(hashholder)
  //const newer = hashholder.split(',')
  setHashtagHold(event.target.value)
  console.log(enlistUserObj.hashtag)
  
  setEnlistUserObj({...enlistUserObj, hashtag : hashholder})   
}

const updateList =  (event:any,id:any)=>{
  let itemH = [...itemArray]
    const dat = {...itemH[id],[event.target.name] : event.target.value}
    itemH[id] = dat
    
  setItemArray(itemH) 
}


/*const onCancel = ()=>{
        
  setCropImage(false)
}
*/


const submitUserInfo = async (event:any,enlistUserObj:any,itemArray:any)=>{
  event.preventDefault()
const formData = new FormData()
  const token = window.localStorage.getItem('token')
  setIsLoading(true)
  
  formData.append('title',enlistUserObj.title)
  formData.append('projectDescription',enlistUserObj.projectDescription)
  formData.append('hashtag',enlistUserObj.hashtag)
  formData.append('itemArray',JSON.stringify(itemArray))
  file!==''?formData.append('backgroundColor',dominantColor): ""
  file!==''?formData.append('avatar',file): ""
 

const withImage = {method: 'POST',headers:{'Accept': '*/*',Authorization: `Bearer ${token}`}}
const withoutImage = {method: 'POST',headers:{'Accept': 'application/json','Content-Type': 'application/json',Authorization: `Bearer ${token}`}}

  //'https://fashion-r-services.onrender.com/creator/editProfile
  if(file!==''){

    const formDataObject = Object.fromEntries(formData.entries());

    const createdCreator =  await fetch('https://fashion-r-services.onrender.com/content/creation', {...withImage,body:formData});

    if(createdCreator){
      
        setIsLoading(false)
    }
   
  }
  else{

    const formDataObject = Object.fromEntries(formData.entries());

    console.log(formDataObject);
    
  } 

}




//useEffect for refreshing site and setting states to be edited
  /**
   *   useEffect(()=>{
      //setDataChecker(data)
      //setNewName(data?.name)
        if(typeof window !== 'undefined'){
          //setDataChecker(data)
          //setNewName(data?.name)
          console.log('abc')
          const id = window.localStorage.getItem('id');
          console.log(data)
          if(data !== null){
            console.log('def')
            console.log(data.name)
            const dat = {...enlistUserObj,name :data.name}
            setUserId(id)
            setAvatarUrl(data.avatarLink)
            setUsername(data.Username)
            setName(data.name)
            setEnlistUserObj({...enlistUserObj,bio:data?.bio,hashtag:data?.hashtag,name :data.name})
            //setEnlistUserObj({...enlistUserObj,bio : data?.bio})
            //setEnlistUserObj({...enlistUserObj,hashtags : data?.hashtags})
          }
        
          else if(data!==null){
            console.log('manifesting...')
            const {name} = data
            //setDataChecker(true)
          }
          else{
            console.log('ghi')
            const id = window.localStorage.getItem('id');
            console.log(id)
            const token = window.localStorage.getItem('token')
            const queryParam = token ? `?id=${id}&token=${token}` : '';
            router.push(`../../postauth/UserPrivates/editProfile${queryParam}`)
          }
        }
            
          },[])
   */

        /**
         *   useEffect(()=>{

            if(data !== null){
              console.log('def')
              console.log(data)
              const dat = {...enlistUserObj,name :data.name}
              setDominantColor(data.color)
              setAvatarUrl(data.avatarLink)
              setUsername(data.Username)
              setName(data.name)
              setEnlistUserObj({...enlistUserObj,bio:data?.bio,hashtag:data?.hashtag,name :data.name,avatarUrl:data.avatarLink})
              //setEnlistUserObj({...enlistUserObj,bio : data?.bio})
              //setEnlistUserObj({...enlistUserObj,hashtags : data?.hashtags})
            }
        
            
          },[data])
         */


          /**
           * 
          useEffect(()=>{
            if(datachecker===true){
              setName(data.name)
            }
          },[datachecker])
           */

        //effect to be display crop section and get dominant colors
           useEffect( ()=>{
            const extractColor = async(url:string)=>{
            const colorThief = new ColorThief();
            const dominantColor = await colorThief.getColorAsync(url);
            setDominantColor(dominantColor);
            setCropImage(!cropImage)
            setShowImage(!showImage)
            
            }
            extractColor(cropImageUrl)
        },[cropImageUrl])
          

        //router.back()


        //enlistUserObj.bio!==''?enlistUserObj.bio:data!==null?data.bio:''

  return (
    <div style={{width:'100vw',minHeight:'100vh',display:'flex',position:'relative',alignItems:"center",justifyContent:'center',padding:width>500?'30px 0px':'0px'}}>
      {cropImage && <MainCrop imgSrc={imgSrc} onCancel={onCancel} onCrop={onCrop} firstImageRef={firstImageRef} handleUpload={handleUpload} previewCanvasRef={previewCanvasRef} setNewPIUrl={setNewPIUrl} setImgSrc={setImgSrc} completedCrop={completedCrop} setCompletedCrop={setCompletedCrop} crop={crop} setCrop={setCrop} setCropImage={setCropImage} aspect={aspect}/>}
        <section style={{width:width>500?'auto':'100%',height:width>500?'auto':'100%',padding:'15px',backgroundImage: `linear-gradient(to bottom , ${dominantColor},white)`,boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:width>500?"15px":'',paddingTop:width>500?'30px':'80px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
            {width<500 && <p onClick={()=>router.back()} style={{position:'absolute',cursor:'pointer', top:'15px',left:width*0.10,padding:'10px 15px',backgroundColor:'white',borderRadius:'10px'}}>back</p>}
            {width<1000 && completedCrop? <div style={{width:'95%',margin:'30px auto',display:'flex',padding:"5px 0px",backgroundColor:'white',justifyContent:'center',alignItems:"center"}}>
              <p style={{textAlign:"center",fontSize:'11px',fontFamily:'NexaTextLight',color:'black',borderRadius:'10px',opacity:'0.6'}}>5 maximum items!, hold point down to highlight item</p> 
             </div>: ''
            }
            <div ref={mainHolder}  style={{height:width>500?"622.2222px":width*1.4222,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',backgroundColor:"white",marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
                {completedCrop?
                    <>

{itemPop && <div style={{position:'fixed',zIndex:'10000',height:'auto',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'250px',}}>
                  <div className={styles.popupInner}>
                      <p style={{width:'80%',textAlign:"center",margin:'15px auto',fontFamily:"NexaTextBold",fontSize:'18px'}}>Item{` ${itemNumber}`}</p>
                      <div style={{width:'80%',height:'40px',margin:'15px auto'}}>
                          <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Email &nbsp; <span style={{color:'red'}}>*</span></p>
                          <input value={itemArray[itemNumber-1]?.Email} placeholder='user@gmail.com' type='email' name='Email' onChange={(event)=>{updateList(event,itemNumber-1)}} className={styles.forminputPop}/>
                      </div>
                      <div style={{width:'80%',height:'40px',margin:'15px auto'}}>
                          <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Item Name &nbsp; <span style={{color:'red'}}>*</span></p>
                          <input  value={itemArray[itemNumber-1]?.itemName} placeholder='sweatshirt' type='text' name='itemName' onChange={(event)=>{updateList(event,itemNumber-1)}} className={ styles.forminputPop}/>
                      </div>
                      <div style={{width:'80%',height:'40px',margin:'15px auto'}}>
                          <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Company &nbsp; <span style={{color:'red'}}>*</span></p>
                          <input value={itemArray[itemNumber-1]?.companyName} placeholder='Jayy Retails' type='text' name='companyName' onChange={(event)=>{updateList(event,itemNumber-1)}} className={styles.forminputPop}/>
                      </div>
                      <div style={{width:'80%',height:'40px',margin:'15px auto'}}>
                          <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Phone &nbsp; <span style={{color:'red'}}>*</span></p>
                          <input value={itemArray[itemNumber-1]?.Phone} placeholder='+334' type='text' name='Phone' onChange={(event)=>{updateList(event,itemNumber-1)}} className={styles.forminputPop}/>
                      </div>
                      <div style={{width:'80%',height:'40px',margin:'15px auto'}}>
                          <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Delivery &nbsp; <span style={{color:'red'}}>*</span></p>
                          <input value={itemArray[itemNumber-1]?.Delivery} placeholder='all over the country' type='text' name='Delivery' onChange={(event)=>{updateList(event,itemNumber-1)}} className={styles.forminputPop}/>
                      </div>
                      <div style={{width:'80%',height:'40px',margin:'15px auto'}}>
                          <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Business Link &nbsp; <span style={{color:'red'}}>*</span></p>
                          <input value={itemArray[itemNumber-1]?.link} placeholder='instagram/pinterest/website' type='text' name='link' onChange={(event)=>{updateList(event,itemNumber-1)}} className={styles.forminputPop}/>
                      </div>

                      <p onClick={()=>setItemPop(false)} style={{margin:'15px auto',width:'auto',padding:'5px 10px',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'white',color:'black'}}>close</p>
                  </div>
              </div>
                      
                    }
                    <div ref={droppableRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
                    onDragOver={handleDragOver} onDrop={handleDrop}  style={{width:"100%",position:'absolute',backgroundColor:"transparent",zIndex:10,top:'0px',left:'0px',height:"100%"}}>
                    {pTagArray.map((P:any)=>
                      <p key={P.key} style={{justifyContent :P.justifyContent,zIndex:10,alignItems :P.alignItems,display :P.display,color:P.color,boxShadow : P.boxShadow,position:P.position,width:P.width,height:P.height,top:P.top,left:P.left,borderRadius:P.borderRadius,backgroundColor:P.backgroundColor}}>{P.value}</p>)
                      }
                      {numberDisplay && <div  style={{width:'100px',height:'100px',position:'absolute',top:popDistance.y,left:popDistance.x,boxShadow: '1px 1px 5px rgb(91, 90, 90)',borderRadius:'10px',backgroundColor:'black',color:'white'}}>
                      <div style={{width:'100%',position:'absolute',borderRadius:'10px',top:'0px',left:'0px',zIndex:'4',height:'100%',display:'flex',alignItems:"center",justifyContent:"space-around",flexDirection:'column'}}>
                        <div style={{textAlign:"center"}}>{itemNumber}</div>
                        <div style={{margin:'10px auto',width:'95%',display:"flex",justifyContent:'space-around',alignItems:"center"}}>
                          
                          <p onClick={()=>saveNewNumber(itemNumber)} style={{width:'auto',height:"auto",padding:"3px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:'50%',backgroundColor:"white",boxShadow: '1px 1px 5px rgb(91, 90, 90)'}}>
                            <Image alt=''  src={addItem} style={{width:"20px",height:'20px'}}/>
                          </p>
                          <p onClick={()=>{setNumbDisplay(false);setItemNumber(()=>itemNumber-1)}} style={{width:'auto',display:"flex",justifyContent:"center",alignItems:"center",height:"auto",padding:"3px",textAlign:"center",borderRadius:'50%',backgroundColor:"white",boxShadow: '1px 1px 5px rgb(91, 90, 90)'}}>
                            <Image alt=''  src={closeItem} style={{width:"20px",height:'20px'}}/>
                          </p>
                        </div>
                      </div>
                    </div>}

                    
                    </div>
                    <div style={{width:'100%',height:'100%',position:'relative'}}>
                    
                    <canvas ref={previewCanvasRef} style={{width:'100%',height:'100%',padding:"0px",objectFit:"cover",borderRadius:'15px',position:'relative'}}/>
                    
                    
                    </div>
                    </>
                    :
                    ''
                    }
    
                <input type='file'id='avatar' ref={firstImageRef} name='avatar' style={{display:'none'}} accept="image/*" onChange={onSelectFile} />
                <label htmlFor= 'avatar' className={completedCrop?styles.labelCropComplete:styles.labelCropIncomplete} >
                      {!completedCrop && <p style={{textAlign:"center",marginBottom:"15px"}}>Create Project</p>}
                      <Image onClick={clearHistoricalData} src={!completedCrop? imageicon: editIcon} alt='' style={{width:"24px",height:'24px'}}/>
                </label>
            </div>
            
            { width>1000 && <div style={{width:'auto',height:'auto',margin:'40px auto',display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <p style={{fontFamily:'NexaTextLight',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'center'}}>Drag numbers to selected item</p>
            <div style={{position:"relative",boxShadow:'1px 1px 5px rgb(91, 90, 90)',width:"275px",height:"45px",margin:'10px auto',backgroundColor:"white",borderRadius:"15px"}}>
            {elements.map(element=><p key={element} ref={reffs[elements.indexOf(element)]} 
              draggable
            onDragStart={handleDragStart(element)}
            onDragEnd={handleDragEnd}
            
            
            
            style={{width:'25px',height:'25px',position:'absolute',top:"10px",left:element==1?'25px':`calc((${element}px * 25) + ((${element}px - 1px) * 25))`,borderRadius:"50%",backgroundColor:"black",color:"white",boxShadow:'1px 1px 5px rgb(91, 90, 90)',display:'flex',alignItems:'center',justifyContent:"center"}}>
                {element}
            </p>)}
        
        </div>
        </div>}
        <div style={{width:'auto',height:'auto',margin:'30px auto',padding:'10px',display:'flex',alignItems:'center',justifyContent:"space-around",flexDirection:'column'}}>
          {itemArray.map((itemArr:any,index:any)=> 
            <div key={index} className={openBigDiv===true && index+1==sectionToShow?styles.sectionMainHolderShow:styles.sectionMainHolderHide}>
                <div onClick={()=>controlSectionShown(index+1)} style={{width:width*0.8,height:'50px',boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:"space-between",padding:'15px'}}>
                  <p style={{width:'30px',height:'30px',display:'flex',borderRadius:'50%',justifyContent:"center",alignItems:"center",backgroundColor:'black',color:'white'}}>{index+1}</p>
                  <Image src={index+1==sectionToShow?dropDown:dropRight} alt='' style={{width:"40px",height:'40px'}}/>
                </div>

                <div style={{margin:'10px auto',width:width*0.8,height:'auto',display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:"column"}}>
                    <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'10px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Email &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={itemArr?.Email} placeholder='user@gmail.com' type='email' name='Email' onChange={(event)=>{updateList(event,index)}} className={shownormal?styles.forminput:enlistUserObj.Email===""?styles.forminputUnfilled: styles.forminput}/>
                          
                    </div>
                    <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'10px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Item Name &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input  value={itemArr?.itemName} placeholder='sweatshirt' type='text' name='itemName' onChange={(event)=>{updateList(event,index)}} className={ styles.forminput}/>
                    </div>
                    <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'10px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Brand Name &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input  value={itemArr?.companyName} placeholder='Jayy Retails' type='text' name='companyName' onChange={(event)=>{updateList(event,index)}} className={styles.forminput}/>
                    </div>
                    <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'10px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Phone Number &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input  value={itemArr?.Phone} placeholder='+334' type='text' name='Phone' onChange= {(event)=>{updateList(event,index)}} className={styles.forminput}/>
                    </div>
                    <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'10px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Delivery &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input  value={itemArr?.Delivery} placeholder='all over the country' type='text' name='Delivery' onChange= {(event)=>{updateList(event,index)}} className={shownormal?styles.forminput:enlistUserObj.Email===""?styles.forminputUnfilled: styles.forminput}/>
                    </div>
                    <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'10px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Business Link &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input  value={itemArr?.link} placeholder='instagram/pinterest/website' type='text' name='link' onChange= {(event)=>{updateList(event,index)}} className={shownormal?styles.forminput:enlistUserObj.Email===""?styles.forminputUnfilled: styles.forminput}/>
                    </div>

                    <div style={{margin:'15px auto',display:'flex',alignItems:'center',justifyContent:'space-around',width:'75%',height:'auto'}}>
                      <p style={{width:'70px',display:"flex",alignItems:"center",justifyContent:"center",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',padding:'5px 0px',backgroundColor:'black',color:'white',borderRadius:'5px'}}>Add</p>
                      <p style={{width:'70px',display:"flex",alignItems:"center",justifyContent:"center",height:'auto',boxShadow:'1px 1px 5px rgb(91, 90, 90)',padding:'5px 0px',backgroundColor:'black',color:'white',borderRadius:'5px'}}>Clear</p>
                    </div>
                </div>
            </div>)}
        </div>

        <p style={{textAlign:"center",fontSize:'11px',fontFamily:'NexaTextLight',color:'black',borderRadius:'10px',opacity:'0.6'}}>Fill the fields below for easy sorting of your project</p> 


            <div style={{height:"50px",width:width>500?'350px':width*0.80,margin:'30px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Title &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj?.title} type='text' placeholder="title" name='title' onChange={(event)=>{updateUserObj(event)}} className={styles.forminput}/>
            </div>


            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Photo Description &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={enlistUserObj.projectDescription} placeholder='description' name='projectDescription' onChange={(event)=>{updateUserObj(event)}} className={styles.forminputTextArea}/>
            </div>

            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Hashtags &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={hashtagHold} placeholder='#summer #outdoor #date-nights' name='hashtag' onChange={(event)=>{updateHashtag(event)}} className={styles.forminputTextArea}/>
            </div>

            <p onClick={(event)=>submitUserInfo(event,enlistUserObj,itemArray)} style={{width:'100px',cursor:'pointer',height:'50px',display:'flex',alignItems:"center",justifyContent:"center",backgroundColor:'white',margin:'30px auto',fontFamily:"NexaTextight",borderRadius:'7px',boxShadow:'1px 1px 5px rgb(91, 90, 90)'}}>{isLoading?<Loader color="black" size="sm" variant="bars" />:'Save'}</p>
            </section>
    </div>
  )
}

