import { Container,LogoutBtn } from ".."
import {  useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"




function Header() {

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()
//console.log(authStatus);
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
            <nav className="flex justify-between text-3xl my-4 py-2 shadow-sm">
                <div>
                    <Link to="/">
                    logo
                    </Link>
                </div>
                <ul className="flex justify-between gap-6">
                   {navItems.map((item) => 
                     item.active ?(
                        <li key={item.name} > 
                          <Button variant="default"  onClick={() => navigate(item.slug)} >{item.name}</Button>
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