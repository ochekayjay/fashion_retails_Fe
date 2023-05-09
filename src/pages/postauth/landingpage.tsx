import React, {useState} from 'react'
import Navbar from '@/utils/pre_auth/navbar'
import menuIcon from '../../iconholder/menu.svg'
import Image from 'next/image'
import useWindowResize from '@/utils/windowdimension'
import { useRetailContext } from '@/context/context'



interface MyComponentProps {}

  
const Landingpage = ()=> {
  
  const {width,height} = useWindowResize()
  const {viewmobile,setViewMobile} = useRetailContext()
  return (
    <div style={{display:'flex'}}>
        <Navbar viewmobile={viewmobile} setViewMobile={setViewMobile}/>
        <div style={{width:width>800?'75%':'100%',height:'100vh',position:'absolute',right:'0px',backgroundColor:'red'}}>
          <div onClick={()=>setViewMobile(!viewmobile)} style={{margin:'20px auto',width:'100%',boxSizing:"border-box",paddingLeft:"15px"}}>
            {width>800?"" :<Image alt='menu' src={menuIcon}/>}
          </div>
        </div>
    </div>
  )
}

export default Landingpage