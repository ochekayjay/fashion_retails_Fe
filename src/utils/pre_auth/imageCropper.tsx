
import React,{useState,useEffect,useCallback} from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../cropImageFunc'
import { Point, Area } from "react-easy-crop/types";




type imageCroptype = {
    ImageUrl:string
    onCancel: ()=>any
    setCroppedImageurl: any
}

type pixelCrop = {
    width:any,
    height:any,
    x:any,
    y:any
  }

function ImageCropper({ImageUrl, onCancel,setCroppedImageurl}:imageCroptype) {
    const[zoom,setZoom] = useState(1)
    const [crop,setCrop] = useState({x:0,y:0})
    const [aspectRatio, setAspectRatio] = useState(1/1)
    const croppedArea = 0
    const [croppedAreaP, setCroppedAreaP] = useState<pixelCrop>({width:'',height:'',x:'',y:''})

    const onCropChange = (crop:any)=>{
        console.log('crop changing here'+ JSON.stringify(crop))
        setCrop(crop)
    }

    const onZoomChange = (zoom:any)=>{
        console.log('this is zoom' + zoom)
        setZoom(zoom)
    }

    const onCrop = async ()=>{
        const croppedImageUrl = await getCroppedImg({ImageUrl,croppedAreaP,rotation:0})
        console.log('crop itself here'+croppedImageUrl)
        setCroppedImageurl(croppedImageUrl)
    }

    useEffect(()=>{
        console.log('abc')
    },[crop])


    const onCropComplete = (croppedAreaPercentage:Area,croppedAreaPixels:Area) => {
        console.log(`crop complete ${JSON.stringify(croppedAreaPixels)}`)
        setCroppedAreaP(croppedAreaPixels)
      }



    
  return (
    <div style={{width:"100%",height:'100%',backgroundColor:"black",zIndex:'1000',position:"fixed",top:"0px",left:"0px",display:'flex',alignItems:"center",justifyContent:"space-between",flexDirection:'column'}}>
     
        <div style={{width:'auto',margin:'0px 0px 40px',height:'80%'}}>
            <Cropper image={ImageUrl} 
                     aspect={aspectRatio}
                     zoom={zoom} crop={crop}
                     onCropChange={setCrop}
                     onZoomChange={setZoom}
                     onCropComplete={onCropComplete} />
        </div>
        <div style={{marginTop:'15px',width:'50%',left:'50%',transform:'translateX(-50%)',height:'auto',display:'flex',justifyContent:"space-around",position:'fixed',bottom:'15px'}}>
            <p onClick={()=>onCancel()} style={{fontFamily:'NexaTextLight',boxShadow:'1px 1px 5px rgb(91, 90, 90)',cursor:'pointer',fontSize:'14px',letterSpacing:'1.5px',width:'70px',textAlign:"center",padding:'10px 7px',height:'auto',backgroundColor:'white',borderRadius:'3px',color:'black'}}>Cancel</p>
            <p onClick={()=>onCrop()} style={{fontFamily:'NexaTextLight',cursor:'pointer',fontSize:'14px',boxShadow:'1px 1px 5px rgb(91, 90, 90)',letterSpacing:'1.5px',width:'70px',textAlign:"center",padding:'10px 7px',height:'auto',backgroundColor:'white',borderRadius:'3px',color:'black'}}>Crop</p>
        </div>
    </div>
  )
}

export default ImageCropper