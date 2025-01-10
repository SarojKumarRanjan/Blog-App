import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { SiteHeader } from "./Site-Header"


export function HeroSection() {
    return (
      <main className="min-h-screen bg-white">
      <SiteHeader />
      <section className="relative h-screen w-full flex flex-col  items-center  justify-center">
        <img
          src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&q=80&w=2070"
          alt="Scenic mountain landscape with a lake"
        
          className="object-cover"
          
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Wanderlust Chronicles
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed text-gray-200">
            Embark on a journey through captivating stories,
            <br className="hidden md:inline" />
            expert tips, and breathtaking destinations
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-200 transition-colors duration-300">
              Start Reading
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900 transition-colors duration-300">
              Subscribe
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4"
        >
          <a href="#latest-posts" className="text-white hover:text-gray-300 transition-colors">
            <span className="sr-only">Scroll to latest posts</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </section>
      </main>
    )
  }
  