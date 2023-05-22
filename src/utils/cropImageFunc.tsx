

const createImage = (url:any) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue:number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */

type pixelCrop = {
  width:any,
  height:any,
  x:any,
  y:any
}


type getCroppedType = {
  ImageUrl:any,
  croppedAreaP: pixelCrop,
  rotation:any
}
export default async function getCroppedImg({ImageUrl, croppedAreaP, rotation = 0}:getCroppedType) {
  const image = await createImage(ImageUrl) as HTMLImageElement;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  if(ctx !== null){
    ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  //safeArea / 2 - image.width * 0.5
  // draw rotated image and store data.
  image.onload = ()=>{
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5 ,
      safeArea / 2 - image.height * 0.5 
    );
  }
   

  
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = croppedAreaP?.width;
  canvas.height = croppedAreaP?.height;
 //0 - safeArea / 2 + image.width * 0.5 - croppedAreaP?.x
  // paste generated rotate image with correct offsets for x,y crop values.
  if(croppedAreaP?.x && croppedAreaP?.y){
    ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - croppedAreaP?.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5  - croppedAreaP?.y)
  );}
console.log(canvas)
console.log(ctx)
}
  // As Base64 string
   
    /**
     * const a =  canvas.toDataURL('image/jpeg');
   console.log(a)
   return a 
    
     */


  // As a blob

  return  new Promise((resolve) => {
    
    try{
      
       

        canvas.toBlob((file:any) => {
          console.log(file);
          const url = URL.createObjectURL(file);
          console.log(url)
          //const link = document.createElement("a");
          //link.download = "myImage.jpg";
          //link.href = url;
          //link.click();
          resolve(url);
        }, "image/jpeg");
      
    }

    catch(error){
      console.log(error)
    }

  
  });
   

}