import Head from 'next/head'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import imgOne from '../../public/images/1681676340516.jpg'
import imgTwo from '../../public/images/1681676340500.jpg'
import imgThree from '../../public/images/1681676340544.jpg'
import { crop_one,crop_two,crop_three } from '@/utils/cropImage'
import useWindowResize from '@/utils/windowdimension'
import Imagecarousel from '@/utils/carousel'
import Link from 'next/link'
import cropbone from '../../public/crops/crop_babe_one.jpg'
import cropbtwo from '../../public/crops/crop_babe_two.jpg'
import cropgone from '../../public/crops/crop_guy_one.jpg'
import croppgtwo from '../../public/crops/crop_guy_two.jpg'
import secondcfo from '../../public/crops/SecondCFO.jpg'
import secondcft from '../../public/crops/SecondCFT.jpg'
import secondcmo from '../../public/crops/SecondCMO.jpg'
import secondcmt from '../../public/crops/SecondCMT.jpg'
import thirdcfo from '../../public/crops/ThirdCFO.jpg'
import thhirdcft from '../../public/crops/ThirdCFT.jpg'
import thirdcmo from '../../public/crops/ThirdCMO.jpg'
import thirdcmt from '../../public/crops/ThirdCMT.jpg'
import ring from '../../src/iconForLanding/rings.svg'
import necklace from '../../src/iconForLanding/necklace.svg'
import wig from '../../src/iconForLanding/wig.svg'

import MiniLandingPage from '../utils/pre_auth/miniLandingPage'

import ColorThief from "color-thief-ts"



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  interface cropImgaes{
    source: any;
    alt: string;
    id: number;
    views:number
  }

  const {width,height} = useWindowResize()

  const viewnumbers = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 736q75 0 127.5-52.5T660 556q0-75-52.5-127.5T480 376q-75 0-127.5 52.5T300 556q0 75 52.5 127.5T480 736Zm0-72q-45 0-76.5-31.5T372 556q0-45 31.5-76.5T480 448q45 0 76.5 31.5T588 556q0 45-31.5 76.5T480 664Zm0 192q-146 0-266-81.5T40 556q54-137 174-218.5T480 256q146 0 266 81.5T920 556q-54 137-174 218.5T480 856Zm0-300Zm0 220q113 0 207.5-59.5T832 556q-50-101-144.5-160.5T480 336q-113 0-207.5 59.5T128 556q50 101 144.5 160.5T480 776Z"/></svg>
  const[cropArray,setcropArray] = useState<cropImgaes[][]>([
    [{source:crop_one[0],alt:'crop guy one',id:1,views:34},
    {source:crop_two[0],alt:'crop babe one',id:2,views:120},
    {source:crop_three[0],alt:'crop guy two',id:3,views:205}],
    [{source:crop_one[1],alt:'crop guy one',id:1,views:56},
    {source:crop_two[1],alt:'crop babe one',id:2,views:722},
    {source:crop_three[1],alt:'crop guy two',id:3,views:5}],
    [{source:crop_one[2],alt:'crop guy one',id:1,views:30},
    {source:crop_two[2],alt:'crop babe one',id:2,views:42},
    {source:crop_three[2],alt:'crop guy two',id:3,views:20}],
    [{source:crop_one[3],alt:'crop guy one',id:1,views:456},
    {source:crop_two[3],alt:'crop babe one',id:2,views:41},
    {source:crop_three[3],alt:'crop guy two',id:3,views:100}]
  ])

  const imgs = [cropbone,cropbtwo,cropgone,croppgtwo,secondcfo,secondcft,secondcmo,secondcmt,thirdcfo,thhirdcft,thirdcmo,thirdcmt]
  
  let finalcol : any []
  const extractColor = async(url:any)=>{
    const colorThief = new ColorThief();
    const dominantColor = await colorThief.getColorAsync(url);  
    }

    const extractedColorArr = ['#8d5942','#857f7e','#b4aaaf','#936b57','#231c1b','#9f9f9f','#ced5e9','#7f7c80','#6D7075','#BBAA77','#EBECF1','#494838','#F269A9','#2C575A','#D4511B']
    useEffect(()=>{
        const getColor = async()=>{
            console.log(imgs[0])
            const col = await extractColor(imgs[0].src)

            console.log(col)
         

        
        }
        getColor()
        //console.log(finalcol)
    },[])

    
  
  
  
  
  return (
    <>
    <Head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap');

    @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Merriweather:wght@900&display=swap');
</style>
    </Head>
    {width>750?<div className={styles.mainview}>
       
        <p style={{marginTop:"30px",color:'black',textAlign:'center',letterSpacing:"2px",fontFamily:'NexaTextLight',fontSize:"25px"}}>Please, revert to mobile view. Webview still in the pipeline</p>
    </div>: <MiniLandingPage/>}
    </>
  )
}



/**
 *  <section style={{width:width>750?'45%':'90%',textAlign:'center',fontStyle:'normal',fontWeight:'bolder',fontFamily:" 'Merriweather', serif; ",alignItems:'center',justifyContent:'center',fontSize:'25px',letterSpacing:'1.5px',height:'auto',marginTop:'15px',boxShadow:'0px 1px 0px rgb(196, 192, 192)',margin:'20px auto',backgroundColor:'rgb(251, 249, 249)',padding:'15px 0px'}}>
          get paid for posting pictures today!
        </section>
        <section style={{display:'flex',position:'relative',flexDirection:width>750?'row':'column',width:'100%',justifyContent:'space-around',alignItems:'center',height:width>750?'400px':'auto',marginTop:'50px'}}>
          <div style={{width:width>750?'25%':'85%',margin:'10px auto',height:width>750?'100%':'400px',display:'flex',flexDirection:'column',alignItems:'left',justifyContent:'space-around',fontStyle:'normal',fontWeight:'bolder',fontFamily:" 'Abril Fatface', cursive; "}}>
            <p style={{fontSize:'35px',letterSpacing:'1.5px'}}>Melting point for buyers, digital creators, models and SME's</p>
            <p style={{width:'100px',padding:'15px 15px',textAlign:'center',marginTop:'10px',backgroundColor:'black',color:'white',boxShadow:'0px 0px 3px black',fontSize:'15px',fontFamily:" 'Merriweather', serif; "}}><Link href={'/postauth/landingpage'}>explore</Link></p>
          </div>
        {width>750?<div style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:width>750?'65%':'300%',height:width>750?'100%':'550px',overflow:'hidden',position:width>750?"static":'absolute',bottom:'0px',left:'0px'}}>
                <div style={{width:'30%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'rgb(251, 249, 249)',border:'0px 0px 3px black',borderRadius:'5px',justifyContent:'space-around',flexDirection:'column'}}>
                  <Image style={{height:'88%',width:width>750?'90%':'60%',objectFit:'cover'}} src={imgOne} alt='landing images'/>
                  <p style={{fontFamily:" 'Abril Fatface', cursive; ",fontSize:'18px',fontWeight:'bolder',letterSpacing:'1.5px',textAlign:'center'}}>TRAININGS</p>
                </div>
                <div style={{width:'30%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'rgb(251, 249, 249)',border:'0px 0px 3px black',borderRadius:'5px',justifyContent:'space-around',flexDirection:'column'}}>
                  <Image style={{height:'88%',width:'90%',objectFit:'cover'}} src={imgTwo} alt='landing images'/>
                  <p style={{fontFamily:" 'Abril Fatface', cursive; ",fontSize:'18px',fontWeight:'bolder',letterSpacing:'1.5px',textAlign:'center'}}>OUTDOOR</p>
                </div>
                <div style={{width:'30%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'rgb(251, 249, 249)',border:'0px 0px 3px black',borderRadius:'5px',justifyContent:'space-around',flexDirection:'column'}}>
                  <Image style={{height:'88%',width:'90%',objectFit:'cover'}} src={imgThree} alt='landing images'/>
                  <p style={{fontFamily:" 'Abril Fatface', cursive; ",fontSize:'18px',fontWeight:'bolder',letterSpacing:'1.5px',textAlign:'center'}}>WORKOUTS</p>
                </div>
        </div>: <Imagecarousel/>}
        </section>
        <section style={{width:'100%',margin:'50px auto',height:width>750?'500px':'auto',display:'flex',flexDirection:width>750?'row':'column-reverse',alignItems:'center',justifyContent:'space-around'}}>
            <div style={{width:width>750?'60%':'95%',margin:width>750?"":'0px auto',height:'90%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                <div className={styles.bigerholder} >
                  {cropArray.map(crops=><div key={cropArray.indexOf(crops)} className={styles.imagecropHolder} >
                  <div className={width>750?(cropArray.indexOf(crops)+1)%2===0? styles.imagetagDivC: styles.imagetagDivR:styles.imageTagAll} >
                  <div className={styles.justbeforeImg} >
                    <div className={styles.imgspanHold}><Image alt={crops[0].alt} src={crops[0].source} /><span style={{backgroundColor:'white',transform:'translateX(-50%)',position:'absolute',bottom:'10px',left:'50%',borderRadius:'10px',width:'100px',padding:'15px',boxShadow:'0px 0px 13px rgb(91, 90, 90)',opacity:'0.65',display:'flex',justifyContent:'center',alignItems:'center'}}>{viewnumbers}{`   ${crops[0].views}`}</span></div>
                    <div className={styles.imgspanHold}><Image alt={crops[1].alt} src={crops[1].source} /><span style={{backgroundColor:'white',transform:'translateX(-50%)',position:'absolute',bottom:'10px',left:'50%',borderRadius:'10px',width:'100px',padding:'15px',boxShadow:'0px 0px 13px rgb(91, 90, 90)',opacity:'0.65',display:'flex',justifyContent:'center',alignItems:'center'}}>{viewnumbers}{`   ${crops[1].views}`}</span></div>
                    <div className={styles.imgspanHold}><Image alt={crops[2].alt} src={crops[2].source} /><span style={{backgroundColor:'white',transform:'translateX(-50%)',position:'absolute',bottom:'10px',left:'50%',borderRadius:'10px',width:'100px',padding:'15px',boxShadow:'0px 0px 13px rgb(91, 90, 90)',opacity:'0.65',display:'flex',justifyContent:'center',alignItems:'center'}}>{viewnumbers}{`   ${crops[2].views}`}</span></div>
                    <div className={styles.imgspanHold}><Image alt={crops[0].alt} src={crops[0].source} /><span style={{backgroundColor:'white',transform:'translateX(-50%)',position:'absolute',bottom:'10px',left:'50%',borderRadius:'10px',width:'100px',padding:'15px',boxShadow:'0px 0px 13px rgb(91, 90, 90)',opacity:'0.65',display:'flex',justifyContent:'center',alignItems:'center'}}>{viewnumbers}{`   ${crops[0].views}`}</span></div>
                  </div>
                  </div>
                  <p className={width>750?(cropArray.indexOf(crops)+1)%2===0?styles.imageLowR:styles.imageLowC:styles.imageLowAll} ></p>
                  </div>)}
                </div>
            </div>
          <div style={{width:width>750?'30%':'80%',margin:width>750?"":'20px auto',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',height:width>750?'90%':'500px',backgroundColor:'#002408',borderRadius:'45px 10px 45px 10px'}}>
              <p style={{backgroundColor:'#F9F871',textAlign:'center',height:'0.1px',width:'90%'}}>

              </p>
              <p style={{backgroundColor:'#F9F871',textAlign:'center',height:'0.1px',width:'90%'}}>

              </p>
              <p style={{backgroundColor:'#F9F871',textAlign:'center',height:'0.1px',width:'90%'}}>

              </p>
              <p style={{backgroundColor:'#F9F871',textAlign:'center',height:'0.1px',width:'90%'}}>

              </p>
          </div>
          
        </section>
 */