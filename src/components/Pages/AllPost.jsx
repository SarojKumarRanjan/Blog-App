
import {BlogCard} from ".."

import useGetpost from "@/utils/useGetpost"
import { Link } from "react-router-dom"
import { useState } from "react"

import {  useSelector } from "react-redux"
import { Button } from "../ui/button"


function AllPost() {
  
const [search, setSearch] = useState('')


    useGetpost()
 


  const posts = useSelector((state) => state.posts.posts)

   //console.log(posts);

   
  return (
    <div className='min-h-screen mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold  mb-8">All Posts</h1>
      <div className="flex justify-center mb-8 items-center space-x-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         type="text"
         placeholder="Search"
          className="w-1/2 border bg-background border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
         />
         <Link to={`/search/${search}`} >
         <Button  className="px-8 py-4">
            Search
         </Button>
          </Link>
      </div>
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
  )
}

export default AllPost