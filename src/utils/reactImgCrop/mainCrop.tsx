import React, {useState,useRef,useEffect} from 'react'
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
  } from 'react-image-crop'
import { imgPreview } from './imgPreview'
import { useDebounceEffect } from '../useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from './canvasPreview'
import useWindowResize from '../windowdimension'


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

function MainCrop({imgSrc,setImgSrc,crop,firstImageRef,formData,handleUpload,onCancel,onCrop,setCropImage, previewCanvasRef,setCrop, aspect,completedCrop,setNewPIUrl,setCompletedCrop}:any) {

    //const [imgSrc, setImgSrc] = useState('')
  //const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  //const [crop, setCrop] = useState<Crop>()
  //const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  
  //const [aspect, setAspect] = useState<number | undefined>(1 / 1)

  const {width,height} = useWindowResize()
  useDebounceEffect(
    async () => {
      console.log('abc')
      console.log(completedCrop?.width)
      console.log(completedCrop?.height)
      console.log(imgRef.current)
      console.log(previewCanvasRef.current)
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {

        console.log('jay')
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          //scale,
          //rotate,
        )

        console.log('bay')

        const newUrl = await imgPreview(imgRef.current,completedCrop)
        console.log('cay')
        console.log(newUrl)
        setNewPIUrl(newUrl)
      }

      else{
        console.log('def')
      }
    },
    100,
    [completedCrop],
  )


/**
 * 
  const onCancel = ()=>{
    setCropImage(false) 
    setCompletedCrop()
    firstImageRef.current.value = null
    setCrop()
}

const onCrop = ()=>{
  handleUpload(previewCanvasRef,formData)
  setCropImage(false) 
}
 */


/**
 * 
 * @param e 
const onCrop = async ()=>{
    const croppedImageUrl = await getCroppedImg({ImageUrl,croppedAreaP,rotation:0})
    console.log('crop itself here'+croppedImageUrl)
    setCroppedImageurl(croppedImageUrl)
}
 */

function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  return (
    <div style={{width:"100%",height:'100%',backgroundColor:"black",zIndex:'1000',position:"fixed",top:"0px",left:"0px",display:'flex',alignItems:"center",justifyContent:"space-between",flexDirection:'column'}}>
     
        <div style={{padding:'15px',boxSizing:'border-box',position:'absolute',top:'50%',transform:'translateY(-50%)',width:width>600?'600px':width,height:'auto',margin:width>600?'0px auto':''}}>
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{width:'100%',height:'100%',objectFit:'cover'}}
            onLoad={onImageLoad}
          />
        </ReactCrop>
        </div>
        <div style={{marginTop:'15px',width:'50%',left:'50%',transform:'translateX(-50%)',height:'auto',display:'flex',justifyContent:"space-around",position:'fixed',bottom:'15px'}}>
            <p onClick={()=>onCancel()} style={{fontFamily:'NexaTextLight',boxShadow:'1px 1px 5px rgb(91, 90, 90)',cursor:'pointer',fontSize:'14px',letterSpacing:'1.5px',width:'70px',textAlign:"center",padding:'10px 7px',height:'auto',backgroundColor:'white',borderRadius:'3px',color:'black'}}>Cancel</p>
            <p  onClick={()=> onCrop()} style={{fontFamily:'NexaTextLight',cursor:'pointer',fontSize:'14px',boxShadow:'1px 1px 5px rgb(91, 90, 90)',letterSpacing:'1.5px',width:'70px',textAlign:"center",padding:'10px 7px',height:'auto',backgroundColor:'white',borderRadius:'3px',color:'black'}}>Crop</p>
          
        </div>
    </div>
  )
}

export default MainCrop