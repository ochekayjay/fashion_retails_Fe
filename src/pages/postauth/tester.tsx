import React from 'react'

function Tester() {
  return (
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:"center"}}>
        <div style={{width:'300px',height:'300px',position:"relative",backgroundColor:'red',overflow:'hidden'}}>
            <div style={{position:'absolute',height:'100px',width:'40px',top:'0px',left:'0px',backgroundColor:'yellow',transform:'rotate(-45deg)'}}></div>
            <div style={{position:'absolute',height:'100px',width:'40px',bottom:'0px',right:'0px',backgroundColor:"green",transform:'rotate(45deg)'}}></div>
        </div>
    </div>
  )
}

export default Tester