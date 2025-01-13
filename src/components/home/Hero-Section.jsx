import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"



export function HeroSection() {
    return (
      <section className="relative h-screen mt-16 md:mt-0">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80")',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          The Adventure Begins Here
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Discover breathtaking landscapes and unforgettable experiences through our curated collection of adventure stories
        </p>
        <Link to="/all-post">
        <Button className="bg-white text-black hover:bg-gray-200">
          Explore Now
        </Button>
        </Link>
      </div>
    </section>
    )
  }
  