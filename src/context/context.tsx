import React ,{ useContext, createContext,useState,ReactNode } from "react";

type showMobile = {
    viewmobile: boolean,
    setViewMobile : any
}

type ChildrenProps = {
    children: ReactNode;
  };

const retailContext = createContext<showMobile>({viewmobile:false,setViewMobile:()=>{}})



export const ContextProvider = ({children}:ChildrenProps) => {
    const [viewmobile,setViewMobile] = useState(false)
  return (
    <retailContext.Provider value={{viewmobile,setViewMobile}}>
        {children}
    </retailContext.Provider>
  )
}

export const useRetailContext = ()=>useContext(retailContext)