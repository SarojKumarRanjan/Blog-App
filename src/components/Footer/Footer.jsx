import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Container } from ".."
import { Separator } from "../ui/separator"
import { Instagram, Twitter, Facebook, Youtube, TwitterIcon as TikTok } from 'lucide-react'

function Footer() {
  return (
    <Container>
    
    <footer className="">
    <div className="container mx-auto px-4 py-12">
    <Separator className="bg-gray-700 my-10"  />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1682687221248-3116ba6ab483"
              alt="Horizone"
              width={24} 
              height={24}
              className="object-contain"
            />
            <span className="font-semibold">Horizone</span>
          </Link>
          <p className="text-sm ">
            Our mission is to guide modern explorers with technology, knowledge, and stylish recommendations.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">About</h4>
          <ul className="space-y-2 text-sm ">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/career">Career</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm ">
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/refund">Refund</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Get Updates</h4>
          <div className="flex space-x-2 mb-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className=""
            />
            <Button>Subscribe</Button>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className=" ">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" className="">
              <TikTok className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm ">©2024 Horizone. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="text-sm ">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm ">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
  </Container>
  )
}

export default Footer;