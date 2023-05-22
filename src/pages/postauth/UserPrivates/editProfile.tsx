import React, {useEffect,useState,useRef} from 'react'
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useWindowResize from '@/utils/windowdimension';
import { Loader } from '@mantine/core';
import addIcon from '../../../iconholder/addIcon.svg'
import styles from './Editprofile.module.css'
import editIcon from '../../../iconholder/editIcon.svg'
import ImageCropper from '@/utils/pre_auth/imageCropper';
import ColorThief from "color-thief-ts"
import MainCrop from '@/utils/reactImgCrop/mainCrop';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'


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


export default function EditProfile({data}:any) {


 
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
  const [newName,setNewName] = useState('')
  const [enlistUserObj,setEnlistUserObj] = useState<any>({
    name:"",
    bio: "",
    hashtag:"",
    avatarUrl:''
})


const formData = new FormData()
const [imgSrc, setImgSrc] = useState('')
const [crop, setCrop] = useState<Crop>()
const [aspect, setAspect] = useState<number | undefined>(1 / 1)
const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
const [newPIUrl, setNewPIUrl] = useState('')
const previewCanvasRef = useRef<HTMLCanvasElement>(null)
const [firstImage,setFirstImage] = useState('')
const firstImageRef = useRef<HTMLInputElement>(null)




const onCrop = ()=>{
  handleUpload(previewCanvasRef,formData)
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
  console.log(dominantColor)
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
    const reader = new FileReader()
    reader.addEventListener('load', () =>
      setImgSrc(reader.result?.toString() || ''),
    )
    reader.readAsDataURL(e.target.files[0])
    setCropImage(true)
  }
}


function handleUpload(canvasRef:any,formData:any) {
  const canvas = canvasRef.current;
  canvas.toBlob((blob:any) => {
    console.log('b blob')
    console.log(`${blob} data`)
    const file = new File([blob], 'filename.png', { type: 'image/jpg' });; // 'filename.png' specifies the desired filename
    setFile(file)
    
    // Perform your upload logic here

    const formDataObject = Object.fromEntries(formData.entries());

    console.log(formDataObject);
  });
}
const updateUserObj = (event:any)=>{
    setEnlistUserObj({...enlistUserObj,...{[event.target.name] : event.target.value}})
    console.log(enlistUserObj)
    
}


/*const onCancel = ()=>{
        
  setCropImage(false)
}
*/


const submitUserInfo = async (event:any,enlistUserObj:any)=>{
  event.preventDefault()
  
console.log(enlistUserObj)
  const token = window.localStorage.getItem('token')
  setIsLoading(true)
  
 formData.append('name',enlistUserObj.name)
formData.append('bio',enlistUserObj.bio)
  formData.append('hashtag',enlistUserObj.hashtag)
  enlistUserObj?.twitter?formData.append('twitter',enlistUserObj.twitter): ""
  enlistUserObj?.facebook?formData.append('facebook',enlistUserObj.facebook): ""
  enlistUserObj?.instagram?formData.append('instagram',enlistUserObj.instagram): ""
  file!==''?formData.append('backgroundColor',dominantColor): ""
  file!==''?formData.append('avatar',file): ""
  console.log(formData)
  console.log(token)

const withImage = {method: 'POST',headers:{'Accept': '*/*',Authorization: `Bearer ${token}`}}
const withoutImage = {method: 'POST',headers:{'Accept': 'application/json','Content-Type': 'application/json',}}

  //'https://fashion-r-services.onrender.com/creator/editProfile
  if(file!==''){
    console.log('a')
    const createdCreator =  await fetch('https://fashion-r-services.onrender.com/creator/editProfile', {...withImage,body: formData});
    const res = await createdCreator.json()
  if(res.verified===true){
    setEnlistUserObj({...enlistUserObj,bio:res?.bio,hashtag:res?.hashtag,name :res.name,avatarUrl:res.avatarUrl})
    setDominantColor(res?.backgroundColor)
    setIsLoading(false)
  }
  console.log(`${JSON.stringify(res)} got it out`)}
  else{
    console.log('b')
    const createdCreator = await fetch('https://fashion-r-services.onrender.com/creator/editProfile', {...withImage,body: formData});
    const res = await createdCreator.json()
  if(res.verified===true){
    setEnlistUserObj({...enlistUserObj,bio:res?.bio,hashtag:res?.hashtag,name :res?.name})
      setIsLoading(false)
  }
  console.log(`${JSON.stringify(res)} got it out`)
  } 
  
 
  

}



const handleFileChange = (e:any) => {
  console.log('in')
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  //console.log(imageUrl)
  setFile(file)
  setImageUrl(imageUrl);
  setCropImage(true)
  //setShowImage(true)

};


