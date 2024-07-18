import React from "react";
import { useContext } from "react";
import { createContext } from "react";

const blogContext = createContext({})

const ContextProvider = ({children})=>{
    const context = {
        isLoggedIn:false,
        profilePic:""
    }
    const setLoggedIn = ()=>{}
    return (
        <blogContext.Provider value={{context,setLoggedIn}}>
            {children}
        </blogContext.Provider>
    )
}

export const useBlogContext = ()=>{
    return useContext(blogContext)
}

export default ContextProvider;