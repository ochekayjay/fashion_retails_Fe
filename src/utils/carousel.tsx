import { Carousel } from '@mantine/carousel'
import Head from 'next/head'
import Image from 'next/image'
import imgOne from '../../public/images/1681676340516.jpg'
import imgTwo from '../../public/images/1681676340500.jpg'
import imgThree from '../../public/images/1681676340544.jpg'

import React from 'react'

function Imagecarousel() {
  return (
    <>
    
    <Head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap');

    @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Merriweather:wght@900&display=swap');
</style>
    </Head>
    <Carousel maw={320} mx="auto" withIndicators height={550}>
    <Carousel.Slide>
    <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'rgb(251, 249, 249)',border:'0px 0px 3px black',borderRadius:'5px',justifyContent:'space-around',flexDirection:'column'}}>
                  <Image style={{height:'88%',width:'90%',objectFit:'cover'}} src={imgOne} alt='landing images'/>
                  <p style={{fontFamily:" 'Abril Fatface', cursive; ",fontSize:'18px',fontWeight:'bolder',letterSpacing:'1.5px',textAlign:'center'}}>TRAININGS</p>
                </div>
    </Carousel.Slide>
    <Carousel.Slide>
    <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'rgb(251, 249, 249)',border:'0px 0px 3px black',borderRadius:'5px',justifyContent:'space-around',flexDirection:'column'}}>
                  <Image style={{height:'88%',width:'90%',objectFit:'cover'}} src={imgTwo} alt='landing images'/>
                  <p style={{fontFamily:" 'Abril Fatface', cursive; ",fontSize:'18px',fontWeight:'bolder',letterSpacing:'1.5px',textAlign:'center'}}>OUTDOOR</p>
                </div>
    </Carousel.Slide>
    <Carousel.Slide>
    <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',backgroundColor:'rgb(251, 249, 249)',border:'0px 0px 3px black',borderRadius:'5px',justifyContent:'space-around',flexDirection:'column'}}>
                  <Image style={{height:'88%',width:'90%',objectFit:'cover'}} src={imgThree} alt='landing images'/>
                  <p style={{fontFamily:" 'Abril Fatface', cursive; ",fontSize:'18px',fontWeight:'bolder',letterSpacing:'1.5px',textAlign:'center'}}>WORKOUTS</p>
                </div>
    </Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
    </>
  )
}

export default Imagecarousel