//useeffect to change avatars to be displayed

  useEffect(()=>{
    if(cropImageUrl===''){
      setNewAvatar(false)
    }
    else{
      setNewAvatar(true)
    }
},[cropImageUrl])
 



//useEffect for refreshing site and setting states to be edited
    useEffect(()=>{
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

          useEffect(()=>{

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
            console.log(enlistUserObj)
            const extractColor = async(url:string)=>{
            const colorThief = new ColorThief();
            const dominantColor = await colorThief.getColorAsync(url);
            console.log(dominantColor)
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
      {cropImage && <MainCrop imgSrc={imgSrc} onCancel={onCancel} onCrop={onCrop} firstImageRef={firstImageRef} formData={formData} handleUpload={handleUpload} previewCanvasRef={previewCanvasRef} setNewPIUrl={setNewPIUrl} setImgSrc={setImgSrc} completedCrop={completedCrop} setCompletedCrop={setCompletedCrop} crop={crop} setCrop={setCrop} setCropImage={setCropImage} aspect={aspect}/>}
        <section style={{width:width>500?'auto':'100%',height:width>500?'auto':'100%',padding:'15px',backgroundImage: `linear-gradient(to bottom , ${dominantColor},white)`,boxShadow:'1px 1px 5px rgb(91, 90, 90)',borderRadius:width>500?"15px":'',paddingTop:width>500?'30px':'80px',boxSizing:'border-box',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
            {width<500 && <p onClick={()=>router.push('../../postauth/userpage')} style={{position:'absolute',cursor:'pointer', top:'15px',left:width*0.10,padding:'10px 15px',backgroundColor:'white',borderRadius:'10px'}}>back</p>}
            <div style={{height:width>500?"350px":width*0.80,width:width>500?'350px':width*0.80,margin:width>500?"":'0px auto',position:'relative',marginBottom:'30px',boxShadow:'1px 1px 3px black',boxSizing:'border-box',borderRadius:'15px'}}>
                {completedCrop?<canvas ref={previewCanvasRef} onClick={()=>setShowAvatar(true)}   style={{width:'100%',height:'100%',objectFit:"contain",borderRadius:'15px'}}/>:
                    <Image fill={true} onClick={()=>setShowAvatar(true)} src={enlistUserObj?.avatarUrl} alt='user avatar' style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'15px'}}/>
                    }
                <p style={{position:'absolute',backgroundColor:'white',boxShadow:'1px 1px 5px rgb(91, 90, 90)',bottom:'15px',right:'15px',width:'35px',height:'35px',padding:'15px',borderRadius:"50%",display:'flex',alignItems:"center",justifyContent:"center"}}><Image src={editIcon} alt='' style={{width:"24px",height:'24px'}}/></p>
                <input type='file'id='avatar' ref={firstImageRef} name='avatar' style={{display:'none'}} accept="image/*" onChange={onSelectFile} />
                <label htmlFor= 'avatar' style={{position:'absolute',cursor:'pointer',backgroundColor:'white',boxShadow:'1px 1px 5px rgb(91, 90, 90)',bottom:'15px',right:'15px',width:'35px',height:'35px',padding:'15px',borderRadius:"50%",display:'flex',alignItems:"center",justifyContent:"center"}}>
                      <Image src={editIcon} alt='' style={{width:"24px",height:'24px'}}/>
                </label>
            </div>

            <div style={{height:"50px",width:width>500?'350px':width*0.80,margin:'30px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Name &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj?.name} type='text' placeholder="name" name='name' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.name===""?styles.forminputUnfilled: styles.forminput}/>
            </div>


            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Bio &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={enlistUserObj?.bio} placeholder='user bio' name='bio' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminputTextArea:enlistUserObj.bio===""?styles.forminputTextAreaUnfilled: styles.forminputTextArea}/>
            </div>

            <div style={{width:width>500?'100%':width*0.80,height:'auto',margin:'30px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Hashtags &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={enlistUserObj.hashtag} placeholder='#summer #outdoor #date-nights' name='hashtag' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminputTextArea:enlistUserObj.bio===""?styles.forminputTextAreaUnfilled: styles.forminputTextArea}/>
            </div>

            <p onClick={(event)=>submitUserInfo(event,enlistUserObj)} style={{width:'100px',cursor:'pointer',height:'50px',display:'flex',alignItems:"center",justifyContent:"center",backgroundColor:'white',margin:'30px auto',fontFamily:"NexaTextight",borderRadius:'7px',boxShadow:'1px 1px 5px rgb(91, 90, 90)'}}>{isLoading?<Loader color="black" size="sm" variant="bars" />:'Save'}</p>
            </section>
    </div>
  )
}

