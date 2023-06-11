import React,{useState,useEffect,useRef} from 'react'
import styles from '../../styles/Home.module.css'
import Stylestwo from './MiniLandingPage.module.css'
import Link from 'next/link'
import useWindowResize from '@/utils/windowdimension'
import imgOne from '../../../public/miniSize/crop_babe_one.jpg'
import imgTwo from '../../../public/miniSize/crop_babe_two.jpg'
import imgThree from '../../../public/miniSize/crop_guy_one.jpg'
import imgFour from '../../../public/miniSize/crop_guy_two.jpg'
import imgFive from '../../../public/miniSize/imgone (1).jpg'
import imgSix from '../../../public/miniSize/imgone (2).jpg'
import imgSeven from '../../../public/miniSize/imgone (3).jpg'
import imgEight from '../../../public/miniSize/imgone (4).jpg'
import imgNine from '../../../public/miniSize/imgone (5).jpg'
import imgTen from '../../../public/miniSize/imgone (6).jpg'
import imgEleven from '../../../public/miniSize/imgone (7).jpg'
import imgTwelve from '../../../public/miniSize/imgone (8).jpg'
import imgThirteen from '../../../public/miniSize/imgone (9).jpg'
import imgFourteen from '../../../public/miniSize/imgone (10).jpg'
import imgFifteen from '../../../public/miniSize/imgone (11).jpg'



import ring from '../../../src/iconForLanding/rings.svg'
import bracelet from '../../../src/iconForLanding/bracelet.png'
import braids from '../../../src/iconForLanding/braids.png'
import earring from '../../../src/iconForLanding/earring.png'
import necklace from '../../../src/iconForLanding/necklace.svg'
import pants from '../../../src/iconForLanding/pants.svg'
import sweater from '../../../src/iconForLanding/sweater.png'
import shirt from '../../../src/iconForLanding/t-shirt.svg'
import wig from '../../../src/iconForLanding/wig.svg'
import shades from '../../../src/iconForLanding/sunglasses.svg'
import menSuit from '../../../src/iconForLanding/menSuit.svg'
import womenSuit from '../../../src/iconForLanding/women Suit.png'
import faceCap from '../../../src/iconForLanding/faceCap.jpg'
import sneakers from '../../../src/iconForLanding/sneakers.png'
import coat from '../../../src/iconForLanding/coat.png'
import blouse from '../../../src/iconForLanding/blouse.svg'
import handbag from '../../../src/iconForLanding/handbag.svg'
import shorts from '../../../src/iconForLanding/shorts.svg'






function MiniLandingPage() {
    const [retails,setRetails] = useState<any>(false)
    const [sectHolder,setSectHolder] = useState<any>()
    const {width,height} = useWindowResize()
    const [refState,setRefState] = useState<any>({refOne:false,refTwo:false,refThree:false,refFour:false})
    const [reffone,setreffone] = useState<boolean>(false)
    const [refftwo,setrefftwo] = useState<boolean>(false)
    const [reffthree,setreffthree] = useState<boolean>(false)
    const [refffour,setrefffour] = useState<boolean>(false)
    
    const RefOne = useRef<HTMLDivElement>(null);
    const RefTwo = useRef<HTMLDivElement>(null);
    const RefThree = useRef<HTMLDivElement>(null);
    const RefFour = useRef<HTMLDivElement>(null);



    const refArray = ['ref_0','ref_1','ref_2','ref_3']
    const extractedColorArr = ['#8d5942','#857f7e','#b4aaaf','#936b57','#231c1b','#9f9f9f','#ced5e9','#7f7c80','#6D7075','#BBAA77','#EBECF1','#494838','#F269A9','#2C575A','#D4511B']

    const dataArr = [{link:imgOne,color:'#8d5942',items:[{item:'Necklace',img:necklace},{item:'Ring',img:ring},{item:'Wig',img:wig}]},
    {link:imgTwo,color:'#857f7e',items:[{item:'Necklace',img:necklace},{item:'Ring',img:ring},{item:'Bracelet',img:bracelet}]},
    {link:imgThree,color:'#b4aaaf',items:[{item:'Necklace',img:necklace},{item:'Ring',img:ring},{item:'Sweater',img:sweater}]},
    {link:imgFour,color:'#936b57',items:[{item:'Necklace',img:necklace},{item:'Ring',img:ring},{item:'Shades',img:shades},{'Men Suit':menSuit}]},
    {link:imgFive,color:'#231c1b',items:[{item:'Face cap',img:faceCap},{item:'pants',img:pants},{item:'shirt',img:shirt},{item:'sneakers',img:sneakers}]},
    {link:imgSix,color:'#9f9f9f',items:[{item:'pants',img:pants},{item:'shirt',img:shirt},{item:'sneakers',img:sneakers}]},
    {link:imgSeven,color:'#ced5e9',items:[{item:'Shades',img:shades},{item:'Sweater',img:sweater},{item:'pants',img:pants},{item:'shirt',img:shirt}]},
    {link:imgEight,color:'#7f7c80',items:[{item:'Coat',img:coat},{item:'handbag',img:handbag},{item:'Blouse',img:blouse},{item:'pants',img:pants}]},
    {link:imgNine,color:'#6D7075',items:[{item:'handbag',img:handbag},{item:'Blouse',img:blouse},{item:'pants',img:pants}]},
    {link:imgTen,color:'#BBAA77',items:[{item:'Shorts',img:shorts},{item:'shirt',img:shirt},{item:'sneakers',img:sneakers},{item:'Wig',img:wig}]},
{link:imgEleven,color:'#EBECF1',items:[{item:'Shorts',img:shorts},{item:'shirt',img:shirt},{item:'sneakers',img:sneakers},{item:'Shades',img:shades}]},
{link:imgTwelve,color:'#494838',items:[{item:'Shorts',img:shorts},{item:'shirt',img:shirt},{item:'Shades',img:shades}]},
{link:imgThirteen,color:'#F269A9',items:[{item:'Pants',img:pants},{item:'blouse',img:blouse},{item:'Wig',img:wig}]},
{link:imgFourteen,color:'#2C575A',items:[{item:'Pants',img:pants},{item:'Braids',img:braids},{item:'sweater',img:sweater}]},
{link:imgFifteen,color:'#D4511B',items:[{item:'Pants',img:pants},{item:'shades',img:shades},{item:'sweater',img:sweater}]},
]



    useEffect(()=>{
        let arr = [...dataArr]
        let newArr = []
        if(!retails){

          for(let i=0;i<4;i++){
              const rand = Math.random()
              let val = rand * arr.length
              val = Math.floor(val)
            
              newArr.unshift(arr[val])
              arr.splice(val,1)
              
          }
  
          setSectHolder(newArr)
          setRetails(true)
        }
    },[])


    useEffect(() => {
      const handleScroll = () => {
        const viewportHeight = window.innerHeight - window.scrollY;
        const refArrays= [RefOne,RefTwo,RefThree,RefFour]
if(retails){
  
  for(let i=0;i<refArrays.length;i++){
    
    if(refArrays[i].current){
 
     const divTop = refArrays[i].current!.getBoundingClientRect().top ;
     const divBottom = refArrays[i].current!.getBoundingClientRect().bottom
  
     if(divBottom<0){
      if(i===0){setreffone(false)}

      else if(i===1){setrefftwo(false)}
      else if(i===2){setreffthree(false)}
      else{setrefffour(false)}
     }


       else if (divTop < height || divBottom<height) {
      
        if(i===0){setreffone(true)}

        else if(i===1){setrefftwo(true)}
        else if(i===2){setreffthree(true)}
        else{setrefffour(true)}
        
     }

     else if(divTop> height || divBottom>height){

      if(i===0){setreffone(false)}

        else if(i===1){setrefftwo(false)}
        else if(i===2){setreffthree(false)}
        else{setrefffour(false)}

     }
  
    }
 }

}
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [retails]);


const getClass = (id:any)=>{
  if(id===0){
    if(reffone){
      return Stylestwo.divHolderRef
    }
    else{
      return Stylestwo.divHolder
    }
  }
  else if(id ===1){
    if(refftwo){
      return Stylestwo.divHolderRefRight
    }
    else{
      return Stylestwo.divHolderRight
    }
  }

  else if(id===2){
    if(reffthree){
      return Stylestwo.divHolderRef
    }
    else{
      return Stylestwo.divHolder
    }
  }

  else if(id===3){
    if(refffour){
      return Stylestwo.divHolderRefRight
    }
    else{
      return Stylestwo.divHolderRight
    }
  }
}

  return (
    <div className={styles.mainview}>
    <section style={{width:width>750?'45%':'90%',textAlign:'center',fontStyle:'normal',fontWeight:'bolder',fontFamily:" 'Merriweather', serif; ",alignItems:'center',justifyContent:'center',fontSize:'25px',letterSpacing:'1.5px',height:'auto',marginTop:'15px',boxShadow:'0px 1px 0px rgb(196, 192, 192)',margin:'20px auto',backgroundColor:'rgb(251, 249, 249)',padding:'15px 0px'}}>
      get paid for posting pictures today!
    </section>
    <section style={{display:'flex',position:'relative',flexDirection:width>750?'row':'column',width:'100%',justifyContent:'space-around',alignItems:'center',height:width>750?'400px':'auto',marginTop:'50px'}}>
      <div style={{width:width>750?'25%':'85%',margin:'10px auto',height:width>750?'100%':'400px',display:'flex',flexDirection:'column',alignItems:'left',justifyContent:'space-around',fontStyle:'normal',fontWeight:'bolder',fontFamily:" 'Abril Fatface', cursive; "}}>
        <p style={{fontSize:'35px',letterSpacing:'1.5px'}}>Melting point for buyers, digital creators, models and SME's</p>
        <p style={{width:'100px',padding:'15px 15px',textAlign:'center',marginTop:'10px',backgroundColor:'black',color:'white',boxShadow:'0px 0px 3px black',fontSize:'15px',fontFamily:" 'Merriweather', serif; "}}><Link href={'/postauth/landingpage'}>explore</Link></p>
      </div>


      {retails && <>{sectHolder.map((sect:any,index:any)=><div style={{margin:'55px auto',width:'90%',height:'auto',position:'relative'}}>
        
        <div ref= {index===0?RefOne:index===1?RefTwo:index===2?RefThree:RefFour} style={{height:'300px',width:'100%'}}>
        <div className={getClass(index)}>
        <div style={{width:'100%',position:'absolute',top:'0px',left:'0px',zIndex:'4',boxShadow:'0px 1px 0px rgb(196, 192, 192)',backgroundColor:sect?.color,padding:'10px',height:'100%',borderRadius:'10px',display:'flex',justifyContent:'space-around',paddingTop:'30px',alignItems:'center'}}>
        <p style={{width:'60px',position:'absolute',height:'60px',top:'0px',left:'50%',transform:'translate(-50%,-50%)',zIndex:'-3',borderRadius:"50%",backgroundColor:sect?.color}}></p>
        <p style={{width:'30px',position:'absolute',height:'30px',top:'0px',left:'50%',transform:'translate(-50%,-50%)',zIndex:'-2',borderRadius:"50%",backgroundColor:'rgb(228,228,228)'}}></p>
            <div style={{width:'47%',height:'250px'}}>
              <img src={sect?.link.src} alt='' style={{width:'100%',borderRadius:'10px 0px 0px 10px',height:'100%',objectFit:"cover"}}/>
            </div>

            <div style={{width:'47%',height:'250px',position:'relative',backgroundColor:'transparent'}}>
              <div style={{position:'absolute',zIndex:'3',backgroundColor:'black',opacity:'0.3',borderRadius:'0px 10px 10px 0px',top:'0px',left:'0px',height:'100%',width:'100%'}}></div>
              <div style={{position:'absolute',zIndex:'5',backgroundColor:'transparent',top:'0px',left:'0px',height:'100%',width:'100%',color:'black',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                {sect?.items.map((item:any)=><div style={{width:'90%',margin:'auto',display:'flex',justifyContent:'space-between',alignItems:"center",color:'white',fontFamily:'NexaTextLight'}}><p style={{padding:'5px',height:'auto',borderRadius:'2.5px',width:'auto',backgroundColor:'white'}}><img src={item?.img?.src} style={{width:'40px',height:'40px',objectFit:'cover'}}/></p> <p>{item?.item}</p></div>)}
              </div>
            </div>
        </div>
        </div>
        </div>

      </div>)}</>}
  

    </section>
    
    
</div>
  )
}

export default MiniLandingPage