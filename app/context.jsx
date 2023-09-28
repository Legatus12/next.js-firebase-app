"use client"

import { createContext, useState, useEffect } from "react"
import { auth } from "./fb"

//

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged((credentials) => {
          if(credentials) {
            setUser(credentials)
            console.log(user)
            //router.push('/dashboard')
          } else {
            //router.push('/')
          }
        })
    })

    const values = {
        user,
        loading: null
    }

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    )

}