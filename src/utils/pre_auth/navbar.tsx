import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Landingpage.module.css'
import creatorIcon from '../../iconholder/creator_corner.svg'
import seachcreatorIcon from '../../iconholder/search_creator.svg'
import topcreatorIcon from  '../../iconholder/top_creator.svg'
import becomecreatorIcon from '../../iconholder/become_creator.svg'
import lowerdirectionIcon from '../../iconholder/subdirectory.svg'
import signinIcon from '../../iconholder/login.svg'
import signoutIcon from '../../iconholder/logout.svg'
import signupIcon from '../../iconholder/signup.svg'
import searchIcon from '../../iconholder/search.svg'
import Image from 'next/image' 
import Link from 'next/link'


function Navbar() {
  return (
    <>
    <Head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@900&display=swap');

        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Merriweather:wght@900&display=swap');
      </style>
    </Head>
    <section style={{position:'fixed',top:"0px",left:'0px',width:'25%',backgroundColor:'white',height:'100vh',overflow:'auto'}}>
        <p style={{width:'80%',margin:'20px auto',textAlign:'center',display:'flex',justifyContent:'space-around',padding:'15px 0px',fontSize:'30px',fontWeight:'bolder',fontFamily:" 'Abril Fatface', cursive; "}}>
          <span style={{padding:'10px',width:'auto',borderRadius:"50%",display:'flex',alignItems:'center',justifyContent:'center'}}><Image alt='test' src={creatorIcon}/></span>
          <span style={{display:'flex',alignItems:"center",justifyContent:"center",fontFamily:"NexaTextBold"}}>Creator's Corner</span>
        </p>

        <div className={styles.navdivs}>
          <p className={styles.creatorsects}><span className={styles.navspanIcon}><Image alt='searchCreator' src={seachcreatorIcon}/></span><span className={styles.navlogospan}>Search for Creators</span></p>
          <p style={{width:'80%',position:'relative',height:'50px',marginTop:'15px',borderRadius:'10px'}}>
              <input style={{width:'100%',height:'100%',borderRadius:'10px',paddingLeft:'10px',outline:'none',borderWidth:'0px 0px 0px'}}/>
              <span style={{position:'absolute',height:'100%',width:'50px',display:"flex",top:'0px',right:'0px',alignItems:'center',justifyContent:'center'}}><Image alt='search' src={searchIcon}/></span>
          </p>
        </div>
        <div className={styles.navdivs}>
          <p className={styles.creatorsects}><span className={styles.navspanIcon}><Image alt='top creators' src={topcreatorIcon}/></span><span className={styles.navlogospan}>Top Creators</span></p>
        </div>
        <div className={styles.navdivs}>
          <p className={styles.creatorsects}><span className={styles.navspanIcon}><Image alt='become a creator' src={becomecreatorIcon}/></span><span className={styles.navlogospan}>Become a Creator</span></p>
          <Link href={'../../preauth/signup'}><p className={styles.creatorsectsInner}><span className={styles.navspanIcon}><Image src={lowerdirectionIcon} alt='lowerdirect'/></span><p style={{display:'flex',justifyContent:'left',fontSize:'14px'}}><span className={styles.navspanIcon}><Image src={signupIcon} alt='signup'/></span><span style={{display:'flex',alignItems:"center"}}>SIGN UP</span></p></p></Link>
          <Link href={'../../preauth/signin'}><p className={styles.creatorsectsInner}><span className={styles.navspanIcon}><Image src={lowerdirectionIcon} alt='lowerdirect'/></span><p style={{display:'flex',justifyContent:'left',fontSize:'14px'}}><span className={styles.navspanIcon}><Image src={signinIcon} alt='signin'/></span><span style={{display:'flex',alignItems:"center"}}>SIGN IN</span></p></p></Link>
          <p className={styles.creatorsectsInner}><span className={styles.navspanIcon}><Image src={lowerdirectionIcon} alt='lowerdirect'/></span><p style={{display:'flex',justifyContent:'left',fontSize:'14px'}}><span className={styles.navspanIcon}><Image src={signoutIcon} alt='signout'/></span><span style={{display:'flex',alignItems:"center"}}>SIGN OUT</span></p></p>
        </div>
    </section>
    </>
  )
}

export default Navbar