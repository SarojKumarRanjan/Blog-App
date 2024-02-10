import { Button } from "@/components/ui/button"
import authService from "@/Appwrite/auth"
import { logout } from "@/Store/authSlice"
import {  useDispatch } from "react-redux"



function LogoutBtn() {

    const dispatch = useDispatch()

    // eslint-disable-next-line no-unused-vars
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {console.log("logout error",error);})
    }



  return <Button onClick={logoutHandler} variant="link">Logout</Button>
}

export default LogoutBtn