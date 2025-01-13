
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import LogoutBtn from "@/components/Header/LogoutBtn";
import { ModeToggle } from '../Header/ToggleButton';
import { Menu,  } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];

  return (
    <nav className="fixed top-0 w-full z-50  backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold">
          Travel News
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) =>
            item.active ? (
              <Link key={item.name} to={item.slug}>
                <Button variant="ghost" className="text-sm">
                  {item.name}
                </Button>
              </Link>
            ) : null
          )}
          {authStatus && <LogoutBtn />}
          
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-4 mt-4">
                {navItems.map((item) =>
                  item.active ? (
                    <Link key={item.name} to={item.slug}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-lg"
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ) : null
                )}
                {authStatus && (
                  <div className="mt-2">
                    <LogoutBtn className="w-full justify-start text-lg" />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default SiteHeader;