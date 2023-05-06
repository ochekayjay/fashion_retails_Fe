import React from 'react'
import Link from 'next/link'
import styles from './Signup.module.css'

export default function signin() {
  return (
    <div style={{backgroundColor:'rgb(228,228,228)',height:'100vh',width:'100vw',display:"flex",alignItems:"center",justifyContent:"center"}}>
        <section style={{height:'50%',width:'85%',display:'flex',backgroundColor:"white",boxShadow:'1px 1px 5px rgb(91, 90, 90)'}}>
            
            <div style={{width:'80%',height:"100%",padding:'15px',boxSizing:'border-box'}}>
                <form style={{height:'100%',width:'100%'}}>
                    <section style={{width:'50%',margin:'0px auto',height:'70%',justifyContent:'space-around',display:"flex",flexDirection:'column'}}>
                        <p style={{fontFamily:'NexaTextBold',fontSize:'30px',textAlign:"center"}}> Enter Your Account </p>
                        <input  placeholder='user@gmail.com' type='email' className={styles.forminput}/>
                        <input placeholder='****' type='password' className={styles.forminput}/>
                        

                    </section>
                    <section style={{width:'100%',height:'30%',textAlign:'center'}}>
                        <button style={{fontFamily:'NexaTextLight',fontSize:'20px',width:'200px',height:'auto',padding:'5px',borderRadius:'25px',border:'3px solid white',backgroundColor:'rgb(70, 70, 70)',color:'white',textAlign:'center'}}>Sign Up</button>
                    </section>
                </form>
            </div>
            <div style={{width:'20%',height:'100%',backgroundColor:"rgb(70, 70, 70)"}}>
                <div style={{width:"100%",fontSize:'30px',fontFamily:"NexaTextBold",height:"50%",display:"flex",alignItems:"center",justifyContent:'center'}}>
                    <p style={{color:"white",width:'auto',padding:'10px 0px',height:'auto',textAlign:"center"}}>New Here?</p>
                </div>
                <div style={{width:"100%",height:"50%",display:"flex",alignItems:"center",justifyContent:'center'}}>
                    <Link href={'./signup'}><p style={{fontFamily:'NexaTextLight',fontSize:'20px',width:'200px',height:'auto',padding:'5px',borderRadius:'25px',border:'3px solid white',color:'rgb(70, 70, 70)',backgroundColor:'white',textAlign:'center'}}>SIGN UP</p></Link>
                </div>
            </div>
        </section>
    </div>
  )
}
