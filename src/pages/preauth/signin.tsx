import React, {useState,useEffect} from 'react'
import Link from 'next/link'
import styles from './Signup.module.css'
import { Loader } from '@mantine/core';
import useWindowResize from '@/utils/windowdimension'
import { useRetailContext } from '@/context/context';
import { useRouter } from 'next/router';






export default function signin() {

    const {setUsername,setAvatarUrl,setName,setSigned,setId,setUserbio} = useRetailContext()
    const {width,height} = useWindowResize()
    const [shownormal,setshowNormal] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const {push} = useRouter()

    const [enlistUserObj,setEnlistUserObj] = useState<any>({
        Password: "",
        Email: "",
    })

    const updateUserObj = (event:any)=>{
        setEnlistUserObj({...enlistUserObj,...{[event.target.name] : event.target.value}})
        
    }


    const submitUserInfo = async (event:any,enlistUserObj:any)=>{
        event.preventDefault()
        
        if( enlistUserObj.Password === '' || enlistUserObj.Email === '' ){
            setshowNormal(false)
        }

       else{

        try{
        setIsLoading(true)
        
        const createdCreator = await fetch('https://fashion-r-services.onrender.com/creator/signin', {
            method: 'POST',  
            headers: {
                    'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },    
            body: JSON.stringify(enlistUserObj)
            }); 
        const res = await createdCreator.json()
        if(res.status==='successful'){
            const {Username,name,avatarLink,Token,_id,bio} = res
            window.localStorage.setItem('token',Token)
            window.localStorage.setItem('id',_id)
            setIsLoading(false)
            setUsername(Username)
            setName(name)
            setAvatarUrl(avatarLink)
            setSigned(true)
            setId(_id)
            setUserbio(bio)
            push('/postauth/landingpage')

        }
        else if(res.status==='unverified'){
            console.log('successful')
        }

        else{
            console.log('failed')
        }
        console.log(res)
    }

    catch(error){
        setIsLoading(false)
    }
       } }

//'https://fashion-r-services.onrender.com/creator/signin',
  return (
    <div style={{backgroundColor:'rgb(228,228,228)',height:'100vh',width:'100vw',flexDirection:"column",display:"flex",alignItems:"center",justifyContent:"center"}}>
        
        <div style={{width:width>850?"65%":'85%',margin:'30px auto'}}>
            <p style={{width:'140px',boxShadow:'1px 1px 5px rgb(91, 90, 90)',marginLeft:'0px',textAlign:'center',padding:'10px 15px',boxSizing:'border-box',borderRadius:'15px',color:'black',backgroundColor:"white",fontFamily:'NexaTextLight',fontSize:'18px', letterSpacing:'1.5px',height:'auto'}}>back</p>
        </div>

        <section className={styles.innerSectionSignin} >
            
            <div className={styles.BigSectionSignin}>
            <p style={{textAlign:'center',letterSpacing:'2.0px',fontFamily:"NexaTextBold",marginBottom:'40px',marginTop:"15px",fontSize:width>750?'25px':'20px'}}>Enter Your Account</p>
                <form style={{height:'100%',width:'100%'}}>
                    <section style={{width:'100%',height:'95%',display:"flex",flexDirection:'column'}}>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Email &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input  value={enlistUserObj.Email} placeholder='user@gmail.com' type='email' name='Email' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.Email===""?styles.forminputUnfilled: styles.forminput}/>
                            </div>
                            <div style={{width:'100%',height:'auto',padding:'10px',margin:width>800?"":'25px auto'}}>
                                <p style={{fontFamily:'NexaTextBold',paddingLeft:'5px',fontSize:'13px',marginBottom:'5px',width:'100%',textAlign:'left'}}>Password &nbsp; <span style={{color:'red'}}>*</span></p>
                                <input value={enlistUserObj.Password} placeholder='****' type='password' name='Password' onChange={(event)=>{updateUserObj(event)}} className={shownormal?styles.forminput:enlistUserObj.Password===""?styles.forminputUnfilled: styles.forminput}/>
                            </div>
                        

                            <section style={{width:'100%',height:'30%',textAlign:'center',marginBottom:'20px',marginTop:'20px'}}>
                        <button onClick={(event)=>submitUserInfo(event,enlistUserObj)} style={{fontFamily:'NexaTextLight',fontSize:'20px',width:'200px',height:'auto',padding:'5px',borderRadius:'25px',border:'3px solid white',backgroundColor:'rgb(70, 70, 70)',color:'white',textAlign:'center'}}>{isLoading?<Loader color="white" size="sm" variant="bars" />: 'Sign In'}</button>
                    </section>
                    </section>
                  
                </form>
            </div>
            <div className={styles.smallSectionSignin}>
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
