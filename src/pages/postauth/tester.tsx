import React from 'react'



export async function getStaticProps() {

  //https://fashion-r-services.onrender.com
  //http://localhost:5005
  
    const res = await fetch(`https://fashion-r-services.onrender.com/content/hashbrowse/`,{
    method: 'GET',  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    
        }
    });
    const data = await res.json()
    
  return { props: { data} };
  }


 

export default function Tester({data}:any) {
  return (
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:"center"}}>
        <div style={{width:'300px',height:'300px',position:"relative",backgroundColor:'red',overflow:'hidden'}}>
            <div style={{position:'absolute',height:'100px',width:'40px',top:'0px',left:'0px',backgroundColor:'yellow',transform:'rotate(-45deg)'}}></div>
            <div style={{position:'absolute',height:'100px',width:'40px',bottom:'0px',right:'0px',backgroundColor:"green",transform:'rotate(45deg)'}}></div>
        </div>
    </div>
  )
}

