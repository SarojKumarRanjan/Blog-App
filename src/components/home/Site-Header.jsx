

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button } from "@/components/ui/button"


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

export function SiteHeader() {
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
                <Button variant="default" onClick={() => navigate(item.slug)}>
                  {item.name}
                </Button>
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

