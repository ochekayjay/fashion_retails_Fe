import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Navbar.module.css'
import creatorIcon from '../../iconholder/creator_corner.svg'
import seachcreatorIcon from '../../iconholder/search_creator.svg'
import topcreatorIcon from  '../../iconholder/top_creator.svg'
import becomecreatorIcon from '../../iconholder/become_creator.svg'
import lowerdirectionIcon from '../../iconholder/subdirectory.svg'
import signinIcon from '../../iconholder/login.svg'
import signoutIcon from '../../iconholder/logout.svg'
import signupIcon from '../../iconholder/signup.svg'
import searchIcon from '../../iconholder/search.svg'
import menuIcon from '../../iconholder/menu.svg'
import Image from 'next/image' 
import Link from 'next/link'
import useWindowResize from '../windowdimension'
import { useRetailContext } from '@/context/context'


type showMobile = {
  viewmobile: boolean,
  setViewMobile : any,

}

function Navbar({viewmobile,setViewMobile}:showMobile) {
  const {width,height} = useWindowResize()
  const {signed,name,username,avatarUrl} = useRetailContext()
  return (
    <>
    <Head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap');

        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Merriweather:wght@900&display=swap');
      </style>
    </Head>
    <section className={width>800?styles.navMainHolder:viewmobile?styles.navMainMobile:styles.navMobileOff}>
        <div style={{width:'100%',margin:'20px auto',display:'flex',justifyContent:'space-between',padding:'15px 10px',alignItems:"center",height:'40px'}}>
        <p style={{width:'80%',alignItems:'center',display:'flex',justifyContent:'left',padding:'10px 0px 0px',fontSize:width>800?'30px':'20px',fontWeight:'bolder',fontFamily:" 'Abril Fatface', cursive; "}}>
          <span style={{padding:'10px',width:'auto',borderRadius:"50%",display:'flex',alignItems:'center',justifyContent:'center'}}><Image alt='test' src={creatorIcon}/></span>
          <span style={{display:'flex',alignItems:"center",justifyContent:"center",fontFamily:"NexaTextBold"}}>Creator's Corner</span>
        </p>
        <p onClick={()=>setViewMobile(!viewmobile)} style={{width:'10%',height:'20px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <Image alt='menu' src={menuIcon}/>
        </p>
        </div>

      <div style={{width:'100%',minHeight:'100vh',overflow: 'auto'}}>
        <div className={styles.navdivs}>
          <p className={styles.creatorsects}><span className={styles.navspanIcon}><Image alt='searchCreator' src={seachcreatorIcon}/></span><span className={styles.navlogospan}>Search for Creators</span></p>
          <p style={{width:'80%',position:'relative',height:'50px',marginTop:'15px',borderRadius:'10px'}}>
              <input style={{width:'100%',height:'100%',borderRadius:'10px',paddingLeft:'10px',outline:'none',borderWidth:'0px 0px 0px'}}/>
              <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><Image alt='search' src={searchIcon}/></span>
          </p>
        </div>
        <div className={styles.navdivs}>
          <p className={styles.creatorsects}><span className={styles.navspanIcon}><Image alt='top creators' src={topcreatorIcon} /></span><span className={styles.navlogospan}>Top Creators</span></p>
        </div>
        {signed?
        <div className={styles.navdivs}>
            <p className={styles.creatorsects}><span className={styles.navspanIcon}><Image alt='become a creator' src={becomecreatorIcon}/></span><span className={styles.navlogospan}>WELCOME</span></p>
        <div className={styles.creatorsectsInnerUser}>
            <div style={{height:'80px',width:'80px',borderRadius:'50%',border:'3px solid rgb(70, 70, 70)',position:'relative'}}><Image quality={100} fill={true} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:"cover"}}  src={avatarUrl} alt="user avatar"/></div>
            <div style={{width:'150px',height:'auto',display:'flex',justifyContent:"center",alignItems:'left',flexDirection:'column'}}>
              <p style={{fontFamily:"NexaTextLight",fontSize:'18px',textAlign:"center",marginBottom:"10px"}}>{username}</p>
              <p style={{fontFamily:"NexaTextLight",fontSize:'12px',textAlign:"center",marginBottom:"10px"}}>{name}</p>
              <Link href={'../../postauth/userpage'}>
                <p onClick={()=>setViewMobile(!viewmobile)} style={{padding:'5px',boxShadow: '1px 1px 5px rgb(91, 90, 90)',backgroundColor:'white',borderRadius:"3px",textAlign:"center",width:'60%',margin:'0px auto'}}>profile</p>
              </Link>
              
            </div>
        </div>
        <p className={styles.creatorsectsInner}><span className={styles.navspanIcon}><Image src={lowerdirectionIcon} alt='lowerdirect'/></span><p style={{display:'flex',justifyContent:'left',fontSize:'14px'}}><span className={styles.navspanIcon}><Image src={signoutIcon} alt='signout'/></span><span style={{display:'flex',alignItems:"center"}}>SIGN OUT</span></p></p>
      </div>:
        <div className={styles.navdivs}>
          <p className={styles.creatorsects}><span className={styles.navspanIcon}><Image alt='become a creator' src={becomecreatorIcon}/></span><span className={styles.navlogospan}>Become a Creator</span></p>
          <Link href={'../../preauth/signup'}><p onClick={()=>setViewMobile(!viewmobile)} className={styles.creatorsectsInner}><span className={styles.navspanIcon}><Image src={lowerdirectionIcon} alt='lowerdirect'/></span><p style={{display:'flex',justifyContent:'left',fontSize:'14px'}}><span className={styles.navspanIcon}><Image src={signupIcon} alt='signup'/></span><span style={{display:'flex',alignItems:"center"}}>SIGN UP</span></p></p></Link>
          <Link href={'../../preauth/signin'}><p onClick={()=>setViewMobile(!viewmobile)} className={styles.creatorsectsInner}><span className={styles.navspanIcon}><Image src={lowerdirectionIcon} alt='lowerdirect'/></span><p style={{display:'flex',justifyContent:'left',fontSize:'14px'}}><span className={styles.navspanIcon}><Image src={signinIcon} alt='signin'/></span><span style={{display:'flex',alignItems:"center"}}>SIGN IN</span></p></p></Link>
          <p className={styles.creatorsectsInner}><span className={styles.navspanIcon}><Image src={lowerdirectionIcon} alt='lowerdirect'/></span><p style={{display:'flex',justifyContent:'left',fontSize:'14px'}}><span className={styles.navspanIcon}><Image src={signoutIcon} alt='signout'/></span><span style={{display:'flex',alignItems:"center"}}>SIGN OUT</span></p></p>
        </div>}
        </div>
    </section>
    </>
  )
}

export default Navbar