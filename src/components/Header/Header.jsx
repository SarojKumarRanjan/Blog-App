import { Container,LogoutBtn } from ".."
import {  useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"




function Header() {

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const navItems = [
        {
            name:"Home",
            slug:"/",
            active:true
        },
        {
            name:"Login",
            slug:"/login",
            active:!authStatus
        },{
            name:"Signup",
            slug:"/signup",
            active:!authStatus
        },
        {
            name:"All Post",
            slug:"/all-post",
            active:authStatus
        },
        {
            name:"Add Post",
            slug:"/add-post",
            active:authStatus
        }
    ]

  return (
    
        <Container>
            <nav className="flex">
                <div>
                    <Link to="/">
                    logo
                    </Link>
                </div>
                <ul className="flex">
                   {navItems.map((item) => 
                     item.active ?(
                        <li key={item.name}> 
                          <Button onClick={() => navigate(item.slug)} variant="link">{item.name}</Button>
                        </li>
                     )  : null
                   )}
                         {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                         )}
                </ul>
            </nav>
        </Container>
    
  )
}

export default Header