import React, {useState,useEffect,useRef} from 'react'
import styles from './Signup.module.css'
import { Loader } from '@mantine/core';
import { Button } from '@mantine/core'
import Link from 'next/link'
import ColorThief from "color-thief-ts"
import useWindowResize from '@/utils/windowdimension';
import ImageCropper from '@/utils/pre_auth/imageCropper';
import MainCrop from '@/utils/reactImgCrop/mainCrop';
import { useDebounceEffect } from '@/utils/useDebounceEffect';
import { imgPreview } from '@/utils/reactImgCrop/imgPreview';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
  } from 'react-image-crop'


export default function Signup() {
    const [ImageUrl,setImageUrl] = useState<any>('')
    const [showImage, setShowImage] = useState(false)
    const [shownormal,setshowNormal] = useState(true)
    const [cropImage, setCropImage] = useState(false)
    const [file,setFile] = useState<any>('')
    const [isLoading, setIsLoading] = useState(false)
    const [imagewidth,setImageWidth] = useState(0)
    const [imageHeight,setImageHeight] = useState(0)
    const [cropImageUrl,setCroppedImageurl] = useState('')
    const [dominantColor, setDominantColor] = useState<any>(null);
    const uploader = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"/></svg>;
    const {width,height} = useWindowResize()

    const formData = new FormData()

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


    const handleImageLoad = (e:any) => {
        const { width, height } = e.target;
        setImageWidth(70);
        setImageHeight(70);
      };

    const firstImageRef = useRef<HTMLInputElement>(null)

    

      interface Image {
        new(): HTMLImageElement;
      }

      const [enlistUserObj,setEnlistUserObj] = useState<any>({
        name:"",
        username: "",
        password: "",
        twitter:"",
        facebook: "",
        instagram : "",
        email: "",
        bio: "",
    })


   /**
    *  const onCancel = ()=>{
        
        setCropImage(false)
    }
    */
   


    const submitUserInfo = async (event:any,enlistUserObj:any)=>{
        event.preventDefault()
        
        if(enlistUserObj.name === ''|| enlistUserObj.username === '' || enlistUserObj.password === '' || enlistUserObj.avatar === '' || enlistUserObj.email === '' || enlistUserObj.bio === ''  ){
            setshowNormal(false)
        }

       else{
        setIsLoading(true)
        
       /**
        *  if(previewCanvasRef!==null){
          console.log('a log')
             handleUpload(previewCanvasRef,formData)
        }
        */
        
        formData.append('name',enlistUserObj.name)
        console.log('c blob')
        formData.append('Username',enlistUserObj.username)
        formData.append('Password',enlistUserObj.password)
        formData.append('Email',enlistUserObj.email)
        formData.append('bio',enlistUserObj.bio)
        enlistUserObj?.twitter?formData.append('twitter',enlistUserObj.twitter): ""
        enlistUserObj?.facebook?formData.append('facebook',enlistUserObj.facebook): ""
        enlistUserObj?.instagram?formData.append('instagram',enlistUserObj.instagram): ""
        file!==''?formData.append('backgroundColor',dominantColor): ""
        file!==''?formData.append('avatar',file): ""
        //console.log(formData)
        const formDataObject = Object.fromEntries(formData.entries());

    console.log(formDataObject);
//http://localhost:5005
//https://fashion-r-services.onrender.com/creator/register
        const createdCreator = await fetch('https://fashion-r-services.onrender.com/creator/register', {
            method: 'POST',  
            headers: {
                'Accept': '*/*'
                },    
            body: formData
            }); 
        const res = await createdCreator.json()
        if(res.verification==='mail sent'){
            setIsLoading(false)
        }
        console.log(res)
       }
        
   
    }

    

    useEffect( ()=>{
        const extractColor = async(url:string)=>{
        const colorThief = new ColorThief();
        const dominantColor = await colorThief.getColorAsync(url);
        console.log(dominantColor)
        setDominantColor(dominantColor);
        setCropImage(true)
        setShowImage(false)
        
        }
        extractColor(cropImageUrl)
    },[cropImageUrl])

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

      const updateUserObj = (event:any)=>{
        setEnlistUserObj({...enlistUserObj,...{[event.target.name] : event.target.value}})
        
    }
//trying out newer package



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


      const [imgSrc, setImgSrc] = useState('')
      const [crop, setCrop] = useState<Crop>()
      const [aspect, setAspect] = useState<number | undefined>(1 / 1)
      const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
      const [newPIUrl, setNewPIUrl] = useState('')
      const previewCanvasRef = useRef<HTMLCanvasElement>(null)
      const [firstImage,setFirstImage] = useState('')

      

     /**
      * 
      * @param e  useEffect(()=>{
        const newUrl = imgPreview()
      },[completedCrop])
      */

    
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
    
      function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
          const { width, height } = e.currentTarget
          setCrop(centerAspectCrop(width, height, aspect))
        }
      }
    

      
      const onCancel = ()=>{
        setCropImage(false) 
        setCompletedCrop(undefined)
        if(firstImageRef.current){
          firstImageRef.current.value = ''
        }
        
        setCrop(undefined)
    }


const onCrop = ()=>{
  handleUpload(previewCanvasRef,formData)
  setCropImage(false) 

}
//main img html <input type='file'id='avatar' onChange={(event)=>handleFileChange(event)} name='avatar' style={{display:'none'}} />
//{cropImage?<ImageCropper ImageUrl={ImageUrl} onCancel={onCancel} setCroppedImageurl={setCroppedImageurl}/>:""}
//<img style={{width:'100%',height:'100%',objectFit:"cover",borderRadius:'50%'}}  src={newPIUrl} alt="user avatar"/>  
return (
    <div style={{backgroundColor:'rgb(228,228,228)',minHeight:'100vh',width:'100vw',display:"flex",alignItems:"center",flexDirection:'column',justifyContent:"center"}}>
        {cropImage && <MainCrop imgSrc={imgSrc} onCancel={onCancel} onCrop={onCrop} firstImageRef={firstImageRef} formData={formData} handleUpload={handleUpload} previewCanvasRef={previewCanvasRef} setNewPIUrl={setNewPIUrl} setImgSrc={setImgSrc} completedCrop={completedCrop} setCompletedCrop={setCompletedCrop} crop={crop} setCrop={setCrop} setCropImage={setCropImage} aspect={aspect}/>}
        
        <div style={{width:'85%',margin:'30px auto'}}>
            <p style={{width:'140px',boxShadow:'1px 1px 5px rgb(91, 90, 90)',marginLeft:'0px',textAlign:'center',padding:'10px 15px',boxSizing:'border-box',borderRadius:'15px',color:'black',backgroundColor:"white",fontFamily:'NexaTextLight',fontSize:'18px', letterSpacing:'1.5px',height:'auto'}}>back</p>
        </div>
        <section className={styles.innerSection} >
            <div className={styles.smallSection}>
                <div  style={{width:"100%",fontSize:'30px',fontFamily:"NexaTextBold",height:"50%",display:"flex",alignItems:"center",justifyContent:'center'}}>
                    <p style={{color:"white",width:'auto',padding:'10px 0px',height:'auto',textAlign:"center"}}>Welcome Back</p>
                </div>
                <div style={{width:"100%",height:"50%",display:"flex",alignItems:"center",justifyContent:'center'}}>
                    <Link href={'./signin'}><p style={{fontFamily:'NexaTextLight',fontSize:'20px',width:'200px',height:'auto',padding:'5px',borderRadius:'25px',border:'3px solid white',color:'rgb(70, 70, 70)',backgroundColor:'white',textAlign:'center'}}>SIGN IN</p></Link>
                </div>
            </div>
            <div className={styles.BigSection} >
                <p style={{textAlign:'center',letterSpacing:'2.0px',fontFamily:"NexaTextBold",marginBottom:'40px',marginTop:"15px",fontSize:width>850?'25px':"20px"}}>CREATE ACCOUNT</p>
                <form style={{height:'100%',width:'100%'}}>
                    <section style={{width:'100%',height:'95%',display:"flex",flexDirection:width>800?'row':'column'}}>
                        <div style={{height:'100%',width:width>800?'33.3%':'90%',margin:'0px auto',padding:width>800?"15px":'5px',boxSizing:'border-box',display:'flex',flexDirection:"column",justifyContent:"space-around"}}>
                        <div style={{height:'15%',display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}><p className={styles.formdataHeader}>Authentication Data</p></div>
                            <div style={{display:'flex',flexDirection:"column",justifyContent:"space-between",height:'80%'}}>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Email &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input  value={enlistUserObj.email} placeholder='user@gmail.com' type='email' name='email' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.email===""?styles.forminputUnfilled: styles.forminput}/>
                            </div>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Password &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj.password} placeholder='****' type='password' name='password' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.password===""?styles.forminputUnfilled: styles.forminput}/>
                            </div>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Username &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj.username} type='text' placeholder='Username' name='username' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.username===""?styles.forminputUnfilled: styles.forminput}/>
                            </div>
                            
                            </div>
                        </div>
                        <div style={{height:'100%',width:width>800?'33.3%':'95%',margin:'0px auto',padding:width>800?"15px":'5px',boxSizing:'border-box',display:'flex',flexDirection:"column",justifyContent:"space-around"}}>
                        <div style={{height:'15%',display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}><p className={styles.formdataHeader}>Profile</p></div>
                            <div style={{display:'flex',flexDirection:"column",justifyContent:"space-between",height:'80%'}}>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Name &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj.name} type='text' placeholder="name" name='name' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.name===""?styles.forminputUnfilled: styles.forminput}/>
                            </div>
                            
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Avatar</p>
                            <div style={{height:'90px',position:'relative',width:'100%',boxSizing:'border-box',backgroundColor:"rgb(228,228,228)",borderRadius:'10px',display:'flex',alignItems:"center",justifyContent:'center'}}>
                                <p style={{height:'70px',width:'70px',border:'3px solid rgb(70, 70, 70)',borderRadius:'50%',display:'block'}}>{completedCrop && <canvas ref={previewCanvasRef} style={{width:'100%',height:'100%',objectFit:'fill',borderRadius:'50%'}}  />}</p>
                                
                                <input type="file" id='avatar' ref={firstImageRef} name='avatar' style={{display:'none'}} accept="image/*" onChange={onSelectFile} />
                                <label htmlFor= 'avatar' style={{backgroundColor:'rgb(70, 70, 70)',left:'0px',cursor:'pointer',position:'absolute',height:'100%',width:'15%'}}>
                                <div style={{height:'100%',width:'100%',display:'flex',alignItems:"center",justifyContent:'center'}}><p>{uploader}</p></div>
                                </label>
                            </div>
                        
                            </div>
                            
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                            <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Bio &nbsp; <span style={{color:'red'}}>*</span></p>
                            <textarea value={enlistUserObj.bio} placeholder='user bio' name='bio' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminputTextArea:enlistUserObj.bio===""?styles.forminputUnfilled: styles.forminputTextArea}/>
                            </div>
                            
                            </div>
                        </div>
                        <div style={{height:'100%',width:width>800?'33.3%':'95%',margin:'0px auto',padding:width>800?"15px":'5px',boxSizing:'border-box',display:'flex',flexDirection:"column",justifyContent:"space-around"}}>
                            <div style={{height:'15%',display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"}}><p className={styles.formdataHeader}>Socials</p></div>
                            <div style={{display:'flex',flexDirection:"column",justifyContent:"space-between",height:'80%'}}>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Twitter</p>
                                <input value={enlistUserObj.twitter} placeholder='twitter' name='twitter' onChange={(event)=>{updateUserObj(event)}} className={styles.forminput}/>
                            </div>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Instagram</p>  
                                <input value={enlistUserObj.instagram} placeholder='instagram' name='instagram' onChange={(event)=>{updateUserObj(event)}} className={styles.forminput}/>  
                            </div>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Facebook</p>
                                <input value={enlistUserObj.facebook} placeholder='facebook' name='facebook' onChange={(event)=>{updateUserObj(event)}} className={styles.forminput}/>
                            </div>
                            </div>
                        </div>
                    </section>
                    <section style={{width:'100%',height:'10%',textAlign:'center',marginBottom:'20px'}}>
                        <button onClick={(event)=>submitUserInfo(event,enlistUserObj)} style={{fontFamily:'NexaTextLight',fontSize:'20px',width:'200px',height:'auto',padding:'5px 0px',borderRadius:'25px',border:'3px solid white',backgroundColor:'rgb(70, 70, 70)',color:'white',textAlign:'center'}}>{isLoading?<Loader color="white" size="sm" variant="bars" />: 'Sign Up'}</button>
                    </section>
                </form>
            </div>
        </section>
    </div>
  )
}
