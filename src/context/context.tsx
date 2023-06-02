import React ,{ useContext, createContext,useState,ReactNode } from "react";

type showMobile = {
    viewmobile: boolean,
    setViewMobile : any,
    avatarUrl: string,
    name: string,
    username: string,
    id: string,
    setName: any,
    setId: any,
    setAvatarUrl: any,
    setUsername: any,
    signed:boolean,
    setSigned: any,
    userbio:string,
    setUserbio: any,
    userData: any,
    setUserData: any,
    galleryData: any,
    setGalleryData: any,
    focusedItem: any,
    setFocusedItem:any
}

type ChildrenProps = {
    children: ReactNode;
  };

const retailContext = createContext<showMobile>
({viewmobile:false,
  signed: false,
  setSigned:()=>{},
  setViewMobile:()=>{},
  avatarUrl:'',
  id: '',
  setId: ()=>{},
  setName :()=>{},
  setAvatarUrl:()=>{},
  setUsername:()=>{},
  name:'',
  userbio : '',
  setUserbio: ()=>{},
  username:'',
  userData: null,
  setUserData: ()=>{},
  galleryData: null,
  setGalleryData: ()=>{},
  focusedItem: null,
  setFocusedItem: ()=>{}})



export const ContextProvider = ({children}:ChildrenProps) => {
    const [viewmobile,setViewMobile] = useState(false)
    const [name,setName] = useState('')
    const [userbio,setUserbio] = useState('')
    const [username,setUsername] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [signed,setSigned] = useState(false)
    const [id,setId] = useState('')
    const [userData,setUserData] = useState(null)
    const [galleryData,setGalleryData] = useState(null)
    const [focusedItem,setFocusedItem] = useState(null)
  return (
    <retailContext.Provider value={{focusedItem,setFocusedItem,galleryData,setGalleryData,viewmobile,setViewMobile,userData,setUserData,userbio,setUserbio,name,signed,setSigned,setName,username,setUsername,avatarUrl, setAvatarUrl,id,setId}}>
        {children}
    </retailContext.Provider>
  )
}

export const useRetailContext = ()=>useContext(retailContext)