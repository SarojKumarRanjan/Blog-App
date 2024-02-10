import { useNavigate } from "react-router-dom"
import {  useSelector } from "react-redux"
import { useEffect,useState } from "react"

// eslint-disable-next-line react/prop-types
export default function AuthLayout({children,authentication=true}) {

    const [loader,setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status )

useEffect(() =>{

    if (authentication && authStatus !== authentication) {
        navigate("/login")
    }
    else if(!authentication && authStatus !==authentication){
navigate("/")
    }
    setLoader(false)

},[authStatus,authentication,navigate])

  return loader ? <h1>Loading...</h1>: <>{children}</>
}

