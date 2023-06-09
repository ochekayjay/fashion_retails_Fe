import React ,{ useContext, createContext,useState,ReactNode } from "react";

type showMobile = {
    viewmobile: boolean,
    setViewMobile : any,
    avatarUrl: string,
    name: string,
    username: string,
    id: any,
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
    setFocusedItem:any,
    userHashTags:any,
    setUserHashatags:any,
    searchedUserId: any,
    setSearchedUserId: any,
    allGallery: any,
    setAllGallery: any,
    searches: any,
    setSearches: any
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
  id: null,
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
  setFocusedItem: ()=>{},
  userHashTags:null,
  setUserHashatags: ()=>{},
  searchedUserId : null,
  setSearchedUserId: ()=>{},
  allGallery : null,
  setAllGallery : ()=>{},
  searches : null,
  setSearches : ()=>{}})



export const ContextProvider = ({children}:ChildrenProps) => {
    const [viewmobile,setViewMobile] = useState(false)
    const [name,setName] = useState('')
    const [userbio,setUserbio] = useState('')
    const [username,setUsername] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [signed,setSigned] = useState(false)
    const [id,setId] = useState(null)
    const [userData,setUserData] = useState(null)
    const [galleryData,setGalleryData] = useState(null)
    const [focusedItem,setFocusedItem] = useState(null)
    const [userHashTags,setUserHashatags] = useState(null)
    const [searchedUserId,setSearchedUserId] = useState(null)
    const [allGallery,setAllGallery] = useState(null)
    const [searches,setSearches] = useState(null)
  return (
    <retailContext.Provider value={{searches,setSearches,allGallery,setAllGallery,searchedUserId,setSearchedUserId,userHashTags,setUserHashatags,focusedItem,setFocusedItem,galleryData,setGalleryData,viewmobile,setViewMobile,userData,setUserData,userbio,setUserbio,name,signed,setSigned,setName,username,setUsername,avatarUrl, setAvatarUrl,id,setId}}>
        {children}
    </retailContext.Provider>
  )
}

export const useRetailContext = ()=>useContext(retailContext)