import { HeroSection } from "./Hero-Section"
import BlogCard from "../BlogCard"
import { Link } from "react-router-dom"
import useGetpost from '@/utils/useGetpost'
import { useSelector } from 'react-redux'
import Shimmer from "@/utils/Shimmer"

function HomePage() {
  useGetpost()
  const posts = useSelector((state) => state.posts.posts)
  
  if (posts.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Shimmer />
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
      <HeroSection />

      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Popular Blogs
            </h1>
            <Link to="/all-post" >
            <button className="text-sm font-medium">
              View All
            </button>
            </Link>
          </div>

          <div className="border-b border-gray-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {posts.map((post) => (
              <div key={post.id} className="flex">
                <Link 
                  to={`/post/${post.id}`} 
                  className="w-full "
                >
                  <BlogCard {...post} />
                </Link>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default HomePage