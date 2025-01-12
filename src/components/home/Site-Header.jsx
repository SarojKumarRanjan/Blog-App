

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux";




export function SiteHeader() {

    const authStatus = useSelector((state) => state.auth.status);


    const navItems = [
        {
          name: "Home",
          slug: "/",
          active: true,
        },
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
        },
        {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
        },
        {
          name: "All Post",
          slug: "/all-post",
          active: authStatus,
        },
        {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
        },
        {
          name:"Profile",
          slug:"/profile",
          active:authStatus
        }
      ];

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-8">
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/destinations" className={`text-sm ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>Destinations</Link>
            <ul className="flex justify-between gap-6">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <Link to={item.slug} className={`text-sm ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
                <Button variant="default">
                  {item.name}
                </Button>
                </Link>
                {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
              </li>
            ) : null
          )}
          
        </ul>
          </nav>
        </div>
        
      </div>
    </header>
  )
}

