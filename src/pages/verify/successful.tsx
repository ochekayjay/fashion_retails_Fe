import React,{useState,useEffect} from 'react'
import { Loader } from '@mantine/core'
import useWindowResize from '@/utils/windowdimension'

function creator() {
    
const {width,height} = useWindowResize()
  return (
    <div style={{height:'100vh',width:'100vw',backgroundColor:'rgb(228,228,228)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <section style={{width:width>700?'50%':'85%',backgroundColor:'white',borderRadius:'15px',boxShadow:'1px 1px 5px rgb(91, 90, 90)',height:"50%"}}>
            <p style={{fontFamily:'NexaTextBold',fontSize:'30px',textAlign:'center',width:width>750?'auto':'80%',boxSizing:'border-box',margin:'20px auto'}}>Igoche fashion Retails</p>
         
            <div style={{width:'80%',margin:"20px auto",marginTop:'40px',height:'auto',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                <p style={{fontFamily:'NexaTextLight',fontSize:'14px',margin:'10px 0px'}}>Mail verified</p>
                <p style={{fontFamily:'NexaTextBold',fontSize:width>850?'35px':'20px',textAlign:"center"}}>CONGRATULATIONS!!!</p>
                <p style={{fontFamily:'NexaTextLight',fontSize:'14px',margin:'10px 0px'}}>go back to the sign in page.</p>
            </div>
        </section>
    </div>
  )
}

export default creator