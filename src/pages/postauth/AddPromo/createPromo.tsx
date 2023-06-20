import React, {useEffect,useState,useRef} from 'react'
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useWindowResize from '@/utils/windowdimension';
import { Loader } from '@mantine/core';
import addIcon from '../../../iconholder/addIcon.svg'
import styles from './CreatePromo.module.css'
import editIcon from '../../../iconholder/editIcon.svg'
import imageicon from '../../../iconholder/imageIcon.svg'
import dropDown from '../../../iconholder/drop_down.svg'
import dropRight from '../../../iconholder/drop_right.svg'
import addItem from '../../../iconholder/addItem.svg'
import closeItem from '../../../iconholder/closeItem.svg'
import ImageCropper from '@/utils/pre_auth/imageCropper';
import ColorThief from "color-thief-ts"
import MainCrop from '../AddProject/ProjectCrop/mainCrop'; 
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


export default function CreatePromo() {

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
    promoDescription: "",
    link:"",
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





const clearHistoricalData = ()=>{
  if(firstImageRef.current){
    firstImageRef.current.value = ''
  }
  setItemPop(false)
  setItemNumber(0)

}





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
  console.log(event.target.name)
  console.log(enlistUserObj.projectDescription)
    setEnlistUserObj({...enlistUserObj,...{[event.target.name] : event.target.value}})
    
    
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

  if(!file || !enlistUserObj.title || !enlistUserObj.promoDescription || !enlistUserObj.link){

  }

  else{

    const formData = new FormData()
    const token = window.localStorage.getItem('token')
    setIsLoading(true)
    
    formData.append('title',enlistUserObj.title)
    formData.append('promoDescription',enlistUserObj.promoDescription)
    formData.append('link',enlistUserObj.link)
    file!==''?formData.append('backgroundColor',dominantColor): ""
    file!==''?formData.append('avatar',file): ""
   
  
  const withImage = {method: 'POST',headers:{'Accept': '*/*',Authorization: `Bearer ${token}`}}
  const withoutImage = {method: 'POST',headers:{'Accept': 'application/json','Content-Type': 'application/json',Authorization: `Bearer ${token}`}}
  
      const formDataObject = Object.fromEntries(formData.entries());
  
      const createdCreator =  await fetch('https://fashion-r-services.onrender.com/promo/creation', {...withImage,body:formData});
  
      if(createdCreator){
        
          setIsLoading(false)
      }
     
  }
}


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
            
            <div   style={{height:width>500?"622.2222px":width*1.4222,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',backgroundColor:"white",marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
                {completedCrop?
                    <>

                    <div  style={{width:"100%",position:'absolute',backgroundColor:"transparent",zIndex:10,top:'0px',left:'0px',height:"100%"}}>
                    {pTagArray.map((P:any)=>
                      <p key={P.key} style={{justifyContent :P.justifyContent,zIndex:10,alignItems :P.alignItems,display :P.display,color:P.color,boxShadow : P.boxShadow,position:P.position,width:P.width,height:P.height,top:P.top,left:P.left,borderRadius:P.borderRadius,backgroundColor:P.backgroundColor}}>{P.value}</p>)
                      }
                      {numberDisplay && <div  style={{width:'80px',height:'80px',position:'absolute',top:popDistance.y,left:popDistance.x,boxShadow: '1px 1px 5px rgb(91, 90, 90)',borderRadius:'10px',backgroundColor:'black',color:'white'}}>
                      <div style={{width:'100%',position:'absolute',borderRadius:'10px',top:'0px',left:'0px',zIndex:'4',height:'100%',display:'flex',alignItems:"center",justifyContent:"space-around",flexDirection:'column'}}>
                        <div style={{textAlign:"center"}}>{itemNumber}</div>
                        <div style={{margin:'10px auto',width:'90%',display:"flex",justifyContent:'space-around',alignItems:"center"}}>
                          
                          <p style={{width:'auto',height:"auto",padding:"3px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:'50%',backgroundColor:"white",boxShadow: '1px 1px 5px rgb(91, 90, 90)'}}>
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
            
          
     
            <div style={{height:"50px",width:width>500?'350px':width*0.80,margin:'30px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Title &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj?.title} type='text' placeholder="title" name='title' onChange={(event)=>{updateUserObj(event)}} className={styles.forminput}/>
            </div>


            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Photo Description &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={enlistUserObj.promoDescription} placeholder='description' name='promoDescription' onChange={(event)=>{updateUserObj(event)}} className={styles.forminputTextArea}/>
            </div>

            <div style={{height:"50px",width:width>500?'350px':width*0.80,margin:'30px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Link &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj?.link} type='text' placeholder="link" name='link' onChange={(event)=>{updateUserObj(event)}} className={styles.forminput}/>
            </div>

            <p onClick={(event)=>submitUserInfo(event,enlistUserObj,itemArray)} style={{width:'100px',cursor:'pointer',height:'50px',display:'flex',alignItems:"center",justifyContent:"center",backgroundColor:'white',margin:'30px auto',fontFamily:"NexaTextight",borderRadius:'7px',boxShadow:'1px 1px 5px rgb(91, 90, 90)'}}>{isLoading?<Loader color="black" size="sm" variant="bars" />:'Save'}</p>
            </section>
    </div>
  )
}

