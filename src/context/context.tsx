import React ,{ useContext, createContext,useState,ReactNode } from "react";

type showMobile = {
    viewmobile: boolean,
    setViewMobile : any,
    avatarUrl: string,
    name: string,
    username: string,
    setName: any,
    setAvatarUrl: any,
    setUsername: any,
    signed:boolean,
    setSigned: any
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
  setName :()=>{},
  setAvatarUrl:()=>{},
  setUsername:()=>{},
  name:'',
  username:''})



export const ContextProvider = ({children}:ChildrenProps) => {
    const [viewmobile,setViewMobile] = useState(false)
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [signed,setSigned] = useState(false)
  return (
    <retailContext.Provider value={{viewmobile,setViewMobile,name,signed,setSigned,setName,username,setUsername,avatarUrl, setAvatarUrl}}>
        {children}
    </retailContext.Provider>
  )
}

export const useRetailContext = ()=>useContext(retailContext